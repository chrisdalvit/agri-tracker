import sqlalchemy as sa
from sqlalchemy.orm import relationship
from . import Base

class Farm(Base):
    __tablename__ = 'farm'

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String)
    orchards = relationship("Orchard", back_populates="farm", lazy="subquery")