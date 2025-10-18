from sqlalchemy import Engine
from sqlalchemy.orm import Session

from ..models.user_orchard_access import UserOrchardAccess
from ..models.orchard import Orchard

class OrchardRepository:
    
    def __init__(self, engine: Engine):
        self.engine = engine
        
    def get_orchards_by_user_id(self, user_id: int):
        with Session(self.engine) as session:
            with session.begin():
                orchards = (
                    session.query(Orchard)
                    .join(UserOrchardAccess, UserOrchardAccess.orchard_id == Orchard.id)
                    .filter(UserOrchardAccess.user_id == user_id)
                    .all()
                )
                session.expunge_all()
                return orchards
    
    def get_orchard_by_id(self, user_id: int, orchard_id: int):
        with Session(self.engine) as session:
            with session.begin():
                orchard = (
                    session.query(Orchard)
                    .join(UserOrchardAccess, UserOrchardAccess.orchard_id == Orchard.id)
                    .filter(Orchard.id == orchard_id, UserOrchardAccess.user_id == user_id)
                    .first()
                )
                session.expunge_all()
                return orchard