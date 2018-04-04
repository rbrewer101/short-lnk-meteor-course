import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';


console.log('simple-schema-configuration.js imported');

SimpleSchema.defineValidationErrorTransform(function(e)  {
  return new Meteor.Error(400, e.message);
});