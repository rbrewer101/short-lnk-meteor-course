import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';


export const Links = new Mongo.Collection('links');

// only runs on the server
if (Meteor.isServer) {
    Meteor.publish('linksPub', function () {
        //this.userId
        return Links.find({ userId: this.userId });
    });
}

// runs everywhere
// happens for real on server
// meteor mocks it on client for responsiveness
// naming convention resource.action
Meteor.methods({
    'links.insert' (url) {
        if (!this.userId) {
            throw new Meteor.Error('not authorized');
        }

        // validate url
        new SimpleSchema({
            url: {
                type: String,
                required: true,
                label: 'Your link',
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });

        Links.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },
    'links.setVisibility' (_id, visible) {
        //ensure user is logged in
        if (!this.userId) {
            throw new Meteor.Error('not authorized');
        }
        
        //validate _id is string > 1
        //visible is boolean
        new SimpleSchema({
            _id: {
                type: String,
                min: 2
            },
            visible: {
                type: Boolean
            }
        }).validate({ _id, visible});
        console.log('setVisibility run');
        
        // Links.update - where _id and this.userId match the doc
        //set visible property to the argument value
        Links.update(
            {_id, 
            userId: this.userId},
            {$set: {visible: visible}}
        );
    },
    'links.trackVisit' (_id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 2
            }
        }).validate({ _id});
        
        Links.update({_id}, {
            $set: {
                lastVisitedAt: new Date().getTime()
            },
            $inc: {
                visitedCount: 1
            }
        });
        
    }



    // // remember, below is ES6 shorthand for 
    // // greetUser: function() {}
    // greetUser(name) {
    //     console.log('greetUser is running.');
    //     // throw error if no name is passed in
    //     if (!name) {
    //         throw new Meteor.Error('invalid-arguments', 'Name is required');
    //     }
    //     return `Hello ${name}!`;
    // },

    // // add two numbers
    // addNumbers(a, b) {
    //     console.log('addNumbers is running.');
    //     if (typeof a !== 'number' || typeof b !== 'number') {
    //         throw new Meteor.Error('not-a-number', 'Both arguments must be numbers.');
    //     }
    //         console.log('addNumbers was called with: ', a,' and ', b);
    //         return `Sum = ${a + b}`;
    // }

});
