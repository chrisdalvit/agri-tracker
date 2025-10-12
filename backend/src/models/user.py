import sqlalchemy as sa
from . import Base

class User(Base):
    __tablename__ = 'user'

    id = sa.Column(sa.Integer, primary_key=True)
    email = sa.Column(sa.String)
    password = sa.Column(sa.String)
    