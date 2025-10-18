import sqlalchemy as sa
from . import Base

class Orchard(Base):
    __tablename__ = 'orchard'

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String)