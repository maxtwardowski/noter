from datetime import datetime

from flask_login import UserMixin

from noter import db


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    date_join = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    authenticated = db.Column(db.Boolean, nullable=False, default=False)
    notes = db.relationship('Note', backref='author', lazy=True)

    def __repr__(self):
        return f"User(#{self.id}, {self.email}, {self.authenticated})"


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), unique=False, nullable=True)
    content = db.Column(db.Text, nullable=False)
    date_create = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    date_edit = db.Column(db.DateTime, nullable=True, default=None)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Note(#{self.id}, Title: {self.title}, Author ID: {self.user_id})"
