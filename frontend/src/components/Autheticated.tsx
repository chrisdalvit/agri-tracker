import { JSX, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"


type AutheticatedProps = {
    children: React.ReactNode
}

export function Autheticated({ children }: AutheticatedProps) {
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/login")
        }
    }, [isLoggedIn, navigate])

    return isLoggedIn ? children as JSX.Element : null
}