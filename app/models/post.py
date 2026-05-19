from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    entry_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('entries.id')), nullable=True)
    message = db.Column(db.String(250))
    is_active = db.Column(db.Boolean, default=True)
    comments_enabled = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now(), onupdate=datetime.now())

    entries = db.relationship('Entry', back_populates='posts')
    comments = db.relationship('Comment', back_populates='posts')

    def to_dict(self):
        return {
            'id': self.id,
            'entry_id': self.entry_id,
            'message': self.message,
            'is_active': self.is_active,
            'comments_enabled': self.comments_enabled,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
