import json
from flask import request, jsonify, Blueprint, abort
from flask.views import MethodView
from flask import make_response
from user.models import User, ResetPassword
from utils import api_response
import jwt
import string
import random

BAD_REQUEST_STATUS_CODE=400
UNAUTHORIZED_STATUS_CODE = 401

def is_authorized(request):
    token = request.headers.get('Authorization', None)

    try:
        user_id = User.decode_token(token)
        return user_id
    except jwt.ExpiredSignature:
        return False
    except jwt.ExpiredSignatureError:
        return False
    except jwt.InvalidTokenError:
        return False 

def code_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

class UserView(MethodView):
                
    def get(self):
        """Get user profile
        """
        user_id = is_authorized(request)
        if user_id:
            user = User.query.filter_by(id=user_id).first()

            data = user.to_json()
            return api_response(data=data)
        else:
            message = "Invalid token"
            return api_response(message=message, status_code=UNAUTHORIZED_STATUS_CODE)
    
    def post(self):
        """Sign up View

        """
        email = request.form.get('email', None)
        password = request.form.get('password', None)
        name = request.form.get('name', None)
        age = request.form.get('age', None)
        gender = request.form.get('gender', None)
        image = request.form.get('image', None)

        if not email or not password:
            message = "Invalid request"
            return api_response(message= message, status_code = BAD_REQUEST_STATUS_CODE)

        exists_user = User.query.filter_by(email=email).first()
        if not exists_user:
            user = User(email, password, name, age, gender, image)
            user.save()

            data = {
                "id": user.id,
                "email": email
            }
            message = "Sign up successfully"
            return api_response(data=data, message=message)
        else :
            message = "User already exists."
            return api_response(message=message, status_code=BAD_REQUEST_STATUS_CODE)
                 

class LoginView(MethodView):
    """Login view
    """

    def post(self):
        try:
            email = request.form.get('email', None)
            password = request.form.get('password', None)

            if not email or not password:
                message = "Invalid request"
                return api_response(message= message, status_code = BAD_REQUEST_STATUS_CODE)

            user = User.query.filter_by(email=email).first()

            if not user:
                message = "User not exist"
                return api_response(message=message, status_code=400)

            elif not user.check_password(password):
                message = "Wrong email or password"
                return api_response(message=message, status_code=400)
            else:
                access_token = user.get_access_token()

                print(access_token)
                data = {
                    "access_token": access_token
                }
                message = "Login successfully"

                return api_response(data=data, message=message, status_code=BAD_REQUEST_STATUS_CODE)

            

        except Exception as e:
            print(e)
            message = "Internal Server Error"
            return api_response(message=message, status_code=500)

class ForgotPasswordView(MethodView):

    def post(self):
        try:
            email = request.form.get('email', None)

            if not email :
                message = "Invalid request"
                return api_response(message= message, status_code = BAD_REQUEST_STATUS_CODE)

            else:
                user_id = None
                code = code_generator()

                user = User.query.filter_by(email=email).first()
                if user:
                    user_id = user.id
                    
                    reset_password = ResetPassword(code, user_id)
                    reset_password.save()

                    # Send email
                data = {
                    "code": code
                }
                return api_response(data=data)

        except Exception as e:
            print(e)
            message = "Internal Server Error"
            return api_response(message=message, status_code=500)
            
class ResetPasswordView(MethodView):
    def post(self):
        try:
            code = request.form.get('code', None)
            password = request.form.get('password', None)
            if not code or not password :
                message = "Invalid request"
                return api_response(message= message, status_code = BAD_REQUEST_STATUS_CODE)

            else:
                user_id = ResetPassword.check_code(code)
                if user_id:
                    user = User.query.filter_by(id=user_id).first()
                    user.change_password(password)
                    user.save()
                    return api_response()
                
                message = "Invalid code"

                    # Send email
                data = {
                    "code": code
                }
                return api_response(data=data)

        except Exception as e:
            print(e)
            message = "Internal Server Error"
            return api_response(message=message, status_code=500)
            