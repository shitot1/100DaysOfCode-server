const Question = require('../models/question');

exports.questionsController = {
    getQuestions(req, res) {
        Question.find({}, { '__v': 0 })
            .then(docs => { res.json(docs) })
            .catch(err => res.status(400).send({ "error": `Error getting Data from DB: ${err}` }));
    }
}

