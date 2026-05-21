from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Entry, Post


def entry_exists(form, field):
    entry_id = field.data
    entry = Entry.query.filter(Entry.id == entry_id).first()
    if not entry:
        raise ValidationError("Entry not found")


def post_exists(form, field):
    entry_id = field.data
    post = Post.query.filter(Post.entry_id == entry_id).first()
    if post:
        raise ValidationError("This entry is already set to public")


class PostForm(FlaskForm):
    entry_id = IntegerField("entry_id", validators=[DataRequired(), entry_exists])
    title = StringField("title", validators=[DataRequired(), Length(max=100)])
    message = StringField("message", validators=[Length(max=250)])


class EditPostForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), Length(max=100)])
    message = StringField("message", validators=[Length(max=250)])
    comments_enabled = BooleanField("comments_enabled")

class PublicationPostForm(FlaskForm):
    is_active = BooleanField("is_active")