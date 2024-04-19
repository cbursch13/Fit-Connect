const ThoughtSection = (course) => {
    console.log(course);
    const thoughts = course.course.thoughts;
    console.log(thoughts);
    
    return (
        <div className="thought-section">
            <div className="thought">
                <h1>Reviews: </h1>
                {thoughts.map((thought) => (
                    <div key={thought._id}>
                        <h2>{thought.thoughtText}</h2>
                        <p>Posted By: {thought.thoughtAuthor}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThoughtSection;