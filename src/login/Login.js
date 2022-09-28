import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import login_user from "../login.png";
import axios from "axios";

const CompLogin = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msg, setMsg] = useState();
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/login', {
                email: email,
                password: password
            });
            navigate('/');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    return (
        <main className="form-signin w-100 m-auto container">
            <form onSubmit={Auth}>
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
                            <label for="floatingInput">Correo electronio</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" 
                            className="form-control" 
                            id="floatingPassword" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}/>
                            <label for="floatingPassword">Contraseña</label>
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