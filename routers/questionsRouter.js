const { Router } = require('express');
const { questionsController } = require('../controllers/questionsController');
const checkAuth = require('../middlewares/checkAuth');

const questionsRouter = new Router();
questionsRouter.get('/', questionsController.getQuestions);
module.exports = { questionsRouter };