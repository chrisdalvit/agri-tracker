import random
import string
from ..models.user import User
from ..repositories.user import UserRepository
from ..repositories.session import SessionRepository

class UserService:
    def __init__(self, db_session):
        self.user_repository = UserRepository(db_session)
        self.session_repository = SessionRepository(db_session)
        self.session_chars = string.ascii_letters + string.digits + '-_'

    def login(self, email: str, password: str) -> User | None:
        user = self.user_repository.get_user_by_email(email)
        if user and user.password == password:
            token = ''.join(random.choices(self.session_chars, k=128))
            self.session_repository.insert_session(token, user.id)
            return token
        return None
    
    def logout(self, user: User):
        session = self.session_repository.get_session_by_user_id(user.id)
        self.session_repository.delete_session(session.token)

    def get_user_by_session(self, token: str):
        session = self.session_repository.get_session_by_token(token)
        return self.user_repository.get_user_by_id(session.user_id) if session else None
        
    