import sqlalchemy as sa
from . import Base

class Activity(Base):
    __tablename__ = 'activity'

    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.String)
    begin_timestamp = sa.Column(sa.DateTime)
    end_timestamp = sa.Column(sa.DateTime)
    worker_id = sa.Column(sa.Integer, sa.ForeignKey('worker.id'))    
    