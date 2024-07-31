import { Navigate, Route, Routes } from "react-router-dom"
import ContactList from "./components/contact/ContactList/ContactList"
import EditContactList from "./components/contact/Editcontactlist/EditContactList"
import ViewContactList from "./components/contact/Viewcontactlist/ViewContactList"
import AddContactList from "./components/contact/AddcontactList/AddContactList"
import './index.css'
import NavBar from "./components/navbar/NavBar"
import DeleteContactList from "./components/contact/Deletecontactlist/DeleteContactList"
// import Spinner from "./components/Spinner/Spinner";

function App(){
  return(
    <>
      {/* <div className="container bg-dark text-light">hi</div>
      <button className="btn btn-warning" ><i className="fa fa-mobile text-primary me-2"></i>Mobile</button> */}
      {/* <Spinner/> */}
       <NavBar/>
        <Routes>
          <Route path="/" element={<Navigate to={'/contacts/list'}/>}/>
          <Route path="/contacts/list" element={<ContactList/>}/>
          <Route path="/contacts/add" element={<AddContactList/>}/>
          <Route path="/contacts/edit/:contactId" element={<EditContactList/>}/>
          <Route path="/contacts/view/:contactId" element={<ViewContactList/>}/>
          <Route path="/contacts/delete/:contactId" element={<DeleteContactList/>}/>
        </Routes>
      </>
  )
}
export default App;