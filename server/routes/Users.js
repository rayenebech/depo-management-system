const express = require("express");
const router = express.Router();
const { Users, Stores } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const {username, password} = req.body;
    const storename = `${username}'s Store`;
    const capacity = 1800;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("Created user successfully");
    });
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await Users.findOne({where: {username: username}});
    if(!user) {res.json({error: "User Doesn't Exist"});}
    console.log(user.password);
    const accessToken = sign(
        {username: user.username, id: user.id},
        "importantsecret"
    );
    res.json({ token: accessToken, username: username, id: user.id});
    /*bcrypt.compare(password, user.password).then(async (match) => {
        if(!match) {res.json({error: "Wrong username and password combination"});}
        
        const accessToken = sign(
            {username: user.username, id: user.id},
            "importantsecret"
        );
        res.json({ token: accessToken, username: username, id: user.id});
    });*/
});

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
});


module.exports = router;