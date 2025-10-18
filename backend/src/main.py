from pydantic import BaseModel
from fastapi import FastAPI, Response, status, Depends
from fastapi.middleware.cors import CORSMiddleware

from .models import Base, engine
from .models.user import User
from .services.user import UserService
from .services.access_controller import AccessController
from .services.farm import FarmService
app = FastAPI()

class LoginRequest(BaseModel):
    email: str
    password: str
    
class LogoutRequest(BaseModel):
    token: str

Base.metadata.create_all(bind=engine)
        
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

user_service = UserService(engine)
farm_service = FarmService(engine)
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
    
@app.get("/farms")
def farms(user: User = Depends(access_controller.is_logged_in)):
    farms = farm_service.get_farms_by_user(user)
    return farms

