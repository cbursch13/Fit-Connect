const db = require('./connection');
const { User, Instructor } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Instructor', 'instructors');
  await cleanDB('User', 'users');

  const instructors = await Instructor.insertMany([
    {
        firstName: 'Joseph',
        lastName: 'Daniels',
        bio: 'Joseph Daniels is a renowned trainer specializing in powerlifting and muscle building. Joseph\'s clients range from beginners looking to pack on muscle to seasoned powerlifters aiming to break personal records. If you\'re ready to take your strength and muscle gains to the next level, Joseph Daniels is the trainer for you.'
    },
    {
        firstName: 'Stephanie',
        lastName: 'McPherson',
        bio: 'Stephanie McPherson is a dynamic CrossFit specialist known for her passion for functional fitness and empowering coaching style. She works with athletes of all levels, from beginners taking their first steps into CrossFit to seasoned competitors aiming for podium finishes. If you\'re ready to embrace the CrossFit lifestyle and unlock your full potential, Stephanie McPherson is the coach you want by your side.'
    },
    {
        firstName: 'Carla',
        lastName: 'Perez',
        bio: 'Carla Perez is a passionate fitness instructor who specializes in aerobics. She designs each session to be a dynamic and engaging experience, combining high-energy music with easy-to-follow dance moves. If you\'re looking to shake up your fitness routine, improve your cardiovascular health, and have a blast while doing it, Carla\'s aerobics classes are the perfect fit.'
    },

  ]);

  console.log('instructors seeded');

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
