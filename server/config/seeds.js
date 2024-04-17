const db = require('./connection');
const { User, Instructor, Course } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Instructor', 'instructors');
  await cleanDB('User', 'users');

  const instructors = await Instructor.insertMany([
    {
      firstName: 'Joseph',
      lastName: 'Daniels',
      image: 'trainer01.png',
      bio: 'Joseph Daniels is a renowned trainer specializing in powerlifting and muscle building. Joseph\'s clients range from beginners looking to pack on muscle to seasoned powerlifters aiming to break personal records. If you\'re ready to take your strength and muscle gains to the next level, Joseph Daniels is the trainer for you.'
    },
    {
      firstName: 'Stephanie',
      lastName: 'McPherson',
      
      image: 'trainer02.jpeg',
      bio: 'Stephanie McPherson is a dynamic CrossFit specialist known for her passion for functional fitness and empowering coaching style. She works with athletes of all levels, from beginners taking their first steps into CrossFit to seasoned competitors aiming for podium finishes. If you\'re ready to embrace the CrossFit lifestyle and unlock your full potential, Stephanie McPherson is the coach you want by your side.'
    },
    {
      firstName: 'Carla',
      lastName: 'Perez',
      image: 'trainer03.jpeg',
      bio: 'Carla Perez is a passionate fitness instructor who specializes in aerobics. She designs each session to be a dynamic and engaging experience, combining high-energy music with easy-to-follow dance moves. If you\'re looking to shake up your fitness routine, improve your cardiovascular health, and have a blast while doing it, Carla\'s aerobics classes are the perfect fit.'
    },
    {
      firstName: 'Lily',
      lastName: 'Thompson',
      image: 'trainer04.jpeg',
      bio: 'Lily Evans Thompson, a young woman with a heart as bright as her powers. Growing up, she always had a fascination with light and its ability to bring warmth and joy to the world. Now, as a powerlighter, she channels that fascination into a force for good, using her abilities to illuminate the darkest of situations. With her cheerful demeanor and unwavering determination, Lily strives to make the world a brighter place for all.'
    },
    {
      firstName: 'Max',
      lastName: 'Smith',
      image: 'trainer05.jpeg',
      bio: 'Max Johnson Smith, a down-to-earth individual with an extraordinary gift. From a young age, Max discovered his ability to manipulate light, bending it to his will with ease. Though initially hesitant to embrace his powers, he now uses them to protect those in need. With a strong sense of justice and a quick wit, Max fights tirelessly against injustice, shining a light on corruption wherever it may hide.'
    },
    {
      firstName: 'Emily',
      lastName: 'Garcia',
      image: 'trainer06.jpeg',
      bio: 'Emily Rodriguez Garcia, a beacon of hope in a world filled with shadows. Raised in a close-knit community, Emily always felt a deep connection to those around her. Now, as a powerlighter, she channels that connection into her abilities, using them to bring light and warmth to those in need. With her compassionate nature and unwavering resolve, Emily stands as a symbol of hope, inspiring others to believe in the power of kindness and empathy.'
    },
  ]);

  console.log('instructors seeded');
  const instructorIds = instructors.map(instructor => instructor._id);
  console.log(instructorIds);

  const courses = await Course.insertMany([
    {
      title: "Weightlifting technique",
      schedule: "1 hour",
      price: "80",
      description: "Focuses on proper form, technique, and mechanics to build strong foundation",
      instructor: instructorIds[0],
      clients: []
    },
    {
      title: "Olympic Weightlifting",
      schedule: "1 hour",
      price: "100",
      description: "Specifically geared towards learning the two Olympic lifts: the snatch and the clean and jerk. ",
      instructor: instructorIds[0],
      clients: []
    },
    {
      title: "Peronalized Program",
      schedule: "1 hour",
      price: "150",
      description: "Offers clients the opportunity to work with the instructor to create a customized strength training program.",
      instructor: instructorIds[0],
      clients: []
    },
  ])

  instructorIds.forEach( async (id) => { // populate each instructors courses array with the courses that have their instructor id
    const instructorCourses = courses.filter(course => course.instructor.equals(id));
    const courseIds = instructorCourses.map(course => course._id);
    await Instructor.findOneAndUpdate(
      { _id: id },
      { $set: { courses: courseIds } },
      { new: true }
    )
  });

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345'
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
