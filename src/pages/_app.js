import React from 'react';
import App from 'next/app';
import Router from 'next/router';

class MyApp extends App {
  componentDidMount() {
    // Perform your condition check here
    const isUserLoggedIn = localStorage.getItem("userID") !== null; // Example condition
    const isAdminPage = window.location.pathname.startsWith('/admin');

    // Redirect the user based on the condition
    if (isUserLoggedIn) {
      if (isAdminPage) {
        // Do nothing or handle admin page logic
      } else {
        Router.push('/');
      }
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
