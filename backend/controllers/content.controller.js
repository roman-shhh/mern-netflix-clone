import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrending(type, req, res) {
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`)
    const randomContent = data.results[Math.floor(Math.random() * data.results?.length)]

    res.status(200).json({
      success: true,
      content: randomContent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export async function getTrailers(type, req, res) {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`);
    res.status(200).json({
      success: true,
      content: data.results
    });
  } catch (error) {
    if (error.message) {
      return res.status(404).send(null);
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export async function getDetails(type, req, res) {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`);
    res.status(200).json({
      success: true,
      content: data
    });
  } catch (error) {
    if (error.message) {
      return res.status(404).send(null);
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export async function getSimilar(type, req, res) {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`);
    res.status(200).json({
      success: true,
      content: data.results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export async function getByCategory(type, req, res) {
  const { category } = req.params;

  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`);
    res.status(200).json({
      success: true,
      content: data.results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export async function searchFunction(type, req, res) {
  const { query } = req.params;

  try {
    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/${type}?query=${query}&include_adult=false&language=en-US&page=1`);

    if (!response || !response.results || !response.results.length) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: type === 'person' ? response.results[0].profile_path : response.results[0].poster_path,
          title: type === 'person' || type === 'tv' ? response.results[0].name : response.results[0].title,
          searchType: type,
          createdAt: new Date()
        }
      }
    });

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchFunction:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}