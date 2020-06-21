const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const librarySheetReference = 'roll-player';

exports.postRollPlayerCharacter = functions.https.onCall((data, context) => {
  // const email = context.auth.token.email || null;

  const newPostRef = admin.database().ref(librarySheetReference).push();

  return newPostRef
    .update({
      ...data,
      // 'saved-by': email,
    })
    .then(() => {
      return {
        id: newPostRef.key,
        ...data,
      };
    })
    .catch((err) => {
      throw new functions.https.HttpsError('internal', `Failed save character: ${err}`);
    });
});

exports.putRollPlayerCharacter = functions.https.onCall((data, context) => {
  // const email = context.auth.token.email || null;
  const { id } = data;

  return admin
    .database()
    .ref(librarySheetReference)
    .child(id)
    .update({
      ...data,
      // 'saved-by': email,
    })
    .then(() => {
      return data;
    })
    .catch((err) => {
      throw new functions.https.HttpsError('internal', `Failed update character: ${err}`);
    });
});

exports.getRollPlayerCharacters = functions.https.onCall((data, context) => {
  return admin
    .database()
    .ref(librarySheetReference)
    .once('value')
    .then((snapshot) => {
      const response = snapshot.val();

      return Object.entries(response).map(([key, entry]) => ({ ...entry, id: key }));
    })
    .catch((err) => {
      throw new functions.https.HttpsError('internal', `Failed get characters: ${err}`);
    });
});

exports.getRollPlayerCharacter = functions.https.onCall((data, context) => {
  const { id } = data;

  return admin
    .database()
    .ref(librarySheetReference)
    .child(id)
    .once('value')
    .then((snapshot) => {
      const response = snapshot.val();

      return {
        ...response,
        id: key,
      };
    })
    .catch((err) => {
      throw new functions.https.HttpsError('internal', `Failed get character ${id}: ${err}`);
    });
});
