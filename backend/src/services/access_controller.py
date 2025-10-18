from fastapi import status, Request, HTTPException
from .user import UserService

class AccessController:
    
    def __init__(self, user_service: UserService):
        self.user_service = user_service
    
    def is_logged_in(self, request: Request):
        session = request.headers.get("X-Session-Token", None)
        user = self.user_service.get_user_by_session(session)
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
        return user