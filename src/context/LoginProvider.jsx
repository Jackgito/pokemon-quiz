/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

const exampleProfile = {
    first_name: "Arttu",
    last_name: "Korpela",
    password:"test123",
    email: "arttu@email.com",
    pic: "./public/test2.png"
}

const LoginProvider = ({ children }) => {

    const [user, setUser] = useState();

    const logIn = (userObject) => {

        if (user) {
            return {message: "user already logged in.", success: false};
        } else if (!userObject.email) {
            return {message: "no email.", success: false};
        } else if (!userObject.password) {
            return {message: "no password", success: false};
        }
        const response = sendLogin(userObject.email, userObject.password);
        return response
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

        const response = await sendRegistration(userObject);
        console.log("RESPONSE: "+ response)

        return response;
    }

    const sendLogin = async (email, password) => {
        let options = {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({email:email, password:password}),
        };
        try {
            const response = await fetch("http://127.0.0.1:8000/login", options);
            if (response.ok) {
                const data = await response.json();
                console.log("Login request successful, welcome:  " + data.first_name);
                return {message:"login succesfull",userdata:data, success: true};
            } else {
                console.error("Login request failed with status:", response.status);
                return {message:"login failed probably due to invalid credentials", success: false};
            }
        } catch (error) {
            console.error("Fetch error in login:", error);
            return {message:"Error in login protocol", success: false};
        }



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
                return "Success";
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
