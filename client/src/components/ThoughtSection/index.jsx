const ThoughtSection = (course) => {
    console.log(course);
    const thoughts = course.course.thoughts;
    console.log(thoughts);
    thoughts.map((thought) => { 
        console.log(thought.thoughtText)
    })
    return (
    <div className="thought-section">
        <div>
            <h1>Reviews: </h1>
            {thoughts.map((thought) => (
                <h2 key={thought._id}>{thought.thoughtText}</h2>
            ))}
            </div>
        </div>
    
  );
};

export default ThoughtSection;
