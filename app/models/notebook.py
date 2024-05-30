from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date

class Notebook(db.Model):
    __tablename__ = 'notebooks'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    about = db.Column(db.String(400))
    created_at = db.Column(db.Date, default=date.now())
    updated_at = db.Column(db.Date, default=date.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'about': self.about,
            'created_at': self.created_at
        }
