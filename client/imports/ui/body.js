import './body.html';
import './task.js';

import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

// Template.body.helpers({
//   tasks: [
//     { text: 'This is task 1' },
//     { text: 'This is task 2' },
//     { text: 'This is task 3' },
//   ],
// });

Template.body.helpers({
    tasks() {
        // Show newest tasks at the top
        return Tasks.find({}, { sort: { createdAt: -1 } });
    },
});

Template.body.events({
    'submit .new-task'(event) {
        console.log("Event: ",  event)
        console.log("Tasks: " + Tasks)
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Tasks.insert({
            "text":text,
            "createdAt": new Date(), // current time
        });

        // Clear form
        target.text.value = '';
    },
});