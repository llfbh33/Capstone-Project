from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Entry, Activity, Notebook, db
from app.forms import EntryForm
from datetime import datetime

entry_routes = Blueprint('entries', __name__)


def generate_activity(action, entry):

    notebook = Notebook.query.get(entry.notebook_id)

    if action == "create":
        text = f'Added a new entry to: "{notebook.name}"'
    elif action == "update":
        text = f'Updated: "{entry.name}" in "{notebook.name}'
    elif action == "delete":
        text = f'Deleted entry: "{entry.name}"'
    else:
        text = f'Updated: "{entry.name}" in "{notebook.name}'

    activity = Activity(
        user_id=current_user.id,
        target_id=entry.id,
        target_type="entry",
        action_type=action,
        text=text,
        route=f'/notebook/{notebook.id}/entries/{entry.id}'
    )

    db.session.add(activity)
    db.session.commit()

# @entry_routes.route('')
# @login_required
# def get_entries():
#     """
#     Query for all entries and list them as dictionaries
#     """
#     entries = Entry.query.all()
#     entries_return = []

#     for entry in entries:
#         entry_comments = []
#         for comment in entry.comments:
#             entry_comments.append(comment.to_dict())
#         entry_w_comments = entry.to_dict()
#         entry_w_comments['comments'] = entry_comments
#         if entry.posts:
#             entry_w_comments['post'] = entry.posts[0].to_dict()
#         entries_return.append(entry_w_comments)

#     return entries_return

@entry_routes.route('')
@login_required
def get_current_users_entries():
    """
    Query for current user's entries and list them as dictionaries
    """
    entries = Entry.query.filter(
        Entry.user_id == current_user.id
    ).all()

    entries_return = []

    for entry in entries:
        entry_dict = entry.to_dict()

        if entry.posts:
            post_dict = entry.posts.to_dict()

            post_dict["comments"] = [
                comment.to_dict() for comment in entry.posts.comments
            ]

            entry_dict["posts"] = post_dict
            entry_dict["comments"] = post_dict["comments"]
        else:
            entry_dict["posts"] = None
            entry_dict["comments"] = []

        entries_return.append(entry_dict)

    return entries_return




@entry_routes.route('/<int:entry_id>')
@login_required
def entry(entry_id):
    """
    Query for an entry by id and returns it in a dictionary
    """
    entry = Entry.query.get(entry_id)

    if not entry:
        return {"error": "Entry couldn't be found"}, 404
    
    entry_dict = entry.to_dict()

    if entry.posts:
        post_dict = entry.posts.to_dict()

        post_dict["comments"] = [
            comment.to_dict() for comment in entry.posts.comments
        ]

        entry_dict["posts"] = post_dict
        entry_dict["comments"] = post_dict["comments"]
    else:
        entry_dict["posts"] = None
        entry_dict["comments"] = []
    
    return entry_dict



@entry_routes.route('/new', methods=['post'])
@login_required
def create_entry():
    """
    Create a new entry for the current notebook
    """
    form = EntryForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        new_entry = Entry (
            user_id = form.data['user_id'],
            notebook_id = form.data['notebook_id'],
            name = form.data['name'],
            content = form.data['content'],
            created_at = datetime.now(),
            updated_at = datetime.now()
        )

        db.session.add(new_entry)
        db.session.commit()
        
        generate_activity('create', new_entry)

        entry_return = new_entry.to_dict()
        entry_return["posts"] = None
        entry_return['comments'] = []

        return entry_return
    else:
        return form.errors, 400




@entry_routes.route('/<int:entry_id>/edit', methods=['post'])
@login_required
def edit_entry(entry_id):
    """
    Edit an existing entry for the current user
    """
    form = EntryForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():

        currEntry = Entry.query.get(entry_id)
        setattr(currEntry, 'name', form.data['name'])
        setattr(currEntry, 'content', form.data['content'])
        setattr(currEntry, 'is_public', form.data['is_public'])
        setattr(currEntry, 'updated_at', datetime.now())

        db.session.commit()

        generate_activity('update', currEntry)

        entry_return = currEntry.to_dict()

        if currEntry.posts:
            post_dict = currEntry.posts.to_dict()

            post_dict["comments"] = [
                comment.to_dict() for comment in currEntry.posts.comments
            ]

            entry_return["posts"] = post_dict
            entry_return["comments"] = post_dict["comments"]
        else:
            entry_return["posts"] = None
            entry_return["comments"] = []

        return entry_return
    else:
        return form.errors, 400


@entry_routes.route("/<int:entry_id>/delete")
@login_required
def delete_notebook(entry_id):
    """
    Delete a notebook
    """
    entry_to_delete = Entry.query.get(entry_id)

    generate_activity('delete', entry_to_delete)

    db.session.delete(entry_to_delete)
    db.session.commit()

    return {"message": "Entry has been successfully deleted"}
