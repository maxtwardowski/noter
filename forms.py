from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField

class RegistrationForm(FlaskForm):
    email = StringField('Email')
    password = PasswordField('Password')
    password_confirm = PasswordField('Confirm Password')
    submit = SubmitField('Register')


class LoginForm(FlaskForm):
    email = StringField('Email')
    password = PasswordField('Password')
    staylogged = BooleanField('Stay logged in')
    submit = SubmitField('Login')