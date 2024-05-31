from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Entry, Comment
from app.forms import CommentForm, EditCommentForm


comment_routes = Blueprint('comments', __name__)



@comment_routes.route('/new', methods=['post'])
@login_required
def create_entry():
    """
    Create a comment for the current post
    """
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        new_comment = Comment (
            user_id = form.data['user_id'],
            entry_id = form.data['entry_id'],
            comment = form.data['comment'],
        )

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()
    else:
        return form.errors, 400


@comment_routes.route('/<int:comment_id>/edit', methods=['post'])
@login_required
def edit_entry(comment_id):
    """
    Edit an existing comment created by the current user
    """
    form = EditCommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        currComment = Comment.query.get(comment_id)
        setattr(currComment, 'comment', form.data['comment'])

        db.session.commit()

        return currComment.to_dict()
    else:
        return form.errors, 400


@comment_routes.route("/<int:comment_id>/delete")
@login_required
def delete_notebook(comment_id):
    """
    Delete a comment, only if the current user is the creator of the comment or the owner of the post
    """
    comment_to_delete = Comment.query.get(comment_id)

    entry = Entry.query.get(comment_to_delete.entry_id)

    if comment_to_delete.user_id == current_user.id:
        db.session.delete(comment_to_delete)
        db.session.commit()
    elif entry.user_id == current_user.id:
        db.session.delete(comment_to_delete)
        db.session.commit()
    else:
        return {'message': "You are not the owner of this comment, nor are you the creator of the post it is posted to"}

    return {"message": "Comment has successfully been deleted"}
