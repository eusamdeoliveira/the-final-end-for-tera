const router = require('express-promise-router')();
const questionsController = require('../controllers/questions.controller');
const verify = require('./auth/auth');

router.post('/questions/new', verify, questionsController.newQuestion);
router.post('/questions/option/new', verify, questionsController.newOption);
router.post('/questions/answer/new', verify, questionsController.newAnswer);

router.get('/questions/student/:id', verify, questionsController.coursesByCourseAndStudentid);
router.get('/questions/teacher/:id', verify, questionsController.coursesByCourseAndTeacherid);
router.get('/questions/adm/:id', verify, questionsController.coursesByCourseAndAdmId);

// router.delete('/questions/:course_id', verify, questionsController.removeQuestion);
// router.delete('/questions/:course_id', verify, questionsController.removeOption);
// router.delete('/questions/:course_id', verify, questionsController.removeAnswer);

module.exports = router;