const expres = require('express');

const router = expres.Router();
const reviewController = require('../controllers/review_controller');

// all routes
router.get('/', reviewController.getAllReviews);

router.post('/create-review', reviewController.createReview);

router.post('/update-review', reviewController.updateReview);

router.get('/delete-review/:id', reviewController.deleteReview);

module.exports = router;
