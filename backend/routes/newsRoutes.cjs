const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("../db.cjs");
const router = express.Router();
const fs = require("fs");
const slugify = require("slugify");

// Set up multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Ensure 'uploads' directory exists
    },
    filename: function (req, file, cb) {
        // Ensure a unique filename using Date.now()
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

// Create news article
router.post("/", upload.array("files", 10), async (req, res) => {
    const { title_en, content_en, title_de, content_de, created_at, show_first_image, gallery_layout } = req.body;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Generate a slug from the German title
        const slug = slugify(title_de, { lower: true, strict: true });

        // Convert show_first_image to a proper boolean (0 or 1)
        const showFirstImage = show_first_image === "true" ? 1 : 0;

        // Construct file URLs for each uploaded file
        const fileUrls = req.files.map(file => `/uploads/${file.filename}`);
        const fileTypes = req.files.map(file => file.mimetype.startsWith("image") ? "image" : "attachment");
        const positions = req.files.map((_, index) => index + 1);

        // Convert arrays to comma-separated strings
        const fileUrlsString = fileUrls.join(",");
        const fileTypesString = fileTypes.join(",");
        const positionsString = positions.join(",");

        // Use provided created_at date or default to NOW()
        const customCreatedAt = created_at ? new Date(created_at) : new Date();

        const [newsResult] = await connection.execute(
            `INSERT INTO news (title_en, content_en, title_de, content_de, file_urls, file_types, positions, created_at, updated_at, show_first_image, gallery_layout, slug) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ? )`,
            [
                title_en,
                content_en,
                title_de,
                content_de,
                fileUrlsString,
                fileTypesString,
                positionsString,
                customCreatedAt,
                showFirstImage, 
                gallery_layout || "grid",
                slug // Store the generated slug from German title
            ]
        );

        await connection.commit();
        res.status(201).json({ 
            message: "News created successfully", 
            newsId: newsResult.insertId, 
            slug, 
            createdAt: customCreatedAt 
        });
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

// Get news article by slug
router.get('/:slug', async (req, res) => {
    const slug = req.params.slug;
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.execute(
            `SELECT * FROM news WHERE slug = ?`, [slug]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        connection.release();
    }
});

// Get news article by ID
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
