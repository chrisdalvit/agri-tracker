from sqlalchemy import Engine
from ..repositories.farm import FarmRepository
from ..models.user import User

class FarmService:
    
    def __init__(self, engine: Engine):
        self.farm_repository = FarmRepository(engine)
    
    def get_farms_by_user(self, user: User):
        return self.farm_repository.get_all_user_farms(user.id)