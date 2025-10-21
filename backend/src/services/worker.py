from sqlalchemy import Engine
from ..repositories.worker import WorkerRepository

class WorkerService:
    
    def __init__(self, engine: Engine):
        self.worker_repository = WorkerRepository(engine)
        
    def get_all_workers(self):
        return self.worker_repository.get_all_workers()