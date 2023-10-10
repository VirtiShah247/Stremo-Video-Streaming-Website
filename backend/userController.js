const userModel = require("./usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginControl = async (req, res) => {
  
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    }
    const matchPass = await bcrypt.compare(req.body.password, user.password);
    if (!matchPass) {
      console.log("password in login is ", dcrypt.hash(user.password))
      return res
        .status(200)
        .send({ message: "Invalid User or Password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY_SECRET, {
      expiresIn: "1d",
    });
    console.log("token is ",token);
 
   
    if (token){
      return res
      .status(200)
      .send({ message: "Login Success", success: true, token, user });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `${error.message}`, success: false });
  }
};
const registerControl = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    const userNameSame = await userModel.findOne({ name: req.body.name });
    console.log("userName Same is ", existingUser)
    console.log("req.body.name is ", req.body.name)
    if (existingUser) {
      return res
        .status(200)
        .send({ message: `User Already Exist`, success: false });
    }
    else if (userNameSame) {
      return res
      .status(200)
      .send({ message: `User Name already exist`, success: false})
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Success", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `${error.message}`, success: false });
  }
};

const tokenExpiredControl = async (req, res)=> {
  const { token } = req.body;
  // console.log("req.body are", req.body);
  try {
    const user = jwt.verify(token, process.env.KEY_SECRET, (err, res) => {
      if (err) {
        console.log(err)
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      console.log("at server side token is expired")
      return res.send({ data: "token expired" });
    }
  } catch (error) { 
    console.log("token catch error ", error);
  }
}

const continueWatching = async (req, res) => {
  const { userId, videoId, currentTime } = req.body.continueWatching;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      res.status(404).send({ message: "User not found", success: false });
      return;
    }

    const existingItemIndex = user.continueWatching.findIndex(
      (item) => item.videoId === videoId
    );

    if (existingItemIndex !== -1) {
      // Update the existing item's currentTime
      user.continueWatching[existingItemIndex].currentTime = currentTime;
    } else {
      // Add a new object to the array
      user.continueWatching.push({ videoId, currentTime });
    }

    await user.save();

    res.status(201).send({ message: "Video id added/updated in continue watching", success: true, continueMovies: user.continueWatching });
  } catch (err) {
    console.error("MongoDB error:", err);

    if (err.response) {
      console.error("MongoDB response data:", err.response.data);
    }

    res.status(500).send({ message: `${err.message}`, success: false });
  }
};



const continueWatchingMovies = async (req,res) => {
  const userId  = req.body.userId;
  console.log("User id is ", userId);
  try {
    const result = await userModel.findById({_id: userId})
    const continueMovies = result.continueWatching
    console.log("result is ", continueMovies)
    res.status(201).send({ message: "Continue watching fetched", success: true, continueMovies });

  }
  catch(err) {
    res.status(500).send({ message: `${err.message}`, success: false });
    
  }  
}

const continueVideo = async(req,res) => {
  const userId  = req.body.userId;
  console.log("User id is ", userId);
  try {
    const result = await userModel.findById({_id: userId})
    const continueMovies = result.continueWatching
    console.log("result is ", continueMovies)
    res.status(201).send({ message: "Continue watching fetched", success: true, continueMovies });

  }
  catch(err) {
    res.status(500).send({ message: `${err.message}`, success: false });
    
  }  
}
 
const deleteVideo = async (req,res) => {
  console.log("in delete video")
  const {userId, videoId} = req.body;
  try{
    const result = await userModel.findByIdAndUpdate(
      { _id: userId },
      { $pull: { continueWatching: { videoId: videoId } } }
    );
    console.log("result is ", result);
    res.status(201).send({ message: "VideoId deleted", success: true });

  }
  catch(err){
    res.status(500).send({ message: `${err.message}`, success: false });

  }
}
module.exports = { loginControl, registerControl, tokenExpiredControl, continueWatching, continueWatchingMovies, continueVideo, deleteVideo };
