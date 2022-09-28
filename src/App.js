import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompShowTasks from './task/ShowTasks.js';
import CompHeader from './components/Header';
import CompCreateTask from './task/CreateTask';
import CompLogin from './login/Login';
import CompCreateAccount from './login/CreateAccount';
import CompShowTask from './task/ShowTask';

function App() {
  return (
    <div className="App">
      <CompHeader></CompHeader>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CompShowTasks/>}/>
          <Route path='/create_task' element={<CompCreateTask/>}/>
          <Route path='/login' element={<CompLogin/>}/>
          <Route path='/register' element={<CompCreateAccount/>}/>
          <Route path='/show-task' element={<CompShowTask/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
