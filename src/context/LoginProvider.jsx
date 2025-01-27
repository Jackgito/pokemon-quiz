/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from 'react';
import error from "eslint-plugin-react/lib/util/error.js";
import {Alert} from "@mui/material";

const LoginContext = createContext();

const exampleProfile = {
    first_name: "Arttu",
    last_name: "Korpela",
    password:"test123",
    email: "arttu@email.com",
    pic: "./public/test2.png"
}

const LoginProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [testUser, setTestUser] = useState(null)

    const logIn = (userObject) => {

        if (user) {
            return {message: "user already logged in.", success: false};
        }
        //TODO: Generate logic to send a request to backend
        if (testUser.email === userObject.email && testUser.password === userObject.password) {
          setUser(testUser);
          return {message: "user logged in", success: true};
        };

        return {message: "Wrong password or email", success: false};
    }

    const logOut = () => {
        if (!user) {
            return {message: "user not logged in.", success: false};
        }
        //TODO: Remove Cookie

        setUser(null);
        return {message: "user logged out", success: true};
    }

    const signUp = async (userObject) => {
        //TODO: Create request to server
        console.log("Succces!\n," +
          "The user reached the destination:\n"+
          userObject.first_name+"\n",
          userObject.last_name+"\n",
          userObject.email+"\n",
          userObject.password+"\n")

        setTestUser({
            first_name: userObject.first_name,
            last_name: userObject.last_name,
            password:userObject.password,
            email: userObject.email,
            pic: userObject.pic
        });

        const response = await sendRegistration(userObject);
        console.log("RESPONSE: "+ response)

        return response;
    }

    const sendRegistration = async (userObject) => {
        let options = {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(userObject),
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/register", options);
            if (response.ok) {
                console.log("Registration request successful");
                return "Success"; // Return a meaningful response
            } else {
                console.error("Registration request failed with status:", response.status);
                return "Failed"; // Return a failure message
            }
        } catch (error) {
            console.error("Fetch error in registration:", error);
            return "Error"; // Return an error message
        }
    };
    const getUser = () => {
        if (!user) {
            console.log("getUser failed due to no user logged in")
            return null
        }

        return user;
    }


    return (
        <LoginContext.Provider value={{ logIn, logOut, signUp, getUser }}>
            {children}
        </LoginContext.Provider>
    );
};

const useLogin = () => useContext(LoginContext);

export { LoginProvider, useLogin };
