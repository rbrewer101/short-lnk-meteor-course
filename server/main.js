import { Meteor } from 'meteor/meteor';
import '../imports/api/users';
import {Links} from '../imports/api/links';
import { WebApp } from 'meteor/webapp';

import '../imports/startup/simple-schema-configuration';

import SimpleSchema from 'simpl-schema';


Meteor.startup(() => {

  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This is from my custom middleware.');
    
    console.log(req.url, req.method, req.headers, req.query);
    
    const _id = req.url.slice(1);
    console.log('_id: ', _id);
    
    const link = Links.findOne({ _id });
    
    if (link) {
      res.writeHead(302, {'Location': link.url});
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next()
    }
  });
  //   // request comes in 
    // run our middleware
    // Set HTTP status code
    //res.statusCode = 302;
    // Set HTTP headers
    // Set HTTP body
    //res.write('<h2>My middleware</h2>');
    // End HTTP request
    
    //do this stuff next
    //next();
  // });
  

  // code to run on server at startup
  // Meteor.call('greetUser', (err, res) => {
  //   if (err) {
  //     console.log('error: ', err);
  //   } else {
  //     console.log('return value: ', res);
  //   }
  // });
});
