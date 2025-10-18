from sqlalchemy import Engine
from sqlalchemy.orm import Session
from ..models.orchard import Orchard
from ..models.user_farm_access import UserFarmAccess
from ..models.farm import Farm

class FarmRepository:
    def __init__(self, engine: Engine):
        self.engine = engine
    
    def get_all_user_farms(self, user_id: int):
        with Session(self.engine) as session:
            with session.begin():
                user_farms = (
                    session.query(Farm)
                    .join(UserFarmAccess, Farm.id == UserFarmAccess.farm_id)
                    .filter(UserFarmAccess.user_id == user_id)
                    .all()
                )
                session.expunge_all()
                return user_farms 
        
