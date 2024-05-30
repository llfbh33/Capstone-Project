from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User, Entry


def user_exists(form, field):
    # Checking if user exists
    user_id = field.data
    user = User.query.filter(User.user_id == user_id).first()
    if not user:
        raise ValidationError('User not found.')

def entry_exitst(form, field):
    #checking if entry exitst
    entry_id = field.data
    entry = Entry.query.filter(Entry.entry_id == entry_id).first()
    if not entry:
        raise ValidationError('Entry not found')


class PostForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired(), user_exists])
    entry_id = IntegerField('entry_id', validators=[DataRequired(), entry_exitst])
    message = StringField('name', validators=[Length(max=100)])
