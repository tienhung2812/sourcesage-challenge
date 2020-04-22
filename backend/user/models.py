from app import db, SECRET_KEY
import jwt
import datetime
import time
from datetime import timedelta
import bcrypt

SALT = "67pZ-P~kc(7J:xz=qJhf=GbHe7"
EXPIRE_TIME=20

def get_hashed_password(plain_text_password):
    return bcrypt.hashpw(plain_text_password, bcrypt.gensalt())

class User(db.Model):
    """ Create user table"""
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    name = db.Column(db.String(80), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.Boolean, nullable=True)
    image = db.Column(db.String(100), nullable=True)

    def __init__(self, email, password, name = None, age=None, gender=None, image=None):   
        self.email = email
        self.password = get_hashed_password(password.encode('utf-8'))
        self.name = name
        self.age = age
        self.gender = gender 
        self.image = image

    def save(self):
        """Save user to database
        """        
        db.session.add(self)
        db.session.commit() 

    @staticmethod
    def decode_token(access_token):
        """Decodes the access token from the Authorization header."""
        payload = jwt.decode(access_token, SECRET_KEY)
        # Check expire
        if payload['exp'] < time.time():
            raise jwt.ExpiredSignature 
        return payload['user_id']
        
    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password)

    def get_access_token(self):
        """ Get access token
        """

        try:
            payload = {
                'exp': datetime.datetime.now() + timedelta(minutes=EXPIRE_TIME),
                'user_id': self.id
            }
            jwt_string = jwt.encode(
                payload,
                SECRET_KEY,
                algorithm='HS256'
            )
            return jwt_string.decode('utf-8')

        except Exception as e:
            return print(e)

    def change_password(self, new_password):
        self.password = get_hashed_password(new_password.encode('utf-8'))

    def to_json(self):
        return {
            "id":self.id,
            "email": self.email,
            "name": self.name,
            "age": self.age,
            "gender": self.gender,
            "image": self.image
        }

RESET_EXIPIRE = 60

class ResetPassword(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    expire_time = db.Column(db.DateTime, nullable = False)

    def __init__(self, code, user_id):   
        self.code = code
        self.user_id = user_id
        self.expire_time = datetime.datetime.now() + timedelta(minutes=RESET_EXIPIRE)

    def save(self):
        """Save user to database
        """        
        db.session.add(self)
        db.session.commit() 

    @staticmethod
    def check_code(code):
        reset_password = ResetPassword.query.filter_by(code=code).first()

        if reset_password:
            # Check expire time
            if reset_password.expire_time >= datetime.datetime.now():
                return reset_password.user_id
            
        return False