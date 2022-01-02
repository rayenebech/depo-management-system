const express = require("express");
const router = express.Router();
const { Salerecords} = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:id", async(req, res) => {
    let id = req.params.id;
    const s_alerecords = await Salerecords.findAll({where: {branchId : id}});
    res.json(s_alerecords);
});


module.exports = router;