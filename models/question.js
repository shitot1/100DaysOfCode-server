const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
  id: { type: Number, default: 0, unique: true },
  question: { type: String, required: true },
  answer_a: { type: String, required: true },
  answer_b: { type: String, required: true },
  answer_c: { type: String, required: true },
  answer_d: { type: String, required: true },
  correct_answer: { type: String, required: true },
}, { collections: 'questions' });


questionSchema
  .pre("save", function (next) {
    Question.find().sort({ "id": -1 })
      .then((data) => {
        this.id = data[0].id + 1;
        next();
      });
  })


const Question = model('Question', questionSchema);
module.exports = Question;