import sqlalchemy as sa
from . import Base

class Worker(Base):
    __tablename__ = 'worker'

    id = sa.Column(sa.Integer, primary_key=True)
    firstname = sa.Column(sa.String)
    lastname = sa.Column(sa.String)
    deleted = sa.Column(sa.Boolean)
    