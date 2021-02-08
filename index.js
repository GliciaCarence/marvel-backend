const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(formidable());
app.use(cors());

require("dotenv").config();

// get a list of comics
app.get("/comics", async (req, res) => {
    try {
        const limit = 100;

        let title = "";
        if (req.query && req.query.title) {
            title = req.query.title;
        }

        let page = 0;
        if (req.query && req.query.page) {
            page = Number(req.query.page);
        }

        const skip = limit * page;

        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&limit=${limit}&skip=${skip}`
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// get a list of characters
app.get("/characters", async (req, res) => {
    try {
        const limit = 100;

        let name = "";
        if (req.query && req.query.name) {
            name = req.query.name;
        }

        let page = 0;
        if (req.query && req.query.page) {
            page = Number(req.query.page);
        }

        const skip = limit * page;

        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&limit=${limit}&skip=${skip}`
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// get a list of comics containing a specific character
app.get("/comics/:characterId", async (req, res) => {
    try {
        const id = req.params.characterId;
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${process.env.API_KEY}`
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

app.all("*", (req, res) => {
    res.status(404).json({ message: "Page  not found" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port : ${process.env.PORT}`);
});
