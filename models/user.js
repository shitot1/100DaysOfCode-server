const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  id: { type: Number, default: 0, unique: true },
  name: { type: String, required: true },
  email: { type: String, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'], unique: true, required: true },
  password: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
}, { collections: 'users' });


userSchema
  .pre("save", function (next) {
    User.find().sort({ "id": -1 })
      .then((data) => {
        this.id = data[0].id + 1;
        next();
      });
  })
  .pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });



const User = model('User', userSchema);
module.exports = User;