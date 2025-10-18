import sqlalchemy as sa
from sqlalchemy.orm import relationship
from . import Base

class Orchard(Base):
    __tablename__ = 'orchard'

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String)
    farm_id = sa.Column(sa.Integer, sa.ForeignKey('farm.id'))
    farm = relationship("Farm", back_populates="orchards", lazy="subquery")