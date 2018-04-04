import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

// list of pages that only an unauthenticated user should see
const unauthenticatedPages = ['/', '/signup'];
// list of pages that only an authenticated user should see
const authenticatedPages = ['/links'];
// Monitor routes and redirect as necessary during regular browsing
// i.e. no auth status changes
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/links');
  }
}
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
}

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  console.log('isAuthenticated: ', isAuthenticated);
  console.log('pathname: ', pathname);
  console.log('isUnauthenticatedPage: ', isUnauthenticatedPage);
  console.log('isAuthenticatedPage: ', isAuthenticatedPage);
  // redirections based on path and authentication state
  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/links');
  } else if (!isAuthenticated && isAuthenticatedPage) {
    browserHistory.replace('/');
  }

  
}

// Set up application routes
export const routes = (
  <Router history={browserHistory}>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="/" component={Login}  onEnter={onEnterPublicPage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

