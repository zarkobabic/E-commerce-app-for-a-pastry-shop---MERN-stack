const UserModel = require('../models/userModel');

const getUserWorker = async (req, res) => {
  const {username, password} = req.body;
  
  const chosenUser = await UserModel.findOne({username : username, password: password, type: "worker"})
  if (!chosenUser) {
    return res.status(404).json({"success": false, "msg": 'User not found' });
  }
  res.status(200).json({"success": true, user: chosenUser, msg: "Successfully logged in!"});
}

const getUserShopper = async (req, res) => {
  const {username, password} = req.body;
  
  const chosenUser = await UserModel.findOne({username : username, password: password, type: "shopper"})
  if (!chosenUser) {
    return res.status(404).json({"success": false, "msg": 'User not found' });
  }
  res.status(200).json({"success": true, user: chosenUser, msg: "Successfully logged in!"});
}


const getUserWithUsername = async (req, res) => {
  const {username} = req.body;
  
  const chosenUser = await UserModel.findOne({username : username})

  if (!chosenUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json({user: chosenUser});
}

const editUser = async (req, res) => {
  const {username, user} = req.body;
  
  UserModel.updateOne({username: username}, {$set: user}).then(result => {
      res.status(200).send({"success": true});
  })
}

const changePassword = async (req, res) => {
  const {username, oldPassword, newPassword, reenteredPassword} = req.body;

  if(newPassword !== reenteredPassword) return res.status(400).send({"success": false, "msg": "Passwords must match!"});
  
  const chosenUser = await UserModel.findOne({username: username});
  if(chosenUser.password == oldPassword){
    UserModel.updateOne({username: username}, {$set: {password: newPassword}}).then(result => {
      res.status(200).send({"success": true,"msg": "Password changed successfully"});
    })
  } 
  else{
    res.status(400).send({"success": false, "msg" : "Old password is wrong!"});
  }
}

const getUserWithId = async (req, res) => {
  const id = Number(req.params.id);

  const chosenUser = await UserModel.findOne({id : id})
  res.status(200).json({user: chosenUser});
}



module.exports = {
  getUserWorker,
  getUserShopper,
  getUserWithUsername,
  editUser,
  changePassword,
  getUserWithId
};
