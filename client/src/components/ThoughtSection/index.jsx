// Component for the Thought section
// Includes state and ability to do mutations (delete/update/add/read)
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_THOUGHT, UPDATE_THOUGHT } from '../../utils/mutations';
import './style.css';


const ThoughtSection = (course) => {
    console.log(course);
    const thoughts = course.course.thoughts;
    console.log(thoughts);
    thoughts.map((thought) => {
        console.log(thought.thoughtText)
    })

    const [deleteThought] = useMutation(DELETE_THOUGHT);
    const [updateThought] = useMutation(UPDATE_THOUGHT);
    const [updatedThought, setUpdatedThought] = useState('');

    const handleDelete = async (thoughtId) => {
        try {
            await deleteThought({ variables: { courseId: course.course._id, thoughtId } });
        } catch (error) {
            console.error('Error deleting thought:', error);
        }
    };

    const handleUpdate = async (thoughtId, updatedThought) => {
        try {
            await updateThought({ variables: { courseId: course.course._id, thoughtId, updatedThought } });
        } catch (error) {
            console.error('Error updating thought:', error);
        }
    };

    return (
        <div className="comment-section">
            <h1>Comments:</h1>
            {thoughts.map((thought) => (
                <div className="comment" key={thought._id}>
                    <div className="comment-header">
                        <h2>Posted by: {thought.thoughtAuthor}</h2>
                        <button className="delete-button" onClick={() => handleDelete(thought._id)}>Delete</button>
                    </div>
                    <div className="comment-body">
                        <p>{thought.thoughtText}</p>
                        <h5 style={{float:'left'}}>Edit:</h5>
                        <input
                            type="text"
                            defaultValue={thought.thoughtText}
                            onChange={(e) => setUpdatedThought(e.target.value)}
                            className="update-input"
                        />
                        <button onClick={() => handleUpdate(thought._id, updatedThought)} className="update-button">Update</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ThoughtSection;