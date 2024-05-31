from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User, Entry


def user_exists(form, field):
    # Checking if user exists
    user_id = field.data
    user = User.query.filter(User.id == user_id).first()
    if not user:
        raise ValidationError('User not found.')

def is_user(form, field):
    # Checking if user exists
    user_id = field.data
    if user_id != current_user.id:
        raise ValidationError('You are not the creator of this comment')

def entry_exitst(form, field):
    #checking if entry exitst
    entry_id = field.data
    entry = Entry.query.filter(Entry.id == entry_id).first()
    if not entry:
        raise ValidationError('Entry not found')


class CommentForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired(), user_exists])
    entry_id = IntegerField('entry_id', validators=[DataRequired(), entry_exitst])
    comment = StringField('comment', validators=[DataRequired(), Length(max=600)])

class EditCommentForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired(), user_exists, is_user])
    entry_id = IntegerField('entry_id', validators=[DataRequired(), entry_exitst])
    comment = StringField('comment', validators=[DataRequired(), Length(max=600)])
