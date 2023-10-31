/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const axios = require("axios");

const apiHost = "https://zuba.capnote.com/api";
const auth = async (request, response) => {
  const {userId} = request.body;

  try {
    const sessionResponse = await axios.post(`${apiHost}/api/v1/sso/session`, {
      clientSecret: process.env.CLIENT_SECRET,
      userId: userId,
    });
    response.send(await sessionResponse.data);
  } catch (error) {
    response.sendStatus(500);
    logger.error(error);
  }
};

exports.auth = onRequest({secrets: ["CLIENT_SECRET"]}, auth);

