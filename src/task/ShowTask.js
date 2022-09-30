import axios from "axios";
import { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const URI = 'http://localhost:8000/projects/';
const URI_USER = 'http://localhost:8000/users';
const URI_FILE = 'http://localhost:8000/files';



const CompShowTask = () => {
    const [title_task, setTitleTask] = useState('');
    const [userId, setUserId] = useState('');
    const [status_task, setStatusTask] = useState('');
    const [description_task, setDescriptionTask] = useState('');
    const [files, setFile] = useState('');
    const [checkin, setCheckin] = useState('');
    const [date_send, setDateSend] = useState('');  
    const [date_finally, setDateFinally] = useState('');  

    const [edit, setEdit] = useState(true);  
    const [documents, setDocuments] = useState([])

    const [users, setUser] = useState([])
    const {id} = useParams()
    const navigate = useNavigate();

    const update = async (e) => {
        e.preventDefault();
        await axios.put(URI+id, {
            title_task: title_task,
            userId: userId,
            status_task: status_task,
            description_task: description_task,
            date_finally: date_finally,
            date_send: date_send
        }).then((response) => {
            Swal.fire({
                title: response.data.message,
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              });
        })
        navigate('/')
    }

    const formData = new FormData()
    formData.append('files', files)
    formData.append('userId', userId)
    formData.append('taskId', id)


    const uploadImage = async (e) => {
        e.preventDefault();
        await axios.post(URI_FILE, formData).then((response) => {
            Swal.fire({
                title: response.data.message,
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              })
        })
        navigate(`/`)
        // redirect(`/show-task/${id}`)
        // getTask();
        // window.location.href()

    }

    useEffect(() => {
        getTask();
        getUsers();
        getFiles();
        updateCheck();
        
    },[])

    const getTask = async () => {
        const res = await axios.get(URI+id);
        setTitleTask(res.data.title_task);
        setUserId(res.data.userId);
        setDescriptionTask(res.data.description_task);
        setStatusTask(res.data.status_task);
        setCheckin(res.data.checkin);
        setDateSend(res.data.date_send);
        setDateFinally(res.data.date_finally);


    }
    
    const getFiles = async () => {
        const res = await axios.get(URI_FILE);
        setDocuments(res.data);
    }

    const getUsers = async () => {
        const res = await axios.get(URI_USER);
        setUser(res.data);
    }

    const updateCheck = async () => {
        if (checkin == 0) {
            const res = await axios.put(`${URI}/consultados/${id}`,{
                checkin: 1
            });
        } 
    }

    let archivos = []
    
    archivos = documents.filter((doc) =>  
        doc.taskId == id
    )
    
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="text-center">
                        <h4>Editar -> <b>{title_task}</b></h4>
                    </div>
                    <div className="card mt-2 mb-5">
                        <div className="card-header">  
                            <button className="btn btn-success" onClick={(e) => setEdit(!edit)}>Editar</button>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <form onSubmit={update} className="row">    
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Titulo: </label>
                                        <input 
                                        value={title_task} 
                                        onChange={(e) => setTitleTask(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        disabled={edit}/>
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Asignar: </label>
                                        <select className="form-select" 
                                        value={userId} 
                                        onChange={(e) => setUserId(e.target.value)}
                                        disabled={edit}
                                        >
                                            <option selected>Selecciona el usuario a asignar.</option>
                                            {users.map((user) => (
                                                <option value={user.id} key={user.id}>{user.name_complete}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Día de envio: </label>
                                        <input 
                                        value={date_send} 
                                        disabled={edit}
                                        onChange={(e) => setDateSend(e.target.value)}
                                        type="date"
                                        className="form-control"/>
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Día final: </label>
                                        <input 
                                        value={date_finally} 
                                        disabled={edit}
                                        onChange={(e) => setDateFinally(e.target.value)}
                                        type="date"
                                        className="form-control"/>
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Estatus</label>
                                        <select className="form-select" 
                                        value={status_task} 
                                        onChange={(e) => setStatusTask(e.target.value)}
                                        disabled={edit}
                                        >
                                            <option value="En progreso">En progreso</option>
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="Completado">Completado</option>
                                        
                                        </select>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Descripción: </label>
                                        <textarea className="form-control"
                                        value={description_task} 
                                        onChange={(e) => setDescriptionTask(e.target.value)}
                                        disabled={edit}
                                        />
                                    </div> 
                                    
                                    <button type="submit" className="btn btn-primary">Editar</button>
                                </form>
                                {archivos.map((doc) => (
                                    <div key={doc.id} className="col">
                                        <a href={doc.files} target="_blank" className="text-danger size-icon-file">
                                            <i className="fa fa-file-pdf"></i>
                                        </a>
                                    </div>
                                ))}
                                
                                
                                <form onSubmit={uploadImage} method="POST" encType="multipart/form-data">
                                    <div className="col-12 mt-3">
                                        <label className="form-label fw-bold">Subir Archivo:</label>
                                        <input className="form-control"
                                        name="files"
                                        onChange={(e) => setFile(e.target.files[0])} type="file"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2">Agregar Archivo</button>
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