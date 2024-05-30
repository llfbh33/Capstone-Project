from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    profile_image = db.Column(db.String(255))
    theme = db.Column(db.String(50), default='default')
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.Date, default=datetime.now())
    updated_at = db.Column(db.Date, default=datetime.now())

    notebooks = db.relationship('Notebook', cascade='all, delete', back_populates='users')
    entries = db.relationship('Entry', cascade='all, delete', back_populates='users')
    comments = db.relationship('Comment', cascade='all, delete', back_populates='users')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.id,
            'username': self.username,
            'profile_image': self.profile_image,
            'theme': self.theme
        }
