import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';
import './style.css';

const ThoughtForm = ({ courseId }) => {
  const [formState, setFormState] = useState({
    thoughtText: '',
    thoughtAuthor: '',
  });
  const [characterCount, setCharacterCount] = useState(0);
  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    refetchQueries: ['getCourse'],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addThought({ variables: { courseId, ...formState } });
      setCharacterCount(0);
      setFormState({ thoughtText: '', thoughtAuthor: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'thoughtText' && value.length <= 280) {
      setFormState({ ...formState, [name]: value });
      setCharacterCount(value.length);
    } else if (name !== 'thoughtText') {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div className="thought-form-container">
      <h3>Add Your Review:</h3>
      <p className={`character-count ${characterCount === 280 || error ? 'text-danger' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="error-message ml-2">Something went wrong...</span>}
      </p>
      <form className="thought-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <textarea
            name="thoughtText"
            placeholder="Add your review here..."
            value={formState.thoughtText}
            className="form-input"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <input
            name="thoughtAuthor"
            placeholder="Add your name..."
            value={formState.thoughtAuthor}
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">Add Thought</button>
        </div>
        {error && <div className="error-message">Something went wrong...</div>}
      </form>
    </div>
  );
};

export default ThoughtForm;
