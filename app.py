from flask import Flask, render_template, url_for
from forms import RegistrationForm, LoginForm

app = Flask(__name__)

app.config['SECRET_KEY'] = '382b514f430d789f42c196072f3bbe78'

@app.route("/", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    #submission handling to be done 
    return render_template('registration.html', title='Create Account', form=form)

@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    return render_template('login.html', title='Sign In', form=form)

if __name__ == "__main__":
    app.run(debug=True)