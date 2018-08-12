from flask import abort, make_response, redirect, render_template, request, url_for, jsonify
from flask_login import login_required, login_user, logout_user, current_user

import jwt
import datetime
from functools import wraps

from noter import app, db
from noter.forms import LoginForm, RegistrationForm, NoteForm
from noter.models import Note, User
from noter.logintools import is_safe_url, load_user

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'message' : 'Token is missing!'}), 403
        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'message' : 'Token is invalid!'}), 403
        return f(*args, **kwargs)
    return decorated

@app.route("/", methods=['POST', 'GET'])
def home():
    data = request.get_json()
    print(data)
    return render_template('home.html', title='Home')


@app.route("/signup", methods=['POST'])
def register():
    email = request.json.get('email')
    password = request.json.get('password')
    confirmpassword = request.json.get('confirm_password')
    if email is None or password is None:
        abort(400) # missing arguments
    if not password == confirmpassword:
        abort(400)
    if User.query.filter_by(email=email).first() is not None:
        abort(400) # existing user
    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({ 'email': user.email }), 201, {'Location': url_for('register', id = user.id, _external = True)}

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    rememberme = request.json.get('rememberme')
    if email is None or password is None:
        abort(400)
    user = User.query.filter_by(email=email).first()
    if user is None:
        abort(400)
    if user.check_password(password):
        login_user(user, remember=rememberme)
        token = jwt.encode({'user' : email, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(seconds=15)}, app.config['SECRET_KEY'])
        return jsonify({
            'token': token.decode('UTF-8')
        })
    return make_response(
        'Authentication failed!',
        401,
        {'WWW-Authenticate' : 'Basic realm="Login Required"'}
    )

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