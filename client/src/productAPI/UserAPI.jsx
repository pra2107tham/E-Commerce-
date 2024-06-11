import React, { useEffect, useState } from 'react'
import axios from "axios"

const UserAPI = (token) => {

    const[isLogged,setIsLogged] = useState(false)
    const[isAdmin,setIsAmin] = useState(false)

    useEffect(() => {
        if(token) {
            const getUser = async() => {
                try{
                    const user = await axios.get("http://localhost:3000/api/users/info",{
                        headers: {Authorization: token}
                    })
                }catch(error){
                    alert(error.response.data.message)
                }
            }
            getUser() 
        }
    },[token])
    
  return ({
        isLogged:[isLogged,setIsLogged],
        isAdmin:[isAdmin,setIsAmin]
    })
}

export default UserAPI