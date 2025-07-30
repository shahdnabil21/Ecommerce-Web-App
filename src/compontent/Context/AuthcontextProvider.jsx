import React, { createContext, useEffect, useState } from 'react'
export let Authcontext = createContext()
export default function AuthcontextProvider({children}) {
    let [token, setToken] = useState(null)
    useEffect(()=> {
        let Tokenstorage = localStorage.getItem("token")
        if (Tokenstorage){
            setToken(Tokenstorage)
        }
    })
  return (
    <Authcontext.Provider value={{token,setToken }}>
        {children}
    </Authcontext.Provider>
  )
}
