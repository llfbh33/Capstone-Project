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

