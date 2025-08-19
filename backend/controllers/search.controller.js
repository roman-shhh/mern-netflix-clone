import { User } from "../models/user.model.js";

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({
      success: true,
      content: req.user.searchHistory || []
    });
  } catch (error) {
    console.log("Error in getSearchHistory:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function removeItemFromSearchHistory(req, res) {
  let { id } = req.params;
  id = parseInt(id);

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id }
      }
    });

    res.status(200).json({
      success: true,
      message: "Item removed from search history"
    });
  } catch (error) {
    console.log("Error in removeItemFromSearchHistory:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}