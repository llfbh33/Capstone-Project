from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.id != form.user_id: # exclude the current user
        raise ValidationError('Username is already in use.')


class EditUserForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=4, max=50)])
    username = StringField('username', validators=[DataRequired(), Length(min=8, max=50), username_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=8)])
    profile_image = StringField('profile_image')

    def __init__(self, user_id=None, *args, **kwargs):
        super(EditUserForm, self).__init__(*args, **kwargs)
        self.user_id = user_id
