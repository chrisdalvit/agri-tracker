import { useCookies } from "react-cookie";
import { API_HOST, SESSION_COOKIE_KEY } from "./utils"


export function useAPI() { 

    const [cookies, setCookie, removeCookie] = useCookies([SESSION_COOKIE_KEY]);

    async function fetchUserFarms() {
        const response = await fetch(API_HOST + "/farms", {
            method: "GET",
            headers: {
                "X-Session-Token": cookies.agritracker_session
            }
        })
        return response.json()
    }

    return {
        queryUserFarms: { queryKey: ['farms'], queryFn: fetchUserFarms }
    }
}