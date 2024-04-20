import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_THOUGHT, UPDATE_THOUGHT } from '../../utils/mutations';

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
        <div className="thought-section">
            <div>
                <h1>Reviews: </h1>
                {thoughts.map((thought) => (
                    <React.Fragment key={thought._id}>
                        <h2 style={{ display: 'inline-block' }}>{thought.thoughtText} - {thought.thoughtAuthor}</h2>
                        <button onClick={() => handleDelete(thought._id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white'  }}>Delete</button>
                        <input type="text" defaultValue={thought.thoughtText} onChange={(e) => setUpdatedThought(e.target.value)} />
                        <button onClick={() => handleUpdate(thought._id, updatedThought)}>Update</button>
                        <br />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ThoughtSection;