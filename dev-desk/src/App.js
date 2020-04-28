import React, { useEffect, useState, createContext } from 'react';
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from './utils/axiosWithAuth';
import * as yup from 'yup';

import CreateTicket from "./components/CreateTicket"
import './App.css';

//importing components
import Login from './components/Login';
import Header from './components/Header';

const initialFormValues = {
  name: '',
  password: '',
};

const initialFormErrors = {
  name: '',
  password: '',
};

const formSchema = yup.object().shape({
  name: yup.string().min(5, '*a username is required').required('this is req'),
  password: yup.string().min(5, '*a password is required').required('this is req'),
});

export default function App() {
  // Keep all initial state here
  let history = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);


  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        });
      })
      .catch((error) => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
e.preventDefault();
axiosWithAuth().post('/api/auth/login', formValues).then(res => {
  console.log(res)
localStorage.setItem('token', JSON.stringify(res.data.payload));
history.push('/protected')
})
  }
  return (
    <div>
      <Header />
      <Login values={formValues} onInputChange={onInputChange} onSubmit = {onSubmit} errors={formErrors} />

      <CreateTicket/>
    </div>
  );
}


// HTTP - Path - Desc -	Data

// POST	/api/auth/register	Registers new user.	Expects {"username":"", "password":"", "email":""}

// Returns { "id":##, "username":""}

// POST	/api/auth/login	Logs in a user.	Expects {"username":"", "password":""}