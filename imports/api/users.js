import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
  console.log('the new user is: ', user);

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.EmailWithTLD
    }
  }).validate({ email });


  return true;
})
