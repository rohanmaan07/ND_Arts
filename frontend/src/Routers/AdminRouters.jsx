import React from 'react'
import Admin from '../Admin/Admin'
import{Route,Routes} from 'react-router-dom'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function AdminRouters() {
  return (
    <div >
        <Routes>
            <Route path='/*' element={<Admin/>}></Route>
        </Routes>
   
    </div>
  )
}

export default AdminRouters