import {createContext, useContext, useEffect, useState} from 'react';
import {ToastContext} from "./ToastProvider.jsx";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {

    const [user, setUser] = useState();
    const { showToast } = useContext(ToastContext);

    useEffect( () => {
        fetchUser();
    }, []);

    const fetchUser = async () => {

        if (document.cookie.length === 0) return;

        const response = await fetch('/api/user');
        if (response.ok) {
            const userData = await response.json();
            setUser(userData);
        }
    }

    const logIn = async (userObject) => {

        if (user) {
            return {message: "user already logged in.", success: false};
        } else if (!userObject.email) {
            return {message: "no email.", success: false};
        } else if (!userObject.password) {
            return {message: "no password", success: false};
        }
        const response = sendLogin(userObject.email, userObject.password);

        if ((await response).success) {
            setUser((await response).userdata);
            localStorage.setItem("user", (await response).userdata._id)
        }
        else {
            showToast('Login failed', `Check your password and email`, 'error');
        }

        return response
    }

    const logOut = async () => {
        if (!user) {
            return {message: "user not logged in.", success: false};
        }
        console.log("Reached")
        try {
            const response = await fetch("/api/auth/logout");
            if (response.ok) {
                showToast('You logged out', `User ${user.email} logged out`, 'success');
            } else {
                console.log("Error in logOut");
            }
        } catch (err) {
            console.log(err)
        }

        setUser(null);
        return;
    }

    const signUp = async (userObject) => {
        return await sendRegistration(userObject);
    }

    const sendLogin = async (email, password) => {
        let options = {
            method: "POST",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({email:email, password:password}),
        };
        try {
            const response = await fetch("/api/auth/login", options);
            if (response.ok) {
                const data = await response.json();
                showToast('Login successful', 'Welcome!', 'success');
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
            const response = await fetch("http://127.0.0.1:8080/auth/register", options);
            if (response.ok) {
                const user = await response.json();
                showToast('Registration successful', 'Login with your new account', 'success')
                return {message: "Registration successful", success: true, user:user}
            } else {
                const data = await response.json()
                showToast('Registration failed', data.message, 'error')
                return {message: "Registration failed", success: false}

            }
        } catch (error) {
            console.error("Fetch error in registration:", error);
            showToast('Registration failed', error, 'error')
            return {message: "Registration failed", success: false}

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
        <LoginContext.Provider value={{ logIn, logOut, signUp, getUser, user }}>
            {children}
        </LoginContext.Provider>
    );
};

const useLogin = () => useContext(LoginContext);

export { LoginProvider, useLogin };
export {LoginContext}
