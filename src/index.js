import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from 'react';
import { createRoot } from "react-dom/client"
import { Provider } from 'react-redux'
import App from './App'
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
const container = document.getElementById("root");
const root = createRoot(container)

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App/>
        </Provider>
      </ApolloProvider>
    </React.StrictMode>
);

reportWebVitals();
