
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import './App.css'
import LoginForm from './LoginForm'
import AdminPage from './Admin'
import UserPage from './User'
import { UserProvider } from './UserContext'
function App() {
  
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/user' element={<UserPage/>}/>
      </Routes>
    </Router>
    </UserProvider>
  )
}

export default App
