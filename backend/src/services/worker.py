from sqlalchemy import Engine
from ..repositories.worker import WorkerRepository

class WorkerService:
    
    def __init__(self, engine: Engine):
        self.worker_repository = WorkerRepository(engine)
        
    def get_all_workers(self):
        return self.worker_repository.get_all_workers()
    
    def add_worker(self, firstname: str, lastname: str):
        return self.worker_repository.add_worker(firstname, lastname, deleted=False)

    def delete_worker(self, worker_id: int):
        self.worker_repository.delete_worker(worker_id)
        
    def edit_worker(self, worker_id: int, firstname: str, lastname: str):
        return self.worker_repository.edit_worker(worker_id, firstname, lastname)