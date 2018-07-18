from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField

class RegistrationForm(FlaskForm):
    email = StringField('Email')
    password = PasswordField('Password')
    password_confirm = PasswordField('Confirm Password')
    submit = SubmitField('Register')