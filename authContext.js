//hume user ki  information local storage mai store hoti jari hume koi state management tool chaiye taki hum is cheez ko manage kar sake uske liye
//redux hum user kar sakte lkain hum yaha react contesxt api ka use kar rai hai

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext()  //is auth contesxt kai andar sab ajaga user ka 
//ab context provider kai madath se capp component ko wrap kar denge phir hum state ki information kisi bhi component mai use kar sake.

export const AuthContextProvider=({children})=>{  //ye childern yani app component hai
    //ab agr user login to hi to data milna chaiye ,yani tabi to data localstorage mai jayega ,agr aisa nhi hai to nhi jayega
    //ab vo jo localstorage hai usme data jakr storage use(data) ko mai object mai convert kar raha hun 
    const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user") || null)) ;

    const login=async(inputs)=>{
        const res=await axios.post("/auth/login",inputs);
        setCurrentUser(res.data);
    };
    const logout=async(inputs)=>{
        await axios.post("/auth/logout");
        setCurrentUser(null);
    };

    // when ever we change the currentUserwe update the localstorage items
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser]);

    return (
        <AuthContext.Provider value={{currentUser,login,logout}}>{children}</AuthContext.Provider>   //{{currentUser,ligin,logotu}} double braces kuki props hai
    )
};