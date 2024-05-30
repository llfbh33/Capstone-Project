from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    user_id = field.data
    user = User.query.filter(User.id == user_id).first()
    if not user:
        raise ValidationError('User not found.')


class NotebookForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired(), user_exists])
    name = StringField('name', validators=[DataRequired(), Length(max=100)])
    about = StringField('about', validators=[Length(max=400)])
