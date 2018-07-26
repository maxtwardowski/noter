from flask import Flask, render_template, url_for, flash, redirect, request
from forms import RegistrationForm, LoginForm
from flask_sqlalchemy import SQLAlchemy

from datetime import datetime

app = Flask(__name__)

app.config['SECRET_KEY'] = '382b514f430d789f42c196072f3bbe78'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    date_join = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    #notes = db.relationship('Note', backref='author', lazy=True)

    def __repr__(self):
        return f"User('{self.email}', '{self.date_join}', '{self.id}')"


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    date_create = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    date_edit = db.Column(db.DateTime, nullable=True, default=None)

@app.route("/", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        print("hehehehe")
    return render_template('registration.html', title='Create Account', form=form)

@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    return render_template('login.html', title='Sign In', form=form)

if __name__ == "__main__":
    app.run(debug=True)
