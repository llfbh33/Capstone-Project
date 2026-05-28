from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False)
    entry_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('entries.id')), nullable=True)
    title = db.Column(db.String(150), nullable=False)
    post_type = db.Column(db.String(50), nullable=True)
    show_read_length = db.Column(db.Boolean, default=False)
    message = db.Column(db.String(250))
    is_active = db.Column(db.Boolean, default=True)
    comments_enabled = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship("User", back_populates="posts")
    entries = db.relationship('Entry', back_populates='posts')
    comments = db.relationship('Comment', back_populates='posts')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'entry_id': self.entry_id,
            'title': self.title,
            'post_type': self.post_type,
            'show_read_length': self.show_read_length,
            'message': self.message,
            'is_active': self.is_active,
            'comments_enabled': self.comments_enabled,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }
