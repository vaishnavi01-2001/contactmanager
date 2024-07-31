import React, { useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import ContactService from '../../ContactService/ContactService'

const AddContactList = () => {
  let navigate=useNavigate()
 let [state,setState]= useState({
    loading:false,
    contact:{
      name:"",
      Photo:"",
      Contact:"",
      email:"",
      title:"",
      company:"",
      groupId:"",
    },
    groups:[],
    errorMessage:""
  })
  let updateInput=(event)=>{
    setState({...state,contact:{
      ...state.contact,
      [event.target.name]:event.target.value
    }})
  }
  let{loading,contact,groups,errorMessage}=state;
  let submitFrom=(event)=>{
    event.preventDefault()
    let promise=new Promise((res,rej)=>{
     let response=ContactService.createContact(contact)
      res(response)
    })
    promise.then((res1)=>{
      if(res1){
        navigate("/contacts/list",{replace:true})
      }
      else{
        navigate("/contacts/add",{replace:false})
      }
    }).catch(()=>{
      alert("Data is Not Found!!")
    })

  }
  return (
    <div>
      <pre>
        {JSON.stringify(contact)}
      </pre>
    <section className='edit-contact'>
   <div className='container- p-3'>
     <div className='row'>
       <p className='fw-bold h4 text-primary ' >Add Contact</p>
       <p className='fst-italic'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, labore deleniti. Minima modi cum deserunt itaque enim quisquam nulla porro odio quos corrupti? Officia nemo blanditiis tenetur magnam corrupti earum?</p>
     </div>

     <div className='row d-flex  align-items-center'>
       <div className="col-md-4">
         <form action="" onSubmit={submitFrom}>
           <div className='mb-2'><input type="text" required={true} placeholder='Name' className='form-control' name="name" id="" value={contact.name} onChange={updateInput}/></div>
           <div className='mb-2'><input type="text"  required={true}placeholder='Photo url' className='form-control' name="Photo" id="" value={contact.Photo} onChange={updateInput}/></div>
           <div className='mb-2'><input type="number"  required={true}placeholder='Mobile' className='form-control' name="Contact" id="" value={contact.Contact} onChange={updateInput}/></div>
           <div className='mb-2'><input type="email"  required={true}placeholder='Email' className='form-control' name="email" id="" value={contact.email} onChange={updateInput}/></div>
           <div className='mb-2'><input type="text"  required={true}placeholder='Company Name' className='form-control' name="company" id="" value={contact.company} onChange={updateInput}/></div>
           <div className='mb-2'><input type="text"  required={true}placeholder='Title' className='form-control' name="title" id="" value={contact.title} onChange={updateInput}/></div>
           <div className='mb-2'><input type="text"  required={true}placeholder='Company group' className='form-control' name="groupId" id="" value={contact.groupId} onChange={updateInput}/></div>

           <div className='mb-2'>
             <input type="submit" value={"Add"} className='btn btn-primary' name="" id="" />
             <Link to='/' className='btn btn-danger ms-2'>Cancel</Link>
           </div>
         </form>
       </div>

       <div className="col-md-8">
         <img src={contact.Photo} className='img-fluid contact-img' alt="" />
       </div>

     </div>
   </div>
 </section>
</div>
  )
}

export default AddContactList;