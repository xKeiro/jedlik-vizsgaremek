import bcrypt
from fastapi.encoders import jsonable_encoder


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))


def error_response_message(error_message: str):
    return jsonable_encoder([{"msg": error_message}])
