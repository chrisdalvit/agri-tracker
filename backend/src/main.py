from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware

from .models import Base, engine
from .models.user import User
from .services.user import UserService
from .services.access_controller import AccessController
from .services.orchard import OrchardService
from .services.worker import WorkerService
app = FastAPI()

class LoginRequest(BaseModel):
    email: str
    password: str
    
class LogoutRequest(BaseModel):
    token: str
    
class NewWorkerRequest(BaseModel):
    firstname: str
    lastname: str

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
orchard_service = OrchardService(engine)
access_controller = AccessController(user_service)
worker_service = WorkerService(engine)

@app.post("/login")
def login(login_request: LoginRequest):
    token = user_service.login(login_request.email, login_request.password)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return {"redirect": "/", "session": token}
    
@app.post("/logout")
def logout(user: User = Depends(access_controller.is_logged_in)):
    user_service.logout(user)
    
@app.get("/workers")
def workers(user: User = Depends(access_controller.is_logged_in)):
    return worker_service.get_all_workers()

@app.post("/workers")
def add_worker(new_worker: NewWorkerRequest, user: User = Depends(access_controller.is_logged_in)):
    return worker_service.add_worker(new_worker.firstname, new_worker.lastname)

@app.delete("/workers/{id}")
def delete_worker(id: int, user: User = Depends(access_controller.is_logged_in)):
    worker_service.delete_worker(id)

@app.get("/orchards")
def orchards(user: User = Depends(access_controller.is_logged_in)):
    return orchard_service.get_user_orchards(user)

@app.get("/orchards/{id}")
def orchard(id: int, user: User = Depends(access_controller.is_logged_in)):
    return orchard_service.get_user_orchard(user, id)