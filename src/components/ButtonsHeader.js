import { Link } from "react-router-dom";

const CompButtonsHeader = () => {
    return(  
        <div className="text-center">
            <div className="row justify-content-md-center">
                <div className="col-5">
                    <div className="mb-2">
                        <input className="form-control text-center" placeholder="Filtro: Nombre, Asignado, Estatus"/>
                    </div>
                </div>
            </div>
            
            <Link to="/create_task" className="btn btn-info mx-2">Nueva Tarea</Link> 
            <button className="btn btn-success mx-2">Consultados</button>
        </div>               
    )
}

export default CompButtonsHeader

