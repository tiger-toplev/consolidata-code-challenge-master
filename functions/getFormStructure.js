const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

module.exports = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    res.set('Access-Control-Allow-Origin', '*');
    const firestore = admin.firestore();

    const { docs } = await firestore.collection('form_structure').get();

    const form_structures = await Promise.all(docs.map((doc) => ({ id: doc.id, ...doc.data() })));

    res.send(JSON.stringify(form_structures[0]));
  });
});
