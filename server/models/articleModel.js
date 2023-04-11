const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define article schema
const articleSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    critics: { type: String, required: true },
    audience: { type: String, required: true },
    rating: { type: String, required: false },
    genre: { type: [String], required: true, default: undefined },
    director: { type: [String], required: true, default: undefined },
    producer: { type: [String], required: true, default: undefined },
    writer: { type: [String], required: true, default: undefined },
    release: { type: String, required: true },
    runtime: { type: String, required: true },
    distributor: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Create Article model
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;