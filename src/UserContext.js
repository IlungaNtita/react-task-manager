import { createContext, useContext, useState } from "react";

const ActiveUserContext = createContext()
const UpdateActiveUserContext = createContext()

export function useUser() {
    return useContext(ActiveUserContext)
}

export function useUpdateUser() {
    return useContext(UpdateActiveUserContext)
}

export function UserContextProvider({ children }) {
    const [activeUser, setActiveUser] = useState(localStorage.getItem("ACTIVEUSER")|| null)
    
    function toggleUser(){
        setActiveUser(localStorage.getItem("ACTIVEUSER"))
    }

    return (
        <ActiveUserContext.Provider value={activeUser}>
            <UpdateActiveUserContext.Provider value={toggleUser}>
                {children}
            </UpdateActiveUserContext.Provider>
        </ActiveUserContext.Provider>
    )

}