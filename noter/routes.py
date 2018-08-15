from flask import abort, make_response, request, url_for, jsonify

import jwt
import datetime
from functools import wraps

from noter import app, db
from noter.models import Note, User

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
    return "<h1>homeeee</h1>"

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
        token = jwt.encode({'user' : email, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(seconds=15)}, app.config['SECRET_KEY'])
        return jsonify({
            'token': token.decode('UTF-8')
        })
    return make_response(
        'Authentication failed!',
        401,
        {'WWW-Authenticate' : 'Basic realm="Login Required"'}
    )

@token_required
@app.route("/logout")
def logout():
    return ""

@token_required
@app.route("/notebook")
def notebook():
    return ""

@token_required
@app.route("/newnote", methods=['GET', 'POST'])
def newnote():
    return ""