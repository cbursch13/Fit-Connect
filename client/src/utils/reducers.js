// Create reducer that manages the stage of the shopping cart in React
// Adding, updating, removing, and clearing products in the cart
// Toggle open/closed cart is a future technology
  import {
  UPDATE_COURSES,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  CLEAR_CART,
  TOGGLE_CART,
  UPDATE_INSTRUCTORS,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {

    case UPDATE_COURSES:
      return {
        ...state,
        products: [...action.products],
      };

    case UPDATE_INSTRUCTORS:
      return {
        ...state,
        instructors: [...action.instructors],
      }
    case ADD_TO_CART:
      console.log(action.product)
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    case UPDATE_CART_QUANTITY:
      console.log('updating cart');
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(product => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity
          }
          return product
        })
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

    default:
      return state;
  }
};
