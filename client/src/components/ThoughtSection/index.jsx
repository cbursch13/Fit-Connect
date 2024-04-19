const ThoughtSection = (course) => {
    console.log(course);
    const thoughts = course.course.thoughts;
    console.log(thoughts);
    
    return (
        <div className="thought-section">
                   {thoughts.map((thought) => (
                    <div key={thought._id}>
                        <h2>{thought.thoughtText}</h2>
                        <p>Posted By: {thought.thoughtAuthor}</p>
                    </div>
                ))}
        </div>
    );
};

export default ThoughtSection;