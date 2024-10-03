import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const { id } =: w req.params;
    const user = await User.findById(id);
    res.status(200).json({
      response: user
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}
// Read
export const getUsersFriends = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePaht }) => {
        return { _id, firstName, lastName, occupation, location, picturePaht };
      }
    );
    res.status(200).json({ response: formattedFriends });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update
export const addRemoveFriend = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
