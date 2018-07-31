from flask import abort, flash, redirect, render_template, request, url_for
from flask_login import login_required, login_user, logout_user, current_user

from noter import app, db
from noter.forms import LoginForm, RegistrationForm, NoteForm
from noter.models import Note, User
from noter.logintools import is_safe_url, load_user

@app.route("/")
def home():
    return render_template('home.html', title='Home')


@app.route("/signup", methods=['GET', 'POST'])
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

            return redirect(next or url_for('notebook'))
    return render_template('login.html', title='Sign In', form=form)

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route("/notebook")
@login_required
def notebook():
    return render_template(
        'notebook.html', 
        title='My Notebook', 
        notes=current_user.notes,
    )

@app.route("/newnote", methods=['GET', 'POST'])
@login_required
def newnote():
    form = NoteForm()
    if form.validate_on_submit():
        note = Note(
            title=form.title.data, 
            content=form.content.data,
            user_id=current_user.get_id(),
            )
        db.session.add(note)
        db.session.commit()   
        return redirect(url_for('notebook'))
    return render_template('newnote.html', title='New Note', form=form)