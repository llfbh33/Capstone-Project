from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Notebook, Activity, db
from app.forms import NotebookForm
from datetime import datetime


def generate_activity(action, notebook):

    if action == "create":
        text = f'Created a new notebook: "{notebook.name}"'
    elif action == "update":
        text = f'Edited notebook: "{notebook.name}"'
    elif action == "featured":
        text = f'Selected "{notebook.name}" as featured notebook'
    elif action == "delete":
        text = f'Deleted notebook: "{notebook.name}"'
    else:
        text = f'Updated notebook: "{notebook.name}"'


    activity = Activity(
        user_id=current_user.id,
        target_id=notebook.id,
        target_type="notebook",
        action_type=action,
        text=text,
        route=f"/notebook/{notebook.id}",
    )

    db.session.add(activity)
    db.session.commit()


notebook_routes = Blueprint("notebooks", __name__)


@notebook_routes.route("")
@login_required
def get_notebooks():
    """
    Query for all notebooks by current user and returns them in a list of notebook dictionaries
    """
    notebooks = Notebook.query.filter(Notebook.user_id == current_user.id).all()
    return {"notebooks": [notebook.to_dict() for notebook in notebooks]}


@notebook_routes.route("/<int:notebook_id>")
@login_required
def notebook(notebook_id):
    """
    Query for a notebook by id and returns it in a dictionary
    """
    notebook = Notebook.query.get(notebook_id)
    return notebook.to_dict()


@notebook_routes.route("/new", methods=["post"])
@login_required
def create_notebook():
    """
    Create a new notebook for the current user
    """
    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        new_notebook = Notebook(
            user_id=form.data["user_id"],
            name=form.data["name"],
            about=form.data["about"],
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )

        db.session.add(new_notebook)
        db.session.commit()

        generate_activity("create", new_notebook)

        return new_notebook.to_dict()
    else:
        return form.errors, 400


@notebook_routes.route("/<int:notebook_id>/edit", methods=["post"])
@login_required
def edit_notebook(notebook_id):
    """
    Edit an existing notebook for the current user
    """
    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        currNotebook = Notebook.query.get(notebook_id)
        setattr(currNotebook, "name", form.data["name"])
        setattr(currNotebook, "about", form.data["about"])

        db.session.commit()

        generate_activity("update", currNotebook)

        return currNotebook.to_dict()
    else:
        return form.errors, 400


@notebook_routes.route("/<int:notebook_id>/featured", methods=["POST"])
@login_required
def featured_notebook(notebook_id):
    notebook = Notebook.query.get(notebook_id)

    if not notebook:
        return {"error": "Notebook couldn't be found"}, 404

    if notebook.user_id != current_user.id:
        return {"error": "Unauthorized"}, 403

    notebook_to_replace = Notebook.query.filter(
        Notebook.user_id == current_user.id,
        Notebook.is_featured == True,
        Notebook.id != notebook.id
    ).first()

    if notebook_to_replace:
        notebook_to_replace.is_featured = False

    notebook.is_featured = True

    db.session.commit()

    generate_activity("featured", notebook)

    return notebook.to_dict()


@notebook_routes.route("/<int:notebook_id>/delete")
@login_required
def delete_notebook(notebook_id):
    """
    Delete a notebook
    """
    notebook_to_delete = Notebook.query.get(notebook_id)

    generate_activity("delete", notebook_to_delete)

    db.session.delete(notebook_to_delete)
    db.session.commit()

    return {"message": "Notebook has been successfully deleted"}
