import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import Cart from './components/Cart'
import Footer from './components/Footer';
import { StoreProvider } from './utils/GlobalState';

const httpLink = createHttpLink({
  uri: '/graphql',
});

console.log("authlink run")
const authLink = setContext((_, { Nav }) => {
  const token = localStorage.getItem('id_token');
  return {
    Nav: {
      ...Nav,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <StoreProvider>
          <Nav />
          <Outlet />
          <Cart />
        </StoreProvider>
      </div>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
