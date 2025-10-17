from pydantic import BaseModel
from fastapi import FastAPI, Response, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from .models import SessionLocal, Base, engine
from .models.user import User
from .services.user import UserService
from .services.access_controller import AccessController
app = FastAPI()

class LoginRequest(BaseModel):
    email: str
    password: str
    
class LogoutRequest(BaseModel):
    token: str

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
origins = [
    "http://localhost",
    "http://localhost/",
    "http://localhost:5000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = SessionLocal()
user_service = UserService(db)
access_controller = AccessController(user_service)

@app.post("/login")
def login(login_request: LoginRequest, response: Response):
    token = user_service.login(login_request.email, login_request.password)
    if token:
        return {"redirect": "/", "session": token}
    else:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return response
    
@app.post("/logout")
def logout(user: User = Depends(access_controller.is_logged_in)):
    user_service.logout(user)

