const functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
/*exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
    console.log("mimy");
});*/

exports.sendNotification = functions.database.ref('/{messageId}')
        .onWrite(event => {
 
        // Grab the current value of what was written to the Realtime Database.
        var eventSnapshot = event.data;
        var topic = "chat";
        var payload = {
            data: {
                messageText: eventSnapshot.child("messageText").val(),
                messageUser: eventSnapshot.child("messageUser").val()
            }
        };
 
        return admin.messaging().sendToTopic(topic, payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
        });
