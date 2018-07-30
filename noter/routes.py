from flask import abort, flash, redirect, render_template, request, url_for
from flask_login import login_required, login_user, logout_user

from noter import app, db
from noter.forms import LoginForm, RegistrationForm
from noter.models import Note, User
from noter.logintools import is_safe_url, load_user


@app.route("/", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        newuser = User(form.email.data, form.password.data)
        db.session.add(newuser)
        db.session.commit()
    return render_template('registration.html', title='Create Account', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()

        if user is not None and user.check_password(form.password.data):
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

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))
