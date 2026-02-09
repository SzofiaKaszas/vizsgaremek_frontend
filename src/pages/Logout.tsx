import { AuthContext } from "@/context/authContext"
import { useContext, useEffect } from "react"

export function Logout() {
    const context = useContext(AuthContext)

    useEffect(() => {
        async function logout() {
            await context.logout();
        }
        logout()
        window.location.href = "/main"
    }, [])

    return(<></>)
}