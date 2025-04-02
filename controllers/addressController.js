import User from "../models/userModel.js";

export const addAddress = async (req, res) => {
  try {
    const {id}= req.params;
    const newAddress = req.body;

    const user = await User.findByIdAndUpdate(
        id,
        {$push:{address: newAddress}},
        {new: true}
    );

    if(!user){
        res.status(404).json({message: "User not found."})
    }
    
    res.status(201).json({ message: 'Address added successfully', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
