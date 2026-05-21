from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Post


def post_exists(form, field):
    post_id = field.data
    post = Post.query.filter(Post.id == post_id).first()

    if not post:
        raise ValidationError("Post not found.")


class CommentForm(FlaskForm):
    post_id = IntegerField("post_id", validators=[DataRequired(), post_exists])
    comment = StringField("comment", validators=[DataRequired(), Length(max=600)])


class EditCommentForm(FlaskForm):
    comment = StringField("comment", validators=[DataRequired(), Length(max=600)])