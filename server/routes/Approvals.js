const express = require("express");
const router = express.Router();
const { Approvals, sequelize, Branches, Products} = require("../models");
const { QueryTypes } = require("sequelize");

const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/byproductid/:id"/*, validateToken*/, async(req, res) => {
    const id = req.params.id;
    let Approval = [];
    Approval = await sequelize.query(`SELECT Approvals.id,Approvals.productname,Approvals.state,Approvals.ProductId FROM Approvals,Products,Branches WHERE Branches.id=${id} AND Branches.id = Products.BranchId
     AND Products.id = Approvals.ProductId`, {type: QueryTypes.SELECT});
    res.json(Approval);
});

router.post("/byproductid/:id",/* validateToken,*/ async (req, res) => {
    const Approval = req.body;
    Approval.ProductId = req.params.id;
    const deneme = await Approvals.create(Approval);
    res.json(deneme);
});

router.delete("/byapprovalid/:id", /*validateToken,*/ async (req,res) => {
    const id = req.params.id;
    await Approvals.destroy({
        where: {id: id}
    });
});

module.exports = router;