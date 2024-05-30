from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Notebook

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
