import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import Marketplace from './pages/Marketplace'
import Events from './pages/Events'
import ProductDetail from './pages/ProductDetail'
import MyProfile from './pages/MyProfile'
import Admin from './pages/Admin'
import PrivateComponent from './components/PrivateComponents'
import PageNotFound from './pages/PageNotFound'
import EventDetail from './pages/EventDetail'


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path = 'marketplace/:pid' element={<ProductDetail/>}/>
        <Route path = '*' element={<PageNotFound />}/>
        <Route path = '/' element={<Landing />}/>
        <Route path = '/marketplace' element={<Marketplace/>}/>
        <Route path = '/events' element={<Events/>}/>
        <Route path = '/event/:eid' element={<EventDetail/>}/>
        <Route path = '/login' element={<Login/>}/>
        <Route path = '/register' element={<Register />}/>
        <Route path = '/auth' element={<PrivateComponent/>}>
          <Route path = 'myprofile' element={<MyProfile/>}/>
          <Route path = 'admin' element={<Admin/>}/>
        </Route>
      </Routes>
     <ToastContainer/>
    </Router>
  )
}

export default App


       