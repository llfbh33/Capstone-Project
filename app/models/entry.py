from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
# from sqlalchemy.types import BLOB

class Entry(db.Model):
    __tablename__ = 'entries'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notebooks.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text)
    is_public = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now())

    users = db.relationship('User', back_populates='entries')
    notebooks = db.relationship('Notebook', back_populates='entries')
    posts = db.relationship('Post', cascade='all, delete', back_populates='entries')
    comments = db.relationship('Comment', cascade='all, delete', back_populates='entries')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'notebook_id': self.notebook_id,
            'name': self.name,
            'content': self.content,
            'is_public': self.is_public,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
