from sqlalchemy import Engine

from ..models.user import User
from ..repositories.orchard import OrchardRepository

class OrchardService:
    
    def __init__(self, engine: Engine):
        self.orchard_repository = OrchardRepository(engine)
        
    def get_user_orchards(self, user: User):
        return self.orchard_repository.get_orchards_by_user_id(user.id)
        
    def get_orchard_by_id(self, user: User, orchard_id: int):
        return self.orchard_repository.get_orchard_by_id(user.id, orchard_id)