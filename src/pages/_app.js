// pages/_app.js

import React from 'react';
import App from 'next/app';
import Router from 'next/router';

class MyApp extends App {
  componentDidMount() {
    // Perform your condition check here
    const isUserLoggedIn = localStorage.getItem("userID") != undefined; // Example condition

    // Redirect the user based on the condition
    if (isUserLoggedIn) {
      Router.push('/'); // Redirect to the dashboard page
    } else {
      Router.push('/login'); // Redirect to the login page
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
