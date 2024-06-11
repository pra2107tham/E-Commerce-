import { createContext, useEffect, useState } from "react"
import ProductAPI from "./productAPI/ProductAPI"
import axios from "axios"
import UserAPI from "./productAPI/UserAPI"

export const GlobalState = createContext()

export const DataProvider = ({children}) => {

    const [token,setToken] = useState(false)
    const refreshToken = async() => {
        try {
            const response = await axios.get("http://localhost:3000/api/users/refresh_token")
            setToken(response.data.accessToken)
        } catch (error) {
            console.log(error.response.message)
        }
    }
    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin")
        if(firstLogin){
            refreshToken()
        }
    })
    const productAPI = ProductAPI()
    const state = {
        token: [token,setToken],
        productAPI: productAPI,
        userAPI: UserAPI(token)
    }
    console.log(state)

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}

