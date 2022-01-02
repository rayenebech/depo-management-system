const express = require("express");
const router = express.Router();
const { Branches} = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/byuserid/:id", /*validateToken,*/ async(req, res) => {
    const id = req.params.id;
    const listOfBranches = await Branches.findAll({where: {userId : id}}); //userId idi diyelim
    res.json(listOfBranches);
});

router.post("/byuserid/:id",/* validateToken,*/ async (req, res) => {
    const branch = req.body;
    //branch.UserId = req.user.id;
    const id = req.params.id;
    branch.UserId = id;
    await Branches.create(branch);
    res.json(branch);
});

router.delete("/:id",/* validateToken,*/ async (req, res) => {
    const id = req.params.id;
    await Branches.destroy({where: {id: id}});
    res.json("silme basarili");
});


module.exports = router;