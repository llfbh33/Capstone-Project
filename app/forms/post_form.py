from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Entry, Post


def entry_exitst(form, field):
    #checking if entry exitst
    entry_id = field.data
    entry = Entry.query.filter(Entry.id == entry_id).first()
    if not entry:
        raise ValidationError('Entry not found')

def post_exists(form, field):
    entry_id = field.data
    post = Post.query.filter(Post.entry_id == entry_id).first()
    if post:
        raise ValidationError('This entry is already set to public')


class PostForm(FlaskForm):
    entry_id = IntegerField('entry_id', validators=[DataRequired(), entry_exitst, post_exists])
    message = StringField('message', validators=[Length(max=100)])

class EditPostForm(FlaskForm):
    entry_id = IntegerField('entry_id', validators=[DataRequired(), entry_exitst])
    message = StringField('message', validators=[Length(max=100)])
