const router = require('express-promise-router')();
const coursesController = require('../controllers/courses.controller');
const verify = require('./auth/auth');

router.get('/courses/', verify, coursesController.allCourses);

router.post('/courses/new', verify, coursesController.newCourse);

router.get('/courses/:id', verify, coursesController.courseById);

router.delete('/courses/:id', verify, coursesController.removeCourseById);

module.exports = router;