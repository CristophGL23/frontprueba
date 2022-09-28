import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const URI = 'http://localhost:8000/projects'
const URI_USER = 'http://localhost:8000/users'


const CompCreateTask = () => {
    const [title_task, setTitleTask] = useState();
    const [userId, setUserId] = useState();
    const [description_task, setDescriptionTask] = useState();  
    const navigate = useNavigate();


    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, {
            title_task: title_task,
            userId: 1,
            status_task: 'En progreso',
            description_task: description_task
        })
        navigate('/')
    }

    const [users, setUser] = useState([])
    useEffect(() => {
        getUsers()
    },[])

    const getUsers = async () => {
        const res = await axios.get(URI_USER);
        setUser(res.data);
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
                                        <label className="form-label">Titulo: </label>
                                        <input 
                                        value={title_task} 
                                        onChange={(e) => setTitleTask(e.target.value)}
                                        type="text"
                                        className="form-control"/>
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Asignar: </label>
                                        <select className="form-select" 
                                        value={userId} 
                                        onSelect={(e) => setUserId(e.target.value)}>
                                            <option selected>Selecciona el usuario a asignar.</option>
                                            {users.map((user) => (
                                                <option value={user.id} key={user.id}>{user.name_complete}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Descripción: </label>
                                        <textarea className="form-control"
                                        value={description_task} 
                                        onChange={(e) => setDescriptionTask(e.target.value)}/>
                                    </div> 
                                    <button type="submit" className="btn btn-primary">Agregar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )

}

export default CompCreateTask