from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import date


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    entry_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('entries.id')), nullable=False)
    message = db.Column(db.String(250))
    created_at = db.Column(db.Date, default=date.now())
    updated_at = db.Column(db.Date, default=date.now())

    def to_dict(self):
        return {
            'id': self.id,
            'entry_id': self.entry_id,
            'message': self.message,
            'created_at': self.created_at,
        }
