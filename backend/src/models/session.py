import sqlalchemy as sa
from . import Base

class Session(Base):
    __tablename__ = 'session'

    token = sa.Column(sa.String(128), primary_key=True)
    expiration = sa.Column(sa.DateTime)
    user_id = sa.Column(sa.Integer, sa.ForeignKey('user.id'))