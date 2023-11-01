const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
})

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/register.html"))
})

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/login.html"))
})

module.exports = router;