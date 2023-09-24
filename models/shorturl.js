const mongoose = require('mongoose');
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now        
    }
});

// Create a TTL index on the 'creationDate' field to automatically expire documents after 20 seconds
shortUrlSchema.index({ creationDate: 1 }, { expireAfterSeconds: 20 });

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
