from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=60)])
    username = StringField('username', validators=[DataRequired(), username_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=8)])
