// Importing modules and models
const db = require('./connection');
const { User, Instructor, Course } = require('../models');
const cleanDB = require('./cleanDB');

// Establish database connection and clean existing data in database
db.once('open', async () => {
  try {
    await cleanDB('Instructor', 'instructors');
    await cleanDB('User', 'users');
    await cleanDB('Course', 'courses');

    // Seed instructors
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
        bio: 'Lily Thompson is a certified Pilates instructor dedicated to helping others improve their strength, flexibility, and overall well-being through the practice of Pilates. With a background in dance and a passion for movement, Lily brings a unique blend of precision and fluidity to her classes.'
      },
      {
        firstName: 'Max',
        lastName: 'Smith',
        image: 'trainer05.jpeg',
        bio: 'Max Smith is a boxing instructor with over a decade of experience in the sport. He offers courses for boxers of all levels and motivations, whether they are looking to learn boxing to get in shape, enhance their self-defense skills, or compete at an amateur level, he is dedicated to spreading his love for boxing.'
      },
      {
        firstName: 'Emily',
        lastName: 'Garcia',
        image: 'trainer06.jpeg',
        bio: 'Emily Garcia is a fitness lifestyle coach specializing in holistic health and wellness. With a focus on personalized plans and compassionate support, she empowers clients to achieve lasting transformation in their physical fitness, nutrition, and mindset. '
      },
    ]);

    console.log(`${instructors.length} instructors seeded`);

    // Extract IDs from seeded instructors
    const instructorIds = instructors.map(instructor => instructor._id);

    // Seed courses
    // Add thoughts as an array and designate an instructor
    const courses = await Course.insertMany([
      {
        title: "Weightlifting Technique",
        schedule: "1 hour",
        price: "80",
        description: "Focuses on proper form, technique, and mechanics to build strong foundation",
        thoughts: [
          { thoughtText: "This is awesome", thoughtAuthor: "Anonymous" },
          { thoughtText: "This is bad", thoughtAuthor: "Anonymous" }
        ],
        instructor: instructorIds[0],
        clients: []
      },
      {
        title: "Olympic Weightlifting",
        schedule: "1 hour",
        price: "100",
        description: "Specifically geared towards learning the two Olympic lifts: the snatch and the clean and jerk. ",
        thoughts: [{ thoughtText: "This is fun", thoughtAuthor: "Anonymous" }],
        instructor: instructorIds[0],
        clients: []
      },
      {
        title: "Personalized Program with Joseph",
        schedule: "1 hour",
        price: "150",
        description: "Offers clients the opportunity to work with the instructor to develop a customized strength training program in order to meet their unique goals.",
        thoughts: [],
        instructor: instructorIds[0],
        clients: []
      },
      {
        title: "Yoga Basics",
        schedule: "45 minutes",
        price: "100",
        description: "Introduces fundamental yoga poses and breathing techniques, suitable for beginners.",
        thoughts: [],
        instructor: instructorIds[1],
        clients: []
      },
      {
        title: "High-Intensity Interval Training (HIIT)",
        schedule: "30 minutes",
        price: "120",
        description: "A fast-paced workout alternating between short bursts of intense exercise and brief recovery periods.",
        thoughts: [],
        instructor: instructorIds[1],
        clients: []
      },
      {
        title: "Dance Aerobics",
        schedule: "30 minutes",
        price: "50",
        description: "Get your groove on with dance-inspired aerobics classes. Combining energetic choreography with cardio routines, these classes offer a fun and rhythmic way to improve fitness levels while learning different dance styles such as hip-hop, salsa, or jazz.",
        thoughts: [],
        instructor: instructorIds[2],
        clients: []
      },
      {
        title: "Aerobic Kickboxing",
        schedule: "45 minutes",
        price: "70",
        description: "Unleash your inner warrior with aerobic kickboxing classes. Blend martial arts-inspired moves with aerobic exercises to improve cardiovascular fitness, coordination, and strength. These high-energy workouts are sure to leave you feeling empowered and invigorated.",
        thoughts: [],
        instructor: instructorIds[2],
        clients: []
      },
      {
        title: "Boxing Fundamentals",
        schedule: "60 minutes",
        price: "100",
        description: "Master the fundamental techniques and principles of boxing, including proper stance, footwork, punches (jab, cross, hook, uppercut), and defensive maneuvers (blocks, slips, rolls). Ideal for beginners looking to build a solid foundation in boxing skills and techniques.",
        thoughts: [],
        instructor: instructorIds[4],
        clients: []
      },
      {
        title: "Boxing for Self-Defense",
        schedule: "60 minutes",
        price: "80",
        description: "Learn practical self-defense skills and strategies through boxing-based training. Focus on situational awareness, assertiveness, and effective striking techniques to protect yourself in real-life confrontations. Suitable for individuals of all fitness levels and backgrounds.",
        thoughts: [],
        instructor: instructorIds[4],
        clients: []
      },
      {
        title: "Pilates for Athletes",
        schedule: "60 minutes",
        price: "100",
        description: "A specialized course catering to athletes and active individuals seeking to enhance performance, prevent injuries, and improve athletic conditioning through Pilates-based cross-training exercises tailored to specific sports and activities.",
        thoughts: [],
        instructor: instructorIds[3],
        clients: []
      },
      {
        title: "Intermediate Pilates Matwork",
        schedule: "80 minutes",
        price: "100",
        description: "A progressive course building upon the fundamentals with more challenging Pilates exercises and sequences to enhance strength, flexibility, coordination, and body awareness.",
        thoughts: [],
        instructor: instructorIds[3],
        clients: []
      },
      {
        title: "Nutrition Essentials",
        schedule: "60 minutes",
        price: "95",
        description: "A course focusing on understanding macronutrients, meal planning, mindful eating practices, and creating balanced and sustainable nutrition habits for long-term health and wellness.",
        thoughts: [],
        instructor: instructorIds[5],
        clients: []
      },
      {
        title: "Personalized Program with Emily",
        schedule: "60 minutes",
        price: "150",
        description: "Customized one-on-one coaching programs tailored to each client's specific needs, goals, and preferences, providing personalized support, accountability, and guidance on their journey to a healthier, happier lifestyle.",
        thoughts: [],
        instructor: instructorIds[5],
        clients: []
      },
    ])

    console.log(`${courses.length} courses seeded`);

    // Update instructor with associated course IDs
    for (const id of instructorIds) {
      const instructorCourses = courses.filter(course => course.instructor.equals(id));
      const courseIds = instructorCourses.map(course => course._id);
      await Instructor.findOneAndUpdate(
        { _id: id },
        { $set: { courses: courseIds } },
        { new: true }
      );
    }

    // Seed users
    await User.insertMany([
      {
        firstName: 'Pamela',
        lastName: 'Washington',
        email: 'pamela@testmail.com',
        password: 'password12345'
      },
      {
        firstName: 'Elijah',
        lastName: 'Holt',
        email: 'eholt@testmail.com',
        password: 'password12345'
      }
    ]);

    console.log('Users seeded');

    process.exit();
  } catch (error) {
    console.error('Seed script encountered an error:', error);
    process.exit(1);
  }
});
