const {CakeModel, CookieModel} = require('../models/productModel');

// const getAllProductsStatic = async (req, res) => {
//   const products = await Product.find({ price: { $gt: 30 } })
//     .sort('price')
//     .select('name price');

//   res.status(200).json({ products, nbHits: products.length });
// };


const getAllCakes = async (req, res) => {
  const cakes = await CakeModel.find()
  res.status(200).json({ cakes, nbHits: cakes.length });
}

const getProduct = async (req, res) => {
  const id = Number(req.params.id);

  const chosenProduct = await CakeModel.findOne({idProduct : id})
  res.status(200).json({chosenProduct: chosenProduct});
}


const addCommentToProduct = async (req, res) => {
  const {userName, commentDescription, idProduct} = req.body;

  await CakeModel.updateOne(
    { idProduct: idProduct },
    { $push: {
        "comments": {
          "userName": userName,
          "commentDescription": commentDescription
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

const addNewCake = async (req, res) => {
  const {newCakeFromRequest} = req.body;

  generateNewIdProduct()
  .then((newIdProduct) => {
   
      const newCake = new CakeModel({
          idProduct: newIdProduct,
          comments: newCakeFromRequest.comments,
          price: newCakeFromRequest.price,
          composition: newCakeFromRequest.composition,
          description: newCakeFromRequest.description,
          title: newCakeFromRequest.title,
          image: newCakeFromRequest.image
      });
  
      // Saving the new document to the database
      newCake.save().then(result => {
          res.status(200).send({"success": true,"msg": "New cake added"});
      })
  })
}
// const getAllProducts = async (req, res) => {
//   const { featured, company, name, sort, fields, numericFilters } = req.query;
//   const queryObject = {};

//   if (featured) {
//     queryObject.featured = featured === 'true' ? true : false;
//   }
//   if (company) {
//     queryObject.company = company;
//   }
//   if (name) {
//     queryObject.name = { $regex: name, $options: 'i' };
//   }
//   if (numericFilters) {
//     const operatorMap = {
//       '>': '$gt',
//       '>=': '$gte',
//       '=': '$eq',
//       '<': '$lt',
//       '<=': '$lte',
//     };
//     const regEx = /\b(<|>|>=|=|<|<=)\b/g;
//     let filters = numericFilters.replace(
//       regEx,
//       (match) => `-${operatorMap[match]}-`
//     );
//     const options = ['price', 'rating'];
//     filters = filters.split(',').forEach((item) => {
//       const [field, operator, value] = item.split('-');
//       if (options.includes(field)) {
//         queryObject[field] = { [operator]: Number(value) };
//       }
//     });
//   }

//   let result = Product.find(queryObject);
//   // sort
//   if (sort) {
//     const sortList = sort.split(',').join(' ');
//     result = result.sort(sortList);
//   } else {
//     result = result.sort('createdAt');
//   }

//   if (fields) {
//     const fieldsList = fields.split(',').join(' ');
//     result = result.select(fieldsList);
//   }
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   result = result.skip(skip).limit(limit);
//   // 23
//   // 4 7 7 7 2

//   const products = await result;
//   res.status(200).json({ products, nbHits: products.length });
// };

module.exports = {
  getAllCakes,
  getProduct,
  addCommentToProduct,
  addNewCake
};
