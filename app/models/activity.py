from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Activity(db.Model):
    __tablename__ = 'activities'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    target_id = db.Column(db.Integer, nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notebooks.id')), nullable=True)
    target_type = db.Column(db.String(50), nullable=False)  # "entry", "comment", "post", "notebook"
    text = db.Column(db.String(600), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='activities')
    notebooks = db.relationship('Notebook', back_populates='activities')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'target_id': self.target_id,
            'notebook_id': self.notebook_id,
            'target_type': self.target_type,
            'text': self.text,
            'created_at': self.created_at
        }
