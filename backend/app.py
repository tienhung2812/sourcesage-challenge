from flask import Flask, url_for, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy

SECRET_KEY="nyqLTw9je68qMmVr"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sourcesage-challenge.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from user.views import *

User_view =  UserView.as_view('user_view')
Login_view =  LoginView.as_view('login_view')
Forgot_pw_view =  ForgotPasswordView.as_view('forgot_password_view')
Reset_pw_view = ResetPasswordView.as_view('reset_password_view')
app.add_url_rule(
    '/sign-up', view_func=User_view, methods=['POST']
)
app.add_url_rule(
    '/login', view_func=Login_view, methods=['POST']
)

app.add_url_rule(
    '/me', view_func=User_view, methods=['GET']
)

app.add_url_rule(
    '/forgot-password', view_func=Forgot_pw_view, methods=['POST']
)

app.add_url_rule(
    '/reset-password', view_func=Reset_pw_view, methods=['POST']
)

db.create_all()

