from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .models import SessionLocal, Base, engine
from .models.user import User
app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/users")
def read_item(db: Session = Depends(get_db)):
    return db.query(User).all()

@app.post("/users")
def read_item(db: Session = Depends(get_db)):
    user = User(email="api@api.com", password="api")
    db.add(user)
    db.commit()
    db.refresh(user)
    return user