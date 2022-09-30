import user from '../user.png'
import axios from 'axios';
const CompHeader = () => {
    const token = localStorage.getItem('token')
    const refresh_token = localStorage.getItem('refresh_token')
    const Logout = async () => {
        try {
            await axios.post('http://localhost:8000/auth/logout', {
                token: refresh_token,
                headers: {authorization: `Barer ${token}`}
            });
            localStorage.removeItem("user_name")
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("name_complete");
            // this.props.history.push('/login');
        } catch (error) {
            console.log(error);
        }
    }

    const email = localStorage.getItem('email');
    const name_complete = localStorage.getItem('name_complete');

    return(
        <nav className="navbar navbar-expand-lg mb-2">
        <div className="container">
            <a className="navbar-brand" href="/"><h2 className='fw-bolder'>GLWINBA</h2></a>
            
            <div className="text-end">
                <div className='d-inline-flex'>
                    <div className='mx-4'>
                        <img src={user} className="rounded-circle" height="50"/>
                    </div>
                    <div className='text-center'>
                        <p className='lh-1'>
                            <b>{name_complete}</b>
                            <br/>
                            {email}
                            <br/>
                            <button onClick={Logout} className='btn btn-danger btn-sm'>Cerrar sesión</button>

                        </p>
                    </div>
                </div>
            </div>

        </div>
        </nav>
    )
}

export default CompHeader

