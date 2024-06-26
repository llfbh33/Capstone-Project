from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Entry, db
from app.forms import EntryForm
from datetime import datetime

entry_routes = Blueprint('entries', __name__)


@entry_routes.route('')
@login_required
def get_entries():
    """
    Query for all entries and list them as dictionaries
    """
    entries = Entry.query.all()
    entries_return = []

    for entry in entries:
        entry_comments = []
        for comment in entry.comments:
            entry_comments.append(comment.to_dict())
        entry_w_comments = entry.to_dict()
        entry_w_comments['comments'] = entry_comments
        if entry.posts:
            entry_w_comments['post'] = entry.posts[0].to_dict()
        entries_return.append(entry_w_comments)

    return entries_return



@entry_routes.route('/<int:entry_id>')
@login_required
def entry(entry_id):
    """
    Query for an entry by id and returns it in a dictionary
    """
    entry = Entry.query.get(entry_id)

    comments = []
    for comment in entry.comments:
        comments.append(comment.to_dict())
    if entry.posts:
        entry['post'] = entry.posts[0].to_dict()

    entry_return = entry.to_dict()
    entry_return['comments'] = comments


    return entry_return


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

        entry_retrun = new_entry.to_dict()
        entry_retrun['comments'] = []

        return entry_retrun
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

        entry_retrun = currEntry.to_dict()

        comment_list = []
        for comment in currEntry.comments:
            comment_list.append(comment.to_dict())
        entry_retrun['comments'] = comment_list

        if currEntry.posts:
            entry_retrun['post'] =currEntry.posts[0].to_dict()

        return entry_retrun
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
