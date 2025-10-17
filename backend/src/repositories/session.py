from ..models.session import Session
import datetime as dt
from datetime import timedelta

class SessionRepository:
    def __init__(self, db_session):
        self.db_session = db_session

    def delete_old_sessions(self):
        self.db_session.query(Session).filter(Session.expiration < dt.datetime.now(dt.timezone.utc)).delete(synchronize_session=False)
        self.db_session.commit()
        
    def insert_session(self, token: str, user_id: int):
        new_session = Session(token=token, expiration=dt.datetime.now(dt.timezone.utc) + timedelta(days=30), user_id=user_id)
        self.db_session.add(new_session)
        self.db_session.commit()
        
    def delete_session(self, token: str):
        self.db_session.query(Session).filter(Session.token == token).delete(synchronize_session=False)
        self.db_session.commit()
        
    def get_session_by_user_id(self, user_id: int) -> Session | None:
        return self.db_session.query(Session).filter(Session.expiration > dt.datetime.now(dt.timezone.utc), Session.user_id == user_id).first() 
    
    def get_session_by_token(self, token: str) -> Session | None:
        return self.db_session.query(Session).filter(Session.expiration > dt.datetime.now(dt.timezone.utc), Session.token == token).first() 