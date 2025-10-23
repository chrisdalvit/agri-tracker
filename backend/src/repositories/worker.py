from sqlalchemy import Engine
from sqlalchemy.orm import Session

from ..models.worker import Worker

class WorkerRepository:
    def __init__(self, engine: Engine):
        self.engine = engine

    def get_all_workers(self):
        with Session(self.engine) as session:
            with session.begin():
                workers = session.query(Worker).filter(Worker.deleted == False).all()
                session.expunge_all()
                return workers
            
    def add_worker(self, firstname: str, lastname: str, deleted: bool):
        with Session(self.engine) as session:
            with session.begin():
                new_worker = Worker(firstname=firstname, lastname=lastname, deleted=deleted)
                session.add(new_worker)
                session.flush()
                session.refresh(new_worker)
                session.expunge_all()
                return new_worker
            
    def delete_worker(self, worker_id: int):
        with Session(self.engine) as session:
            with session.begin():
                worker = session.get(Worker, worker_id)
                if worker:
                    worker.deleted = True
                    session.flush()