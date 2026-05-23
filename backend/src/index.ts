import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const figures = [
  {
    id: 1,
    name: "Gojo",
    anime: "Jujutsu Kaisen",
  },
];

app.get("/figures", (req, res) => {
  res.json(figures);
});

app.listen(3000, () => {
  console.log("Server running");
});
