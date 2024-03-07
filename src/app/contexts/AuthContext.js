import React, {useContext, useEffect} from "react";
import { Auth } from "firebase/auth";

const AuthContext = react.createContext

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()

    function signup(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect( () => {
    const unsubcribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        return unsubcribe
    })

    const value = {
        currentUser,
        signup
    }
}, [])

    

    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}