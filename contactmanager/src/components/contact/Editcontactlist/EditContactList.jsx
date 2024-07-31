import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ContactService from '../../ContactService/ContactService';

const EditContactList = () => {
  let navigate = useNavigate();
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      Photo: "",
      Contact: "",
      email: "",
      title: "",
      company: "",
      groupId:""
    },
  });

  useEffect(() => {
    let promise = new Promise((res, rej) => {
      setState({ ...state, loading: true });
      ContactService.getContact(contactId)
        .then(res)
        .catch(rej);
    });

    promise.then((res1) => {
      setState({ ...state, loading: false, contact: res1.data });
      console.log(res1.data);
    }).catch(() => {
      setState({ ...state, loading: false, errorMessage: "Data is not available!" });
    });
  }, [contactId]);

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value
      }
    });
  };

  let { loading, contact, errorMessage } = state;

  let submitForm = (event) => {
    event.preventDefault();
    let promise = new Promise((res, rej) => {
      setState({ ...state, loading: true });
      ContactService.updateContact(contact, contactId)
        .then(res)
        .catch(rej);
    });

    promise.then((res1) => {
      if (res1) {
        setState({ ...state, loading: false });
        navigate("/contacts/list", { replace: true });
      } else {
        navigate(`/contacts/edit/${contactId}`,{ replace: false });
      }
    }).catch(() => {
      setState({ ...state, loading: true });alert("Data is not found!");
    });
  };

  return (
    <div>
      <section className='edit-contact'>
        <div className='container p-3'>
          <div className='row'>
            <p className='fw-bold h4 text-primary'>Edit Contact</p>
            <p className='fst-italic'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, labore deleniti. Minima modi cum deserunt itaque enim quisquam nulla porro odio quos corrupti? Officia nemo blanditiis tenetur magnam corrupti earum?</p>
          </div>

          <div className='row d-flex align-items-center'>
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className='mb-2'><input type="text" onChange={updateInput} placeholder='Name' className='form-control' name="name" value={contact.name} /></div>
                <div className='mb-2'><input type="text" onChange={updateInput} placeholder='Photo url' className='form-control' name="Photo" value={contact.Photo} /></div>
                <div className='mb-2'><input type="text" onChange={updateInput} placeholder='Mobile' className='form-control' name="Contact" value={contact.Contact} /></div>
                <div className='mb-2'><input type="email" onChange={updateInput} placeholder='Email' className='form-control' name="email" value={contact.email} /></div>
                <div className='mb-2'><input type="text" onChange={updateInput} placeholder='Company Name' className='form-control' name="company" value={contact.company} /></div>
                <div className='mb-2'><input type="text" onChange={updateInput} placeholder='Title' className='form-control' name="title" value={contact.title} /></div>
                <div className='mb-2'><input type="text" onChange={updateInput} placeholder='Company group' className='form-control' name="groupId" value={contact.groupId} /></div>

                <div className='mb-2'>
                  <input type="submit" value="Update" className='btn btn-primary' />
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
  );
}

export default EditContactList;