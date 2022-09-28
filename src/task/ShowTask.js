import axios from "axios";
import { useEffect, useState } from "react";


const CompShowTask = () => {
    const URI = 'http://localhost:8000/projects';

    const [task, setTask] = useState();
    useEffect(() => {
        getTask()
    },[])

    const getTask = async () => {
        const res = axios.get(`${URI}/${task.id}`);
        setTask(res.data)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card mt-2">
                        <div className="card-body">
                            <div className="row">
                                <form className="row">    
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Titulo: </label>
                                        <input 
                                        value={task.title_task} 
                                        
                                        type="text"
                                        className="form-control"/>
                                    </div>
                                    {/* <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Asignar: </label>
                                        <select className="form-select" 
                                        value={userId} 
                                        onSelect={(e) => setUserId(e.target.value)}>
                                            <option selected>Selecciona el usuario a asignar.</option>
                                            {users.map((user) => (
                                                <option value={user.id} key={user.id}>{user.name_complete}</option>
                                            ))}
                                        </select>
                                    </div> */}
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Descripción: </label>
                                        <textarea className="form-control"
                                        value={task.description_task} />
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

export default CompShowTask