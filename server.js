import express from "express";
import axios from "axios";
import "dotenv/config";

console.log(process.env.STEAM_API_KEY);

const app = express();
const port = 3000;

app.get("/steam-data/:steamId", async (req, res) => {
  try {
    console.log(
      `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=232090&key=${process.env.STEAM_API_KEY}&steamid=${req.params.steamId}/`
    );
    const response = await axios.get(
      `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=232090&key=${process.env.STEAM_API_KEY}&steamid=${req.params.steamId}/`
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
