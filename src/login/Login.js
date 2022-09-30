import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import login_user from "../login.png";
import axios from "axios";
import jwtDecode from "jwt-decode";
import LoadingSpinner from "../components/Loading.js";
const CompLogin = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msg, setMsg] = useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const URI = "http://localhost:8000/auth"

    const refreshToken = async () => {
        try {
            const res = await axios.post(`${URI}/refresh`,{token: user.refreshToken})
            setUser({
                ...user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            })
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
    
    const axiosJwt = axios.create()

    axiosJwt.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwtDecode(user.accessToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers["authorization"] = "Barer " +data.accessToken;
            }
            return config;
        }, (error) => {
            return Promise.reject(error)
        }
    )


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        
        try {
            const res = await axios.post(`${URI}/login`, {
                email: email, password: password
            })
            setUser(res.data)
            localStorage.setItem("user_name", res.data.user_name)
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("refresh_token", res.data.refreshToken);
            localStorage.setItem("name_complete", res.data.name_complete);
            localStorage.setItem("is_admin", res.data.is_admin);
            localStorage.setItem("id_user", res.data.id_user);

            navigate('/')
            setTimeout(() => {
                setIsLoading(false)
              }, 3000)

        } catch (error) {
            console.log(error)
            setIsLoading(false)

        }
    }
    return (
        <main className="form-signin w-100 m-auto container">
            {isLoading ? <LoadingSpinner /> :   ''}
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-md-center">
                    <div className="col-lg-5 col-12">
                        <div className="text-center">
                            <img className="mb-4 rounded-circle" src={login_user} alt=""/>
                        </div>
                        <h1 className="h3 mb-3 fw-normal text-center">Iniciar Sesión</h1>

                        <div className="form-floating mb-3">
                            <input type="email" 
                            className="form-control" 
                            id="floatingInput" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}/>
                            <label>Correo electronio</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                            type="password"
                            className="form-control" 
                            id="floatingPassword" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}/>
                            <label>Contraseña</label>
                        </div>

                        <button className="w-100 btn btn-lg btn-primary" type="submit">Iniciar Sesión</button>
                        <div className="text-center">
                            <Link to="/register" className="create_account">Crear una Cuenta</Link>
                        </div>
                    </div>
                </div>
            
                
            </form>
        </main>
    )
}

export default CompLogin