const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

module.exports = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    res.set('Access-Control-Allow-Origin', '*');
    const firestore = admin.firestore();

    await firestore.collection('form_data').add({ ...req.body });

    res.send(JSON.stringify('success'));
  });
});
