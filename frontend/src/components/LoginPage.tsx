import { Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";


export function LoginPage () {
    
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({email: '', password: '', error: false})
    const { handleLogin, isLoggedIn } = useAuth()

    if (isLoggedIn) {
        navigate("/")
    }

    return (
        <Container maxWidth="sm">
            <Box>
                <div>
                    <TextField id="login-email-text-field" label="Email" variant="standard" value={loginData.email} onChange={event => setLoginData({...loginData, email: event.target.value})} error={loginData.error} />
                </div>
                <div>
                    <TextField id="login-password-text-field" label="Passwort" variant="standard" value={loginData.password} onChange={event => setLoginData({...loginData, password: event.target.value})} error={loginData.error}/>
                </div>
                <div>
                    <Button variant="contained" onClick={() => handleLogin({ email: loginData.email, password: loginData.password, onError: () => setLoginData(old => ({...old, error: true}))})}>Anmelden</Button>
                </div>
            </Box>
        </Container>
    )
}