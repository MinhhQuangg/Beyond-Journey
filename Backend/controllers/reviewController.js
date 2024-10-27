const Review = require('../models/reviewModel');

exports.getAllReview = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      status: 'success',
      length: reviews.length,
      data: { reviews },
    });
  } catch (err) {
    next(err);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { review: newReview },
    });
  } catch (err) {
    next(err);
  }
};
