from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Activity(db.Model):
    __tablename__ = 'activities'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"), nullable=False)
    target_id = db.Column(db.Integer, nullable=False)
    target_type = db.Column(db.String(50), nullable=False)  # "entry", "comment", "post", "notebook"
    action_type = db.Column(db.String(50), nullable=False)  # "created", "updated", "deleted"
    text = db.Column(db.String(600), nullable=False)
    route = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='activities')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'target_id': self.target_id,
            'target_type': self.target_type,
            'action_type': self.action_type,
            'text': self.text,
            'route': self.route,
            'created_at': self.created_at.isoformat(),
        }
