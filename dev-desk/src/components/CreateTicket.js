import React, { useState, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import * as yup from 'yup';

const formSchema = yup.object().shape({
  problem: yup.string().min(4),
  type: yup.string().oneOf(['Equipment', 'People', 'Track', 'Finances', 'Other']),
});

const CreateTicket = () => {
  //formstate
  const [formState, setFormState] = useState({
    problem: '',
    type: '',
    attempt: '',
    other: '',
  });

  //state to disable button
  const [disableButton, setDisableButton] = useState(true);

  //validation
  function validateChange(e) {
    yup.reach(formSchema, e.target.type === 'textarea' ? null : e.target.name).validate(e.target.value);
  }

  //activate button
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setDisableButton(!valid);
    });
  }, [formState]);

  function handleChange(e) {
    e.persist();
    validateChange(e);
    setFormState({ ...formState, [e.target.name]: e.target.value }, console.log(formState));
  }

  function handleSubmit() {
    console.log(formState);
  }

  return (
    <div>
      <h1> Let's submit a help Ticket.</h1>
      <h4>
        <span className="asterisk">*</span> Required Fields
        <AiOutlineCloseCircle classname="no-help" />
      </h4>

      <form onSubmit={handleSubmit}>
        <h3>
          <span className="asterisk">*</span>What's going on?
        </h3>
        <input name="problem" value={formState.problem} onChange={handleChange} />
        <h3>
          <span className="asterisk">*</span>What is this issue about?
        </h3>
        <select name="type" value={formState.type} onChange={handleChange}>
          <option>Select a topic</option>
          <option value="Equipment">Equipment</option>
          <option value="People">People</option>
          <option value="Track">Track</option>
          <option value="Finances">Finances</option>
          <option value="Other">Other</option>
        </select>
        <h3>What have you tried?</h3>
        <textarea type="textarea" name="attempt" value={formState.attempt} onChange={handleChange} />
        <h3>Anything else we should know about?</h3>
        <textarea type="textarea" name="other" value={formState.other} onChange={handleChange} />
      </form>
      <button disabled={disableButton}>Submit Ticket</button>
    </div>
  );
};

export default CreateTicket;
