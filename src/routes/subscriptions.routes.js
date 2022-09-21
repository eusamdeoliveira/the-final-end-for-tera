const router = require('express-promise-router')();
const subscriptionsController = require('../controllers/subscriptions.controller');
const verify = require('./auth/auth');

router.post('/subscriptions/new', verify, subscriptionsController.newSubscription);

router.get('/subscriptions', verify, subscriptionsController.coursesByUserid);

router.delete('/subscriptions/:course_id', verify, subscriptionsController.removeCoursesByUserId);

module.exports = router;