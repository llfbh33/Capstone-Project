from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User, Notebook


def user_exists(form, field):
    # Checking if user exists
    user_id = field.data
    user = User.query.filter(User.id == user_id).first()
    if not user:
        raise ValidationError('User not found.')

def notebook_exitst(form, field):
    #checking if notebook exitst
    notebook_id = field.data
    notebook = Notebook.query.filter(Notebook.id == notebook_id).first()
    if not notebook:
        raise ValidationError('Notebook not found')


class EntryForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired(), user_exists])
    notebook_id = IntegerField('notebook_id', validators=[DataRequired(), notebook_exitst])
    name = StringField('name', validators=[DataRequired(), Length(max=100)])
    content = TextAreaField('content', validators=[DataRequired()])
    is_public = BooleanField('is_public')
