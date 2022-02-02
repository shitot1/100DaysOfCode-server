const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.usersController = {
    getUsers(req, res) {
        User.find({}, { '__v': 0 })
            .then(docs => { res.json(docs) })
            .catch(err => res.status(400).send({ "error": `Error getting Data from DB: ${err}` }));
    },

    getUser(req, res) {
        User.find({ id: req.params.id }, { '__v': 0 })
            .then(data => {
                if (!data.length) return res.status(404).json({ "message": "User does not exist" });
                else { res.status(200).json(data); }
            })
            .catch(err => res.status(400).send({ "error": `Error getting Data from DB: ${err}` }));
    },

    addUser(req, res) {
        const newUser = new User(req.body);
        newUser.save()
            .then(result => { res.json({ status: 'ok' }); })
            .catch(err => { res.status(400).json(err.message); })
    },


    updateUser(req, res) {
        User.updateOne({ id: req.params.id }, req.body)
            .then(data => {
                if (!data.modifiedCount) return res.status(404).json({ "message": "Nothing to update!" });
                res.json({ "message": "User Updated" });
            })
            .catch(err => res.status(400).send({ "error": `Error getting Data from DB: ${err}` }));
    },

    deleteUser(req, res) {
        User.deleteOne({ id: req.params.id })
            .then(data => {
                if (!data.deletedCount) return res.status(404).send({ "message": "User to be deleted not found" });
                res.json({ "message": "User has been deleted successfully" });
            })
            .catch(err => res.status(400).send({ "error": `Error deleting User from DB: ${err}` }));
    },
    login(req, res) {
        const { email, password } = req.body;

        User.find({ email })
            .then((data) => {
                if (data.length === 0) {
                    return res.status(401).json({ message: "Auth failed" });
                }
                const [user] = data;
                bcrypt.compare(password, user.password, (error, result) => {
                    if (error) {
                        return res.status(401).json({ message: "Auth failed" });
                    }

                    if (result) {
                        const token = jwt.sign({ _id: data[0]._id }, process.env.JWT_KEY, { expiresIn: "10H" });
                        return res.status(200).json({
                            message: 'Auth successful',
                            token
                        })
                    }
                    res.status(401).json({ message: "Auth failedddd" });
                });
            });
    }
}

