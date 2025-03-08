import { createContext, useContext, useEffect, useState } from 'react';
import { ToastContext } from "./ToastProvider.jsx";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [user, setUser] = useState();
    const { showToast } = useContext(ToastContext);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
      try {
          const response = await fetch('/api/user');
          const data = await response.json();
          
          if (data.status === 'unauthenticated') {
              setUser(null);
          } else if (response.ok) {
              setUser(data);
          }
      } catch (error) {
          // Silently handle any network errors
          setUser(null);

      }
    };
  
    const logIn = async (userObject) => {
        if (user) {
            return { message: "User already logged in.", success: false };
        } else if (!userObject.username) {
            return { message: "No username.", success: false };
        } else if (!userObject.password) {
            return { message: "No password", success: false };
        }
        const response = await sendLogin(userObject.username, userObject.password);

        if (response.success) {
            setUser(response.userData);
        } else {
            showToast('Login failed', `Check your username and password`, 'error');
        }

        return response;
    }

    const logOut = async () => {
        if (!user) {
            return { message: "User not logged in.", success: false };
        }

        try {
            const response = await fetch("/api/auth/logout");
            if (response.ok) {
                showToast('You logged out', `User ${user.username} logged out`, 'success');
            }
        } catch (err) {
            console.log(err);
        }

        setUser(null);
        return;
    }

    const register = async (userObject) => {
        return await sendRegistration(userObject);
    }

    const sendLogin = async (username, password) => {
        let options = {
            method: "POST",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ username, password }),
        };

        try {
            const response = await fetch("/api/auth/login", options);
            if (response.ok) {
                const data = await response.json();
                showToast('Login successful', 'Welcome ' + username + '!', 'success');
                return { message: "Login successful", userData: data, success: true };
            } else {
                console.error("Login request failed with status:", response.status);
                return { message: "Login failed, probably due to invalid credentials", success: false };
            }
        } catch (error) {
            console.error("Fetch error in login:", error);
            return { message: "Error in login protocol", success: false };
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
            const response = await fetch("/api/auth/register", options);
            if (response.ok) {
                const user = await response.json();
                showToast('Registration successful', 'Login with your new account', 'success');
                return { message: "Registration successful", success: true, user: user };
            } else {
                const data = await response.json();
                showToast('Registration failed', data.message, 'error');
                return { message: "Registration failed", success: false };
            }
        } catch (error) {
            console.error("Fetch error in registration:", error);
            showToast('Registration failed', error, 'error');
            return { message: "Registration failed", success: false };
        }
    };

    const getUser = () => {
        if (!user) {
            // getUser failed due to no user logged in
            return null;
        }

        return user;
    }

    return (
        <LoginContext.Provider value={{ logIn, logOut, register, getUser, user }}>
            {children}
        </LoginContext.Provider>
    );
};

const useLogin = () => useContext(LoginContext);

export { LoginProvider, useLogin };
export { LoginContext };
