const express = require("express");
const router = express.Router();
const pool = require('../db.cjs');

// Create news article
router.post("/", async (req, res) => {
    const { title_en, content_en, title_de, content_de } = req.body;
    const pool = req.pool;

    try {
        const [result] = await pool.execute(`
            INSERT INTO news (title_en, content_en, title_de, content_de, created_at, updated_at)
            VALUES (?, ?, ?, ?, NOW(), NOW())
        `, [title_en, content_en, title_de, content_de]);

        res.status(201).json({
            message: "News post created successfully",
            newsId: result.insertId,
        });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }
});


//Get all news articles
router.get("/", async (req, res) => {
    const pool = req.pool;

    try {
        const [news] = await pool.execute("SELECT id, title_en, content_en, title_de, content_de, created_at, updated_at FROM news");
        res.status(200).json(news);
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

// Delete news article
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const pool = req.pool;

    try {
        // First, delete related images and attachments
        await pool.execute("DELETE FROM news_images WHERE news_id = ?", [id]);
        await pool.execute("DELETE FROM news_attachments WHERE news_id = ?", [id]);

        // Then, delete the news post itself
        const [result] = await pool.execute("DELETE FROM news WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "News post not found" });
        }

        res.json({ message: "News post deleted successfully" });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

// Edit news article
router.put('/:id', async (req, res) => {
    const { id } = req.params;  // Getting the post ID from the URL
    const { title_en, content_en, title_de, content_de } = req.body;

    try {
        // First, update the post
        await pool.query(
            'UPDATE news SET title_en = ?, content_en = ?, title_de = ?, content_de = ?, updated_at = NOW() WHERE id = ?',
            [title_en, content_en, title_de, content_de, id]
        );

        // Then, fetch the updated post
        const [updatedPost] = await pool.query(
            'SELECT * FROM news WHERE id = ?',
            [id]
        );

        // Send the updated post as the response
        res.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

module.exports = router;
