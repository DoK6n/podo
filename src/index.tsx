import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider } from '@mui/material/styles';
import { firebase } from 'config/firebase';
import { client } from './lib/graphql';
import { ApolloProvider } from '@apollo/client';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as HTMLElement);

firebase();

root.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </ApolloProvider>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
