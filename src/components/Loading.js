import { Spinner } from 'reactstrap';

const LoadingSpinner = () => {
    return (
        <div className='divPadre'>
            <div className='divHijo'>
                <Spinner color='primary' className='sppinerReact'/>
            </div>
        </div>
    );
}

export default LoadingSpinner