from sqlalchemy import Engine
from sqlalchemy.orm import Session
import datetime as dt
from datetime import timedelta
from ..models.user_session import UserSession

class UserSessionRepository:
    def __init__(self, engine: Engine):
        self.engine = engine

    def delete_old_sessions(self):
        with Session(self.engine) as session:
            with session.begin():
                session.query(UserSession).filter(UserSession.expiration < dt.datetime.now(dt.timezone.utc)).delete(synchronize_session=False)
        
    def insert_session(self, token: str, user_id: int):
        with Session(self.engine) as session:
            with session.begin():
                new_session = UserSession(token=token, expiration=dt.datetime.now(dt.timezone.utc) + timedelta(days=30), user_id=user_id)
                session.add(new_session)
        
    def delete_session(self, token: str):
        with Session(self.engine) as session:
            with session.begin():
                session.query(UserSession).filter(UserSession.token == token).delete(synchronize_session=False)
        
    def get_session_by_user_id(self, user_id: int) -> UserSession | None:
        with Session(self.engine) as session:
            with session.begin():
                user_session = session.query(UserSession).filter(UserSession.expiration > dt.datetime.now(dt.timezone.utc), UserSession.user_id == user_id).first() 
                session.expunge(user_session)
                return user_session
    
    def get_session_by_token(self, token: str) -> UserSession | None:
        with Session(self.engine) as session:
            with session.begin():
                user_session = session.query(UserSession).filter(UserSession.expiration > dt.datetime.now(dt.timezone.utc), UserSession.token == token).first() 
                session.expunge(user_session)
                return user_session