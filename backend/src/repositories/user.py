from sqlalchemy import Engine
from sqlalchemy.orm import Session
from ..models.user import User

class UserRepository:
    def __init__(self, engine: Engine):
        self.engine = engine

    def get_user_by_email(self, email: str) -> User | None:
        with Session(self.engine) as session:
            with session.begin():
                user = session.query(User).filter(User.email == email).first()
                session.expunge_all()
                return user if user else None
    
    def get_user_by_id(self, id: int):
        with Session(self.engine) as session:
            with session.begin():
                user = session.query(User).filter(User.id == id).first()
                session.expunge_all()
                return user if user else None
