import { useCookies } from "react-cookie";
import { API_HOST, SESSION_COOKIE_KEY } from "./utils"
import { useNavigate } from "react-router";
import { FarmWorker, NewFarmWorker } from "../utils/types";
import { useQueryClient } from "@tanstack/react-query";


export function useAPI() { 

    const [cookies, setCookie, removeCookie] = useCookies([SESSION_COOKIE_KEY]);
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    async function genericGetRequest(url: string) {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-Session-Token": cookies.agritracker_session
            }
        })
        if (response.status === 401){ // UNAUTHORIZED --> logout
            removeCookie(SESSION_COOKIE_KEY)
            navigate("/login")
        }
        return response
    }

    async function genericDeleteRequest(url: string) {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "X-Session-Token": cookies.agritracker_session
            }
        })
        if (response.status === 401){ // UNAUTHORIZED --> logout
            removeCookie(SESSION_COOKIE_KEY)
            navigate("/login")
        }
        return response
    }

    async function genericPostRequest(url: string, data: object) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "X-Session-Token": cookies.agritracker_session,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (response.status === 401){ // UNAUTHORIZED --> logout
            removeCookie(SESSION_COOKIE_KEY)
            navigate("/login")
        }
        return response
    }

    async function genericPutRequest(url: string, data: object) {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "X-Session-Token": cookies.agritracker_session,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (response.status === 401){ // UNAUTHORIZED --> logout
            removeCookie(SESSION_COOKIE_KEY)
            navigate("/login")
        }
        return response
    }

    async function fetchUserOrchards() {
        const response = await genericGetRequest(API_HOST + "/orchards")
        return response.json()
    }

    async function fetchUserOrchard(id: string) {
        const response = await genericGetRequest(API_HOST + "/orchards/" + id)
        return response.json()
    }

    async function fetchWorkers() {
        const response = await genericGetRequest(API_HOST + "/workers")
        return response.json() as Promise<FarmWorker[]>
    }

    async function addWorker(worker: NewFarmWorker) {
        await genericPostRequest(API_HOST + "/workers", worker)
    }

    async function deleteWorker(worker: FarmWorker) {
        await genericDeleteRequest(API_HOST + "/workers/" + worker.id.toString())
    }

    async function editWorker(worker: FarmWorker) {
        await genericPutRequest(API_HOST + "/workers/" + worker.id.toString(), worker)
    }

    return {
        queryUserOrchards: () => ({ queryKey: ['userOrchards'], queryFn: fetchUserOrchards }),
        queryUserOrchard: (id: string) => ({ queryKey: ['userOrchard', id], queryFn: () => fetchUserOrchard(id) }),
        queryWorkers: () => ({ queryKey: ['workers'], queryFn: fetchWorkers }),
        addWorkerMutation: () => ({ mutationFn: (worker: NewFarmWorker) => addWorker(worker), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['workers'] }) } }),
        deleteWorkerMutation: () => ({ mutationFn: (worker: FarmWorker) => deleteWorker(worker), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['workers'] }) } }),
        editWorkerMutation: () => ({ mutationFn: (worker: FarmWorker) => editWorker(worker), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['workers'] }) } })
    }
}