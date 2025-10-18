import { useCookies } from "react-cookie";
import { API_HOST, SESSION_COOKIE_KEY } from "./utils"


export function useAPI() { 

    const [cookies, setCookie, removeCookie] = useCookies([SESSION_COOKIE_KEY]);

    async function fetchUserOrchards() {
        const response = await fetch(API_HOST + "/orchards", {
            method: "GET",
            headers: {
                "X-Session-Token": cookies.agritracker_session
            }
        })
        return response.json()
    }

    return {
        queryUserOrchards: () => ({ queryKey: ['farms'], queryFn: fetchUserOrchards }),
    }
}