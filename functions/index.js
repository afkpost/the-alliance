const functions = require('firebase-functions');

// exports.startGame = functions.database.ref('/{pin}/players/{uid}/ready')
//     .onUpdate(event => {
//         console.log(event.params);
//         const ready = event.data.val();
//         if (!ready) return;

//         const game = event.data.ref(event.params.pin).val();
//         console.log(game);
//     });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
