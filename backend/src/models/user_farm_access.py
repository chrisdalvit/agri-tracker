import sqlalchemy as sa
from . import Base

class UserFarmAccess(Base):
    __tablename__ = 'user_farm_access'

    user_id = sa.Column(sa.Integer, sa.ForeignKey('user.id'), primary_key=True)
    farm_id = sa.Column(sa.Integer, sa.ForeignKey('farm.id'), primary_key=True)