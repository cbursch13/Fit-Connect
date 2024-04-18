const { User, Instructor, Course, Thought} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    instructors: async () => {
      return await Instructor.find().populate('courses');
    },
    courses: async () => {
      return await Course.find().populate('clients').populate('instructor');
    },  
    users: async () => {
      return await User.find()
    },
    instructorById: async (parent, { id }, context) => {
      try {
        const instructor = await Instructor.findById(id);
        return instructor;
      } catch (error) {
        console.error("Error fetching instructor by ID:", error);
        throw new Error("Failed to fetch instructor by ID");
      }
    },
    thoughts: async () => {
      return Thought.find().sort({ createdAt: -1 });
    },
    //!!!!!!!!!!!!!! OLD CODE  NEEDS TO BE REFORMATTED!!!!!!!!!!
    // user: async (parent, args, context) => {
    //   if (context.user) {
    //     const user = await User.findById(context.user._id)
    //     .populate({
    //       // REFACTOR FOR CURRENT CODE
    //       path: 'orders.products',
    //       populate: 'category',
    //     });

    //     user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

    //     return user;
    //   }

    //   throw AuthenticationError;
    // },
    // order: async (parent, { _id }, context) => {
    //   if (context.user) {
    //     const user = await User.findById(context.user._id).populate({
    //       path: 'orders.products',
    //       populate: 'category',
    //     });

    //     return user.orders.id(_id);
    //   }

    //   throw AuthenticationError;
    // },
    // checkout: async (parent, args, context) => {
    //   const url = new URL(context.headers.referer).origin;
    //   // We map through the list of products sent by the client to extract the _id of each item and create a new Order.
    //   await Order.create({ products: args.products.map(({ _id }) => _id) });
    //   const line_items = [];

    //   for (const product of args.products) {
    //     line_items.push({
    //       price_data: {
    //         currency: 'usd',
    //         product_data: {
    //           name: product.name,
    //           description: product.description,
    //           images: [`${url}/images/${product.image}`],
    //         },
    //         unit_amount: product.price * 100,
    //       },
    //       quantity: product.purchaseQuantity,
    //     });
    //   }

    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items,
    //     mode: 'payment',
    //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${url}/`,
    //   });

    //   return { session: session.id };
    // },
  },
  Mutation: {
    addUser: async(parent, args) => {
      return await User.create(args)
    },
    addInstructor: async (parent, args) => {
      return await Instructor.create(args);
    },
    addCourse: async (parent, args) => {
      return await Course.create(args);
    },
    updateUser: async(parent, args, context) => {
      console.log(args.id, args.firstName)
      return await User.findOneAndUpdate({_id: args.id},
        args,
        {new: true,}
      )
    },
    updateInstructor: async (parent, args) => {
      return await User.findOneAndUpdate(
        args
      )
    },
    updateCourse: async (parent, args, context) => {
      console.log(args);
      return await User.findOneAndUpdate(
        args
      )
    },
    addThought: async (parent, { thoughtText, thoughtAuthor }) => {
      return Thought.create({ thoughtText, thoughtAuthor });
    },
    removeThought: async (parent, { thoughtId }) => {
      return Thought.findOneAndDelete({ _id: thoughtId });
    },
    // OLD CODE
    // addUser: async (parent, args) => {
    //   const user = await User.create(args);
    //   const token = signToken(user);

    //   return { token, user };
    // },
    // addInstructor: async (parent, { products }, context) => {
    //   if (context.user) {
    //     const order = new Order({ products });

    //     await User.findByIdAndUpdate(context.user._id, {
    //       $push: { orders: order },
    //     });

    //     return order;
    //   }

    //   throw AuthenticationError;
    // },
    // updateUser: async (parent, args, context) => {
    //   if (context.user) {
    //     return await User.findByIdAndUpdate(context.user._id, args, {
    //       new: true,
    //     });
    //   }

    //   throw AuthenticationError;
    // },
    // updateProduct: async (parent, { _id, quantity }) => {
    //   return await Product.findByIdAndUpdate(
    //     {_id: id},
    //     { new: true }
    //   );
    // },
    // login: async (parent, { email, password }) => {
    //   const user = await User.findOne({ email });

    //   if (!user) {
    //     throw AuthenticationError;
    //   }

    //   const correctPw = await user.isCorrectPassword(password);

    //   if (!correctPw) {
    //     throw AuthenticationError;
    //   }

    //   const token = signToken(user);

    //   return { token, user };
    // },
  },
};

module.exports = resolvers;