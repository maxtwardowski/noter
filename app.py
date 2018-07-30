from datetime import datetime
from flask import Flask, render_template, url_for, flash, redirect, request, abort
from flask_sqlalchemy import SQLAlchemy
from forms import RegistrationForm, LoginForm
from flask_login import LoginManager, login_user, logout_user, UserMixin, login_required
from urllib.parse import urlparse, urljoin

app = Flask(__name__)

app.config['SECRET_KEY'] = '382b514f430d789f42c196072f3bbe78'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

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


@app.route("/", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        newuser = User(
            email = form.email.data,
            password = form.password.data,
        )
        db.session.add(newuser)
        db.session.commit()
    return render_template('registration.html', title='Create Account', form=form)

def is_safe_url(target):
    ref_url = urlparse(request.host_url)
    test_url = urlparse(urljoin(request.host_url, target))
    return test_url.scheme in ('http', 'https') and \
           ref_url.netloc == test_url.netloc

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()

        if user is not None:
            login_user(
                user,
                remember=True if form.staylogged.data is True else False,
            )
            flash('Logged in successfully!')

            next = request.args.get('next')
            if not is_safe_url(next):
                return abort(400)

            return redirect(next or url_for('login'))
    return render_template('login.html', title='Sign In', form=form)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run()
