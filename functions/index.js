const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const appName = 'roll-player';

exports.getRollPlayerCharacters = functions.https.onCall((data, context) => {
  return admin
    .database()
    .ref(appName)
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
    .ref(appName)
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

exports.postRollPlayerCharacter = functions.https.onCall((data, context) => {
  // const email = context.auth.token.email || null;

  const newPostRef = admin.database().ref(appName).push();

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
    .ref(appName)
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
