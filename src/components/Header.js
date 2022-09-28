import user from '../user.png'
const CompHeader = () => {
    return(
        <nav className="navbar navbar-expand-lg mb-2">
        <div className="container">
            <a className="navbar-brand" href="/"><h2 className='fw-bolder'>GLWINBA</h2></a>
            <div className="text-center">
               <h4> <b>Tareas Pendientes</b></h4>
            </div>
            <div className="text-end">
                <div className='d-inline-flex'>
                    <div className='mx-4'>
                        <img src={user} className="rounded-circle" height="50"/>
                    </div>
                    <div className='text-center'>
                        <p className='lh-1'>
                            <b>Pedro R. Prado</b>
                            <br/>
                            pedro3@gmail.com
                            <br/>
                            <button className='btn btn-danger btn-sm'>Cerrar sesión</button>

                        </p>
                    </div>
                </div>
            </div>

        </div>
        </nav>
    )
}

export default CompHeader

