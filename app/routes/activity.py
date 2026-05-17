from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Entry, Comment, Activity
from app.forms import CommentForm, EditCommentForm


activity_routes = Blueprint('activities', __name__)



@activity_routes.route('/current')
@login_required
def get_current_user_activities():
    """
    Query for all activities for current user
    """
    activities = Activity.query.filter(
        Activity.user_id == current_user.id
    ).order_by(Activity.created_at.desc()).all()

    return [activity.to_dict() for activity in activities]



# @comment_routes.route('/<int:comment_id>/edit', methods=['post'])
# @login_required
# def edit_entry(comment_id):
#     """
#     Edit an existing comment created by the current user
#     """
#     form = EditCommentForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if form.validate_on_submit():

#         currComment = Comment.query.get(comment_id)
#         setattr(currComment, 'comment', form.data['comment'])

#         db.session.commit()

#         return currComment.to_dict()
#     else:
#         return form.errors, 400


# @comment_routes.route("/<int:comment_id>/delete")
# @login_required
# def delete_notebook(comment_id):
#     """
#     Delete a comment, only if the current user is the creator of the comment or the owner of the post
#     """
#     comment_to_delete = Comment.query.get(comment_id)

#     entry = Entry.query.get(comment_to_delete.entry_id)

#     if comment_to_delete.user_id == current_user.id:
#         db.session.delete(comment_to_delete)
#         db.session.commit()
#     elif entry.user_id == current_user.id:
#         db.session.delete(comment_to_delete)
#         db.session.commit()
#     else:
#         return {'message': "You are not the owner of this comment, nor are you the creator of the post it is posted to"}

#     return {"message": "Comment has successfully been deleted"}
