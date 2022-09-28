import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import login_user from "../login.png"

const CompCreateAccount = () => {
    const URI = 'http://localhost:8000/users';
    const [name_complete, setNameComplete] = useState();
    const [user_name, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();


    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, {
            name_complete: name_complete,
            user_name: user_name,
            email: email,
            password: password
        })
        navigate('/login')
    }
    return (
        
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card mt-2">
                        <div className="card-body">
                            <div className="row">
                                <form onSubmit={store} className="row">    
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Nombre Completo: </label>
                                        <input 
                                        value={name_complete} 
                                        onChange={(e) => setNameComplete(e.target.value)}
                                        type="text"
                                        className="form-control"/>
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Nombre Usuario: </label>
                                        <input 
                                        value={user_name} 
                                        onChange={(e) => setUserName(e.target.value)}
                                        type="text"
                                        className="form-control"/>
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Correo Electronico: </label>
                                        <input 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="text"
                                        className="form-control"/>
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Contraseña: </label>
                                        <input 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        className="form-control"/>
                                    </div>
                                     
                                    <button type="submit" className="btn btn-primary">Registrar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default CompCreateAccount