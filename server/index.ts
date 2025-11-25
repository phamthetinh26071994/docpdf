import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Bật CORS cho tất cả origin
app.use(cors());

app.get("/pdf/:id", async (req, res) => {
  const fileId = req.params.id;
  const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  try {
    const response = await fetch(driveUrl);
    if (!response.ok) throw new Error("Drive fetch failed");

    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/pdf");
    // Không cần set lại Access-Control-Allow-Origin thủ công, cors middleware lo rồi
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    res.status(500).send("Không thể tải PDF từ Google Drive.");
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
