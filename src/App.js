
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Categories from './components/Categories/Categories'
import ToDos from './components/ToDos/ToDos'
import AuthProvider from './contexts/AuthContext';
import Login from './components/Auth/Login'
import ProtectedRoute from './components/ProtectedRoute'




function App() {
  return (
    <div className="App">
      <AuthProvider>
     <Router>
        <Navigation/>
        <Routes>
          <Route path='/' element={<ProtectedRoute><ToDos /></ProtectedRoute>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/todos' element={ <ProtectedRoute><ToDos /></ProtectedRoute> } />
            <Route path='/categories' element={<ProtectedRoute><Categories/></ProtectedRoute> } />
          {/* <Route path='*' element={<NotFound/>}/> */}
        
        </Routes>
      <Footer/>
      </Router>
      </AuthProvider>
    </div>
  )
}

export default App;
