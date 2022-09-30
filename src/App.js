import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompShowTasks from './task/ShowTasks.js';
import CompHeader from './components/Header';
import CompCreateTask from './task/CreateTask';
import CompLogin from './login/Login';
import CompCreateAccount from './login/CreateAccount';
import CompShowTask from './task/ShowTask';
import CompConsultingTasks from './task/ConsultingTask';
import LoadingSpinner from './components/Loading.js';
import { useEffect, useState } from 'react';
function App() {
  const [loading, setLoading] = useState(false);

  const cambiarEstados = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  useEffect(() => {
    cambiarEstados()
  }, [])

  if (loading) {
    return (
      <LoadingSpinner></LoadingSpinner>
    )
  } else {
    return (
      <div className="App">
        <CompHeader></CompHeader>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<CompShowTasks/>}/>
            <Route path='/create_task' element={<CompCreateTask/>}/>
            <Route path='/login' element={<CompLogin/>}/>
            <Route path='/register' element={<CompCreateAccount/>}/>
            <Route path='/show-task/:id' element={<CompShowTask/>}/>
            <Route path='/consulting' element={<CompConsultingTasks/>}/>
  
  
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;
