const Review = require('../models/review');

module.exports.getAllReviews = async (req, res) => {
  const allReviews = await Review.find({});
  return res.status(200).send({
    message: 'data retrived succsessfully!',
    responseCode: 100,
    data: allReviews,
  });
};

module.exports.getReview = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(200).send({
      message: 'Id is missing!',
      responseCode: 101,
    });
  }
  Review.findById(id, (findReviewError, foundReview) => {
    if (findReviewError) {
      return res.status(200).send({
        message: 'error occured while finding the review',
        responseCode: 102,
        error: findReviewError,
      });
    }
    return res.status(200).send({
      message: 'data retrived succsessfully!',
      responseCode: 100,
      data: foundReview,
    });
  });
};

module.exports.createReview = async (req, res) => {
  const { title, content, dateTime } = req.body;
  if (!title || !content || !dateTime) {
    return res.status(200).send({
      message: 'all feilds are important',
      responseCode: 101,
    });
  }

  Review.create(
    {
      title,
      content,
      dateTime,
    },
    (err, result) => {
      if (err) {
        return res.status(200).send({
          message: 'error occured while creating the review',
          responseCode: 102,
          error: err,
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
      return res.status(200).send({
        message: 'error occured while finding the review',
        responseCode: 102,
        error: findReviewError,
      });
    }

    if (!foundReview) {
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
  Review.deleteOne({ _id: id }, (findReviewError) => {
    if (findReviewError) {
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
