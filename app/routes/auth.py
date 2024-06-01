from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from random import choice


auth_routes = Blueprint('auth', __name__)


default_images = [
    'https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-1.png',
    'https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-3.png',
    'https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-4.png',
    'https://profile-images-pencrafted-capstone.s3.us-west-2.amazonaws.com/pi-default-5.png'
]


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """

    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.username == form.data['username']).first()
        login_user(user)
        print('---->> here', current_user.is_authenticated)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            name=form.data['name'],
            username=form.data['username'],
            password=form.data['password'],
            profile_image = choice(default_images)
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401
