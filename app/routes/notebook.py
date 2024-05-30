from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Notebook, db
from app.forms import NotebookForm
from datetime import datetime

notebook_routes = Blueprint('notebooks', __name__)


@notebook_routes.route('')
@login_required
def get_notebooks():
    """
    Query for all notebooks by current user and returns them in a list of notebook dictionaries
    """
    notebooks = Notebook.query.filter(Notebook.user_id == current_user.id).all()
    return {'notebooks': [notebook.to_dict() for notebook in notebooks]}



@notebook_routes.route('/<int:notebook_id>')
@login_required
def notebook(notebook_id):
    """
    Query for a notebook by id and returns it in a dictionary
    """
    notebook = Notebook.query.get(notebook_id)
    return notebook.to_dict()


@notebook_routes.route('/new', methods=['post'])
@login_required
def create_notebook():
    """
    Create a new notebook for the current user
    """
    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        new_notebook = Notebook (
            user_id = form.data['user_id'],
            name = form.data['name'],
            about = form.data['about'],
            created_at = datetime.now()
        )

        db.session.add(new_notebook)
        db.session.commit()

        return new_notebook.to_dict()
    else:
        return form.errors, 400


@notebook_routes.route("/<int:notebook_id>/delete")
@login_required
def delete_notebook(notebook_id):
    """
    Delete a notebook
    """
    notebook_to_delete = Notebook.query.get(notebook_id)

    db.session.delete(notebook_to_delete)
    db.session.commit()

    return {"message": "Notebook has been successfully deleted"}
