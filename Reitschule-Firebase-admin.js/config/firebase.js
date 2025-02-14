const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

const serviceAccount = require('../credentials.json')

// Initialize Firebase Admin
const app = initializeApp({
    credential: cert(serviceAccount)
})

// Get Firestore instance
const db = getFirestore(app)

module.exports = { db }