const PromotionModel = require('../models/promotionModel');

const getAllPromotions = async (req, res) => {
  const promotions = await PromotionModel.find()
res.status(200).json({ promotions, nbHits: promotions.length });
}

module.exports = {
  getAllPromotions
};
