from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError

from noter.models import User

class RegistrationForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    password_confirm = PasswordField(
        'Confirm Password', 
        validators=[DataRequired(), 
        EqualTo('password', message='Passwords must match')]
    )
    submit = SubmitField('Register')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('That email is already present in the database. Please, use another one.')


class LoginForm(FlaskForm):
    email = StringField('Email')
    password = PasswordField('Password')
    staylogged = BooleanField('Stay logged in')
    submit = SubmitField('Login')


class NoteForm(FlaskForm):
    title = StringField('Title')
    content = TextAreaField('Content', validators=[DataRequired()])
    submit = SubmitField('Save')