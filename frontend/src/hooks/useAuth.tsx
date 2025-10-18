import { useMutation } from "@tanstack/react-query"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router"
import { API_HOST, SESSION_COOKIE_KEY } from "./utils"

export type LoginHandlerArguments = {
    email: string
    password: string
    onError: () => void
}

export function useAuth() {
    
    
    const [cookies, setCookie, removeCookie] = useCookies([SESSION_COOKIE_KEY]);
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: async (data: LoginHandlerArguments) => {
            const response = await fetch(API_HOST + '/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: data.email, password: data.password})
            })
            if (response.ok) {
                const data = await response.json()
                setCookie(SESSION_COOKIE_KEY, data.session)
                navigate(data.redirect)
            }
            else {
                data.onError()
            }
        },
    })

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(API_HOST + '/logout', {
                method: "POST",
                headers: {
                    "X-Session-Token": cookies.agritracker_session
                }
            })
            if (response.ok) {
                removeCookie(SESSION_COOKIE_KEY)
            }
        }
    })

    const isLoggedIn = document.cookie.split(";").some(i => i.trim().startsWith(SESSION_COOKIE_KEY))

    return {
        handleLogin: (args: LoginHandlerArguments) => loginMutation.mutate(args),
        handleLogout: () => logoutMutation.mutate(),
        isLoggedIn: isLoggedIn
    }
}