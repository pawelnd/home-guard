var admin = require('firebase-admin');

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://test-8c111.firebaseio.com/'
});