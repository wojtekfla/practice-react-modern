import React, { useReducer } from 'react';
import './ContactForm.css';

// import account from './account';

const formInit = {
  values: {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  },
  errors: {},
  isSubmitted: false,
};

const validateForm = (values) => {
  const errors = {};
  if (!values.name) errors.name = 'First name and the last name are required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) errors.email = 'Email is required';
  else if (!emailRegex.test(values.email)) errors.email = 'Invalid email address';
  if (!values.subject) errors.subject = 'Subject is required';
  if (!values.message) errors.message = 'Message is required';

  return errors;
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        isSubmitted: false,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...formInit,
        isSubmitted: true,
      };
    default:
      return state;
  }
}

const ContactForm = () => {
  // console.log(account); - odpusciłem sobie te dodatkowe, usereducer mnie dojechał ...
  const [state, dispatch] = useReducer(reducer, formInit);

  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE',
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(state.values);
    dispatch({ type: 'SET_ERRORS', errors });
    if (Object.keys(errors).length === 0) {
      dispatch({ type: 'SUBMIT_SUCCESS' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">First and Last Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={state.values.name}
          onChange={handleChange}
        />
        {state.errors.name && (
          <div className="error" style={{ color: 'red' }}>
            {state.errors.name}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.values.email}
          onChange={handleChange}
        />
        {state.errors.email && (
          <div className="error" style={{ color: 'red' }}>
            {state.errors.email}
          </div>
        )}
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={state.values.phone}
          onChange={handleChange}
        />
        {state.errors.phone && (
          <div className="error" style={{ color: 'red' }}>
            {state.errors.phone}
          </div>
        )}
      </div>
      <div>
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={state.values.subject}
          onChange={handleChange}
        />
        {state.errors.subject && (
          <div className="error" style={{ color: 'red' }}>
            {state.errors.subject}
          </div>
        )}
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={state.values.message}
          onChange={handleChange}
        />
        {state.errors.message && (
          <div className="error" style={{ color: 'red' }}>
            {state.errors.message}
          </div>
        )}
      </div>
      <button type="submit">Send form</button>
      {state.isSubmitted && <p className="success">Form sent successfully!</p>}
    </form>
  );
};

export default ContactForm;
