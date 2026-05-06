import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const userDataContext = createContext()

function UserContext({children}) {
    let [userData, setUserData] = useState("")
    let {serverUrl} = useContext(authDataContext)

    const getCurrentUser = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/user/getcurrentuser", {withCredentials: true})
            setUserData(result.data)
            console.log(result.data)
        } catch (error) {
            setUserData(null)
            console.log(error)
        }
    }

    // ✅ FIXED: added logout function
    const logout = async () => {
        try {
            await axios.post(serverUrl + "/api/auth/logout", {}, {withCredentials: true})
            setUserData(null) // ✅ clears user state after logout
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    let value = {
        userData, setUserData, getCurrentUser, logout // ✅ logout exposed in context
    }

    return (
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext