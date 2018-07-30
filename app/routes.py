from flask import render_template, url_for, flash, redirect, request, abort
from flask_login import login_user, logout_user, login_required
from urllib.parse import urlparse, urljoin

from app import app, login_manager, db
from app.forms import RegistrationForm, LoginForm
from app.models import User, Note


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