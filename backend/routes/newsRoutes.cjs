const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("../db.cjs");
const router = express.Router();
const fs = require("fs");

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Create news with files (images & attachments)
router.post("/", upload.array("files", 10), async (req, res) => {
    const { title_en, content_en, title_de, content_de, created_at } = req.body;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const fileUrls = req.files.map(file => `/uploads/${file.filename}`).join(",");
        const fileTypes = req.files.map(file => file.mimetype.startsWith("image") ? "image" : "attachment").join(",");
        const positions = req.files.map((_, index) => index + 1).join(",");

        // Use provided created_at date or default to NOW()
        const customCreatedAt = created_at ? new Date(created_at) : new Date();

        const [newsResult] = await connection.execute(
            `INSERT INTO news (title_en, content_en, title_de, content_de, file_urls, file_types, positions, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [title_en, content_en, title_de, content_de, fileUrls, fileTypes, positions, customCreatedAt]
        );

        await connection.commit();
        res.status(201).json({ message: "News created successfully", newsId: newsResult.insertId, createdAt: customCreatedAt });
    } catch (error) {
        await connection.rollback();
        console.error("Error creating news:", error);
        res.status(500).json({ error: "Failed to create news" });
    } finally {
        connection.release();
    }
});


// Get all news articles
router.get("/", async (req, res) => {
    try {
        const [news] = await pool.execute("SELECT * FROM news");
        res.status(200).json(news);
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.execute(
            `SELECT * FROM news WHERE id = ?`, [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "News not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ error: "Failed to fetch news" });
    } finally {
        connection.release();
    }
});

// Delete news article
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [news] = await pool.execute("SELECT file_urls FROM news WHERE id = ?", [id]);
        if (news.length === 0) {
            return res.status(404).json({ error: "News post not found" });
        }
        
        if (news[0].file_urls) {
            const filePaths = news[0].file_urls.split(",").map(file => path.join(__dirname, "..", file));
            filePaths.forEach(filePath => {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }

        await pool.execute("DELETE FROM news WHERE id = ?", [id]);
        res.json({ message: "News post and files deleted successfully" });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

// Edit news article
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title_en, content_en, title_de, content_de } = req.body;

    try {
        await pool.query(
            "UPDATE news SET title_en = ?, content_en = ?, title_de = ?, content_de = ?, updated_at = NOW() WHERE id = ?",
            [title_en, content_en, title_de, content_de, id]
        );

        const [updatedPost] = await pool.query("SELECT * FROM news WHERE id = ?", [id]);
        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Failed to update post" });
    }
});

module.exports = router;
