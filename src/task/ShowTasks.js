import axios from "axios";
import { useState, useEffect } from "react";
import { Link, resolvePath, useHref, useNavigate } from "react-router-dom";

const CompShowTasks = () => {
    const URI = 'http://localhost:8000/projects';
    const [search, setSeacrh] = useState('');
    const [tasks, setTask] = useState([])
    const [user, setUser] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getTasks();
    },[])
    
    const getTasks = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get(URI,{
            search: search,
            headers: {authorization: `Barer ${token}`}
        });
        setTask(res.data);
        console.log(useHref)
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
    let is_admin = localStorage.getItem('is_admin')
    let id_user = localStorage.getItem('id_user')

    if (!search) {
        if (is_admin === false) {
            results = tasks.filter((task) =>  
                task.user['id'] == id_user
            )
        } else {
            results = tasks
        }
        
    } else {
        if (is_admin === false) {
            results = tasks.filter((task) =>  
            task.user.id == id_user &&
            task.title_task.toLowerCase().includes(search.toLocaleLowerCase()) || 
            task.status_task.toLowerCase().includes(search.toLocaleLowerCase()) ||
            task.user['name_complete'].toLowerCase().includes(search.toLocaleLowerCase())
        ) 
        } else {
            results = tasks.filter((task) =>  
            task.title_task.toLowerCase().includes(search.toLocaleLowerCase()) || 
            task.status_task.toLowerCase().includes(search.toLocaleLowerCase()) ||
            task.user['name_complete'].toLowerCase().includes(search.toLocaleLowerCase())
        ) 
        }
        
    }


    return(
            
        <div className="container">
        <div className="row">
            <div className="col">
                <div className="text-center">
                <div className="text-center">
                    <h4> <b>Tareas Pendientes</b></h4>
                </div>
                    <div className="row justify-content-md-center">
                        <div className="col-5">
                            <div className="mb-2">
                                <input value={search} onChange={searcher} className="form-control text-center" placeholder="Filtro: Nombre, Asignado, Estatus"/>
                            </div>
                        </div>
                    </div>
                    
                    <Link to="/create_task" className="btn btn-info mx-2">Nueva Tarea</Link> 
                    <Link to="/consulting" className="btn btn-success mx-2">Consultados</Link>
                </div>  
                <div className="card mt-2">
                    <div className="card-body">
                        <div className="row">
                            {results.length > 0 &&
                                results.map ((task) => (
                                    <div key={task.id} className="col-lg-4 col-12">      
                                            <div className="card mb-2">
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
                                ))
                            }
                            {results.length == 0 &&
                                <h3 className="text-center">No existen coincidencias</h3>
                            }


                        </div>    
                    </div>
                </div>
            </div>
        </div>
        </div>  
    )
}

export default CompShowTasks