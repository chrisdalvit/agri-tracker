from sqlalchemy import Engine
from sqlalchemy.orm import Session

from ..models.worker import Worker

class WorkerRepository:
    def __init__(self, engine: Engine):
        self.engine = engine

    def get_all_workers(self):
        with Session(self.engine) as session:
            with session.begin():
                workers = session.query(Worker).all()
                session.expunge_all()
                return workers
