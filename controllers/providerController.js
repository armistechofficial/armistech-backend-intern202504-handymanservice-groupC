import Provider from '../models/providerModel.js';

export const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find();
    res.status(200).json({message: "Here are the providers. ", providers});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
