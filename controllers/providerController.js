import User from "../models/userModel.js";

export const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find();
    res.status(200).json({ message: "Here are the providers. ", providers: providers});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProviders = async (req, res) => {
  try {
    const {
      name,
      role,
      location,
      rating,
      reviews,
      totalServices,
      profileImage,
      bio,
      service,
    } = req.body;

    if(!name || !role || !location || !bio ){
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const newProvider = await Provider.create({
      name,
      role,
      location,
      rating,
      reviews,
      totalServices,
      profileImage,
      bio,
      service,
    })

    res.status(201).json({
      message: "Provider registered successfully",
      provider: newProvider
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
