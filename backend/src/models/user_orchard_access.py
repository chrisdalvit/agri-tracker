import sqlalchemy as sa
from sqlalchemy.orm import relationship
from . import Base

class UserOrchardAccess(Base):
    __tablename__ = 'user_orchard_access'

    user_id = sa.Column(sa.Integer, sa.ForeignKey('user.id'), primary_key=True)
    orchard_id = sa.Column(sa.Integer, sa.ForeignKey('orchard.id'), primary_key=True)