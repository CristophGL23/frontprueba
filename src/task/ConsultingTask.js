import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const CompConsultingTasks = () => {
    const URI = 'http://localhost:8000/projects';
    const [search, setSeacrh] = useState('');
    const [tasks, setTask] = useState([])
    useEffect(() => {
        getTasks();
    },[])

    const getTasks = async () => {
        const res = await axios.get(`${URI}/consultados`,{
            search: search
        });
        setTask(res.data);
    }

    const searcher = (e) => {
        setSeacrh(e.target.value)
    }

    const changeColor = function (task) {
        switch (task.status_task) {
            case 'En progreso':     
                return 'btn btn-warning btn-sm'
            case 'Pendiente':     
                return 'btn btn-danger btn-sm'
            case 'Completado':     
                return 'btn btn-success btn-sm'
            default:
                break;
        }
    }

    let results = []
    if (!search) {
        results = tasks
    } else {
        results = tasks.filter((task) =>  
            task.title_task.toLowerCase().includes(search.toLocaleLowerCase()) || 
            task.status_task.toLowerCase().includes(search.toLocaleLowerCase()) ||
            task.user['name_complete'].toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="text-center">
                        <div className="row justify-content-md-center">
                            <div className="col-5">
                                <div className="mb-2">
                                    <input value={search} onChange={searcher} className="form-control text-center" placeholder="Filtro: Nombre, Asignado, Estatus"/>
                                </div>
                            </div>
                        </div>
                        
                        <Link to="/create_task" className="btn btn-info mx-2">Nueva Tarea</Link> 
                    </div>  
                    <div className="card mt-2">
                        <div className="card-body">
                            <div className="row">
                            { results.map ((task) => (
                                <div className="col-3">      
                                        <div className="card card-height">
                                            <div className="card-body">
                                                <div className="card-title text-center">
                                                    <h6 className="text-wrap">{task.title_task}</h6> 
                                                </div>
                                                <div className="text-start">
                                                    <p className="font-text-small">
                                                        <i className="fa fa-user"></i> Asignado : {task.user.name_complete }
                                                    </p>
                                                    <p className="font-text-small">
                                                        <i className="fa fa-clock"></i> Estatus : <button disabled={true} className={changeColor(task)} >{task.status_task }</button>
                                                    </p>
                                                    <div className="text-center">
                                                        <Link to={`/show-task/${task.id}`} className="btn btn-outline-primary px-5">Ver</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                    
                                </div>
                                    ))}
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default CompConsultingTasks