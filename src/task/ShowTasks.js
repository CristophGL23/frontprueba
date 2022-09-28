import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompButtonsHeader from "../components/ButtonsHeader";
import jwt_decode from 'jwt-decode';

const URI = 'http://localhost:8000/projects';

const CompShowTasks = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();
    const [tasks, setTask] = useState([])
    useEffect(() => {
        getTasks();
        refreshToken();
    },[])

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:8000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }

    const axiosJWT = axios.create();
 
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:8000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getTasks = async () => {
        const res = await axios.get(URI);
        setTask(res.data);
    }

    return(
        <div className="container">
            Hola: {name}
            <div className="row">
                <div className="col">
                    <CompButtonsHeader></CompButtonsHeader>
                    <div className="card mt-2">
                        <div className="card-body">
                            <div className="row">
                            { tasks.map ((task) => (
                                <div className="col-3">      
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-title text-center">
                                                    <h6 className="text-wrap">{task.title_task}</h6> 
                                                </div>
                                                <div className="text-start">
                                                    <p className="font-text-small">
                                                        <i className="fa fa-user"></i> Asignado : {task.user.name_complete }
                                                    </p>
                                                    <p className="font-text-small">
                                                        <i className="fa fa-clock"></i> Estatus : <button disabled={true} className="btn btn-warning btn-sm">{task.status_task }</button>
                                                    </p>
                                                    <div className="text-center">
                                                        <Link to="/show-task" className="btn btn-outline-primary px-5">Ver</Link>
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

export default CompShowTasks