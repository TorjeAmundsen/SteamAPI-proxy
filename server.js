import express from "express";
import axios from "axios";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res("KF2 Tracker");
});

app.get("/:steamId", async (req, res) => {
  try {
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
