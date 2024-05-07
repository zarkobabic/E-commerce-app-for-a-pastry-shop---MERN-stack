const {CookieModel, CakeModel} = require('../models/productModel');

const getAllCookies = async (req, res) => {
  const cookies = await CookieModel.find()
res.status(200).json({ cookies, nbHits: cookies.length });
}

const getProduct = async (req, res) => {
  const id = Number(req.params.id);
  const chosenProduct = await CookieModel.findOne({idProduct : id})
  res.status(200).json({chosenProduct: chosenProduct});
}

const addCommentToProduct = async (req, res) => {
  const {userName, commentDescription, idProduct} = req.body;

  await CookieModel.updateOne(
    { idProduct: idProduct },
    { $push: {
        "comments": {
          "userName": userName,
          "commentDescription":commentDescription
        }
      }
    }
  );
  
  res.status(200).send({"success": true,"msg": "Comment is added!"});
}


async function generateNewIdProduct() {
  try {
      const maxIdCake = await CakeModel.findOne().sort({ idProduct: -1 }).select('idProduct').limit(1);
      const maxIdCookie = await CookieModel.findOne().sort({ idProduct: -1 }).select('idProduct').limit(1);
      let maxIdProduct;
      
      if(maxIdCookie > maxIdCake){
        maxIdProduct = maxIdCookie;
      }
      else{
        maxIdProduct = maxIdCake;
      }

      let newIdProduct;
      if (maxIdProduct) {
        newIdProduct = maxIdProduct.idProduct + 1;
      } else {
          // If no documents are present, start with 1
          newIdProduct = 1;
      }

      return newIdProduct;
  } catch (error) {
      console.error('Error generating new newIdProduct:', error);
      throw error;
  }
}

const addNewCookie = async (req, res) => {
  const {newCookieFromRequest} = req.body;

  generateNewIdProduct()
  .then((newIdProduct) => {

      const newCookie = new CookieModel({
          idProduct: newIdProduct,
          comments: newCookieFromRequest.comments,
          price: newCookieFromRequest.price,
          composition: newCookieFromRequest.composition,
          description: newCookieFromRequest.description,
          title: newCookieFromRequest.title,
          image: newCookieFromRequest.image
      });
  
      // Saving the new document to the database
      newCookie.save().then(result => {
          res.status(200).send({"success": true,"msg": "New cookie added"});
      })
  })
}

module.exports = {
  getAllCookies,
  getProduct,
  addCommentToProduct,
  addNewCookie
};
