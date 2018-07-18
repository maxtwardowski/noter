from flask import Flask, render_template, url_for
from forms import RegistrationForm

app = Flask(__name__)

app.config['SECRET_KEY'] = '382b514f430d789f42c196072f3bbe78'

@app.route("/")
def register():
    form = RegistrationForm();
    return render_template('registration.html', title='Sign Up', form=form)

if __name__ == "__main__":
    app.run()