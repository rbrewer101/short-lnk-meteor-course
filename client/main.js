import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import { Session } from 'meteor/session';


import {routes, onAuthChange} from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';

// Redirect user as necessary upon authentication status change
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});



// Start the app
Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
})