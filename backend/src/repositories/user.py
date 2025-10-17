from ..models.user import User

class UserRepository:
    def __init__(self, db_session):
        self.db_session = db_session

    def get_user_by_email(self, email: str) -> User | None:
        user = self.db_session.query(User).filter(User.email == email).first()
        return user if user else None
    
    def get_user_by_id(self, id: int):
        user = self.db_session.query(User).filter(User.id == id).first()
        return user if user else None
