from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Entry


def entry_exitst(form, field):
    #checking if entry exitst
    entry_id = field.data
    entry = Entry.query.filter(Entry.entry_id == entry_id).first()
    if not entry:
        raise ValidationError('Entry not found')


class PostForm(FlaskForm):
    entry_id = IntegerField('entry_id', validators=[DataRequired(), entry_exitst])
    message = StringField('message', validators=[Length(max=100)])
