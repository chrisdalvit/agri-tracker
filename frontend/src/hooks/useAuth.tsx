import { useMutation } from "@tanstack/react-query"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router"

export type LoginHandlerArguments = {
    email: string
    password: string
    onError: () => void
}

export function useAuth() {
    
    const sessionCookieKey = "agritracker_session"
    const [cookies, setCookie, removeCookie] = useCookies([sessionCookieKey]);
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: async (data: LoginHandlerArguments) => {
            const response = await fetch('http://localhost:5001/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: data.email, password: data.password})
            })
            if (response.ok) {
                const data = await response.json()
                setCookie(sessionCookieKey, data.session)
                navigate(data.redirect)
            }
            else {
                data.onError()
            }
        },
    })

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch('http://localhost:5001/logout', {
                method: "POST",
                headers: {
                    "X-Session-Token": cookies.agritracker_session
                }
            })
            if (response.ok) {
                removeCookie(sessionCookieKey)
            }
        }
    })

    const isLoggedIn = document.cookie.split(";").some(i => i.trim().startsWith(sessionCookieKey))

    return {
        handleLogin: (args: LoginHandlerArguments) => loginMutation.mutate(args),
        handleLogout: () => logoutMutation.mutate(),
        isLoggedIn: isLoggedIn
    }
}