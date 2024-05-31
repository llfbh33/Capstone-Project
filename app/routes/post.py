from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, db
from app.forms import PostForm
from datetime import datetime

post_routes = Blueprint('posts', __name__)


@entry_routes.route('')
@login_required
def get_entries():
    """
    Query for all entries by current user and returns them in a list of notebook dictionaries
    """
    entries = Entry.query.filter(Entry.user_id == current_user.id).all()
    return {'entries': [entry.to_dict() for entry in entries]}



@entry_routes.route('/<int:entry_id>')
@login_required
def entry(entry_id):
    """
    Query for an entry by id and returns it in a dictionary
    """
    entry = Entry.query.get(entry_id)
    return entry.to_dict()


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
            about = form.data['about'],
            created_at = datetime.now(),
            updated_at = datetime.now()
        )

        db.session.add(new_entry)
        db.session.commit()

        return new_entry.to_dict()
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
        setattr(currEntry, 'updated_at', datetime.now())

        db.session.commit()

        return currEntry.to_dict()
    else:
        return form.errors, 400


@entry_routes.route("/<int:entry_id>/delete")
@login_required
def delete_notebook(entry_id):
    """
    Delete a notebook
    """
    entry_to_delete = Entry.query.get(entry_id)

    db.session.delete(entry_to_delete)
    db.session.commit()

    return {"message": "Entry has been successfully deleted"}
