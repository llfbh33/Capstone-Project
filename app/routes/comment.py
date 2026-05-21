from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Entry, Comment, Activity, Post
from app.forms import CommentForm, EditCommentForm


comment_routes = Blueprint('comments', __name__)


def generate_activity(action, comment, post_name):

    if action == "create":
        text = f'Commented on post: "{post_name}"'
    elif action == "update":
        text = f'Edited comment on post: "{post_name}"'
    elif action == "delete":
        text = f'Deleted comment on post: "{post_name}"'
    else:
        text = f'Edited comment on post: "{post_name}"'

    activity = Activity(
        user_id=current_user.id,
        target_id=comment.id,
        target_type="comment",
        action_type=action,
        text=text,
        route=f'/public/{comment.post_id}'
    )

    db.session.add(activity)
    db.session.commit()


#CREATE A LOAD COMMENTS ROUTE

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
            user_id = current_user.id,
            post_id = form.data['post_id'],
            comment = form.data['comment'],
        )

        db.session.add(new_comment)
        db.session.commit()

        post = Post.query.get(new_comment.post_id)
        if not post.comments_enabled:
            return {"error": "Comments are disabled for this post"}, 403

        generate_activity("create", new_comment, post.title)


        return new_comment.to_dict()
    else:
        return form.errors, 400


@comment_routes.route('/<int:comment_id>/edit', methods=['post'])
@login_required
def edit_comment(comment_id):
    """
    Edit an existing comment created by the current user
    """
    form = EditCommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        currComment = Comment.query.get(comment_id)

        if not currComment:
            return {"error": "Comment couldn't be found"}, 404

        if currComment.user_id != current_user.id:
            return {"error": "Forbidden"}, 403

        setattr(currComment, 'comment', form.data['comment'])

        db.session.commit()

        post = Post.query.get(currComment.post_id)

        generate_activity("update", currComment, post.title)

        return currComment.to_dict()

    else:
        return form.errors, 400


@comment_routes.route("/<int:comment_id>/delete")
@login_required
def delete_comment(comment_id):
    """
    Delete a comment, only if the current user is the creator of the comment
    """

    comment_to_delete = Comment.query.get(comment_id)

    if not comment_to_delete:
        return {"error": "Comment couldn't be found"}, 404

    if comment_to_delete.user_id != current_user.id:
        return {"error": "Forbidden"}, 403

    post = Post.query.get(comment_to_delete.post_id)

    generate_activity("delete", comment_to_delete, post.title)

    db.session.delete(comment_to_delete)
    db.session.commit()

    return {"message": "Comment has successfully been deleted"}
