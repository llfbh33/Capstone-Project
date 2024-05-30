from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    entry_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('entries.id')), nullable=False)
    comment = db.Column(db.String(600), nullable=False)
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now())

    users = db.relationship('User', back_populates='comments')
    entries = db.relationship('Entry', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'entry_id': self.entry_id,
            'comment': self.comment,
            'created_at': self.created_at
        }
