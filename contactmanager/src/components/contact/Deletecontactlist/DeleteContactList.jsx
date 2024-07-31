import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContactService from '../../ContactService/ContactService';

const DeleteContactList = () => {

  const navigate = useNavigate();
  const { contactId } = useParams();
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

  // Function to handle contact deletion
  const deleteContact = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (confirmDelete) {
      ContactService.deleteContact(contact,contactId)
        .then(() => {
          // If deletion is successful, navigate back to the contact list page
          navigate("/contacts/list");
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
          // Handle error, show error message, etc.
        });
    }
  };
  }
  export default DeleteContactList;