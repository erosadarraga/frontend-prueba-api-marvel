import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({
        nombre: "",
        correo: ""
    });
    const [token, setToken] = useState()
    const navigate = useNavigate();

    const dataLocalStorage = () => {
        setUserInfo({
            correo: localStorage.getItem("correo"),
            nombre: localStorage.getItem("userName"),

        })
        setToken(localStorage.getItem("token"))
    }

    const iniciarSesion = async (correo, contraseña) => {
        try {
            console.log(correo, contraseña);
            // const res = await fetch("http://localhost:5000/api/v1/auth/login",
            const res = await fetch("https://marvelauthapi.onrender.com/api/v1/auth/login",

                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "correo": correo,
                        "contraseña": contraseña
                    }),
                }
            );

            const data = await res.json();
            console.log(data.token);
            if (data) {

                const UserResponse = await informacionUsuario(data.token)
                if (UserResponse) {
                    localStorage.setItem("correo", UserResponse.correo)
                    localStorage.setItem("userName", `${UserResponse.nombre} ${UserResponse.apellidos}`)
                    localStorage.setItem("token", data.token)
                    dataLocalStorage()
                }
            }
            navigate('/home')
        } catch (error) {
            console.log(error);
        }
    };
    const registrese = async (correo, contraseña, nombre, apellidos) => {
        try {
            cerrarSession()
            console.log(correo, contraseña, nombre, apellidos);
            // const res = await fetch("http://localhost:5000/api/v1/auth/register",
            const res = await fetch("https://marvelauthapi.onrender.com/api/v1/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: nombre,
                        apellidos: apellidos,
                        correo: correo,
                        contraseña: contraseña
                    }),
                }

            );
            console.log(res.ok, res.status, res);

            const { token } = await res.json();
            navigate('/signin')
        } catch (error) {
            navigate('/signup')
            console.log(error);
        }
    };

    const cerrarSession = async () => {
        try {
            // const res = await fetch("http://localhost:5000/api/v1/auth/logout",
            const res = await fetch("https://marvelauthapi.onrender.com/api/v1/auth/logout",
                {
                    method: "GET",
                });
            localStorage.removeItem("correo")
            localStorage.removeItem("userName")
            localStorage.removeItem("token")
            setUserInfo({
                correo: "",
                nombre: ""
            })
            setToken("")
            navigate('/signin')
            console.log(res);
        } catch (error) {

        }
    };

    const informacionUsuario = async (token) => {
        try {
            // const res = await fetch("http://localhost:5000/api/v1/auth/protected",
            const res = await fetch("https://marvelauthapi.onrender.com/api/v1/auth/protected",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                });
            console.log(res.ok, res.status);
            const data = await res.json();

            if (res.ok) {
                return data

            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        dataLocalStorage()

    }, []);

    return (
        <UserContext.Provider value={{ iniciarSesion, token, registrese, cerrarSession, userInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};