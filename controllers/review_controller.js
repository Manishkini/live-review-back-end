const Review = require('../models/review');

module.exports.getAllReviews = async (req, res) => {
  const allReviews = await Review.find({});
  return res.status(200).send({
    message: 'data retrived succsessfully!',
    data: allReviews,
  });
};

module.exports.createReview = async (req, res) => {
  const { title, content, date } = req.body;
  if (!title || !content || !date) {
    return res.status(200).send({
      message: 'all feilds are important',
      responseCode: 101,
    });
  }

  Review.create(
    {
      title,
      content,
      date,
    },
    (err, result) => {
      if (err) {
        console.log('error occured while creating the review');
        return res.status(200).send({
          message: 'error occured while creating the review',
          responseCode: 102,
        });
      }

      return res.status(200).send({
        message: 'review is created succsessfully!',
        responseCode: 100,
      });
    }
  );
};

module.exports.updateReview = async (req, res) => {
  const { id, title, content } = req.body;
  if (!title || !content) {
    return res.status(200).send({
      message: 'all feilds are important',
      responseCode: 101,
    });
  }

  Review.findById(id, async (findReviewError, foundReview) => {
    if (findReviewError) {
      console.log('error occured while finding the review');
      return res.status(200).send({
        message: 'error occured while finding the review',
        responseCode: 102,
        error: findReviewError,
      });
    }

    if (!foundReview) {
      console.log('review not found');
      return res.status(200).send({
        message: 'review not found',
        responseCode: 103,
      });
    }

    foundReview.title = title;
    foundReview.content = content;
    await foundReview.save();
    return res.status(200).send({
      message: 'review is updated succsessfully!',
      responseCode: 100,
    });
  });
};

module.exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  Review.deleteOne(id, (findReviewError) => {
    if (findReviewError) {
      console.log('error occured while finding the review');
      return res.status(200).send({
        message: 'error occured while finding the review',
        responseCode: 102,
        error: findReviewError,
      });
    }
    return res.status(200).send({
      message: 'review is deleted succsessfully!',
      responseCode: 100,
    });
  });
};
