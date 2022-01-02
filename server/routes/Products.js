const express = require("express");
const router = express.Router();
const { Users, Products, Salerecords, sequelize, Branches, Storeproducts, Stores} = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");
const { QueryTypes } = require("sequelize");

router.delete("/:id", /* validateToken,*/ async(req,res) => {
    const pid = req.params.id;
    await Products.destroy({where: {id: pid}});
    res.json("sildim");
});
router.put("/bypid/:id", /* validateToken,*/ async(req,res) => {
    const id = req.params.id;
    const { branchId, saleCount, productname, userid} = req.body;
    await Products.decrement({ quantity: saleCount }, { where: {id: id}});
    const numara = await Products.findOne({ where: {id: id}});
    if(numara.quantity < 50){
        await Products.update({state: "Waiting approval"},{ where: {id: id}});
    }
    const spid = await Stores.findOne({where: {userId: userid}});
    console.log(spid.id);
    const nproduct = await Storeproducts.findOne({where: {StoreId: spid.id, productname: productname}});
    console.log(nproduct);
    if(nproduct == undefined){
        const sp2 = {productname: productname, quantity: 100, StoreId: spid.id};
        await Storeproducts.create(sp2);
    }
    else{
        const sp = await Storeproducts.findOne({where: {StoreId: spid.id, productname: productname}});
        if(sp.quantity < 50){
            await Storeproducts.increment({count: 100}, {where: {id: sp.id}});
        }
    }

    if(await Salerecords.findOne({where: {BranchId: branchId, productname: productname}})){
        await Salerecords.increment({count: saleCount}, {where: {BranchId: branchId, productname: productname}});
    } else{
        const record = {BranchId: branchId, count: 0, productname: productname};
        await Salerecords.create(record);
        await Salerecords.increment({count: saleCount}, {where: {BranchId: branchId, productname: productname}});
    }
    
    const deneme = await Products.findOne({where: {id:id}});

    res.json(deneme);
});

router.get("/bybranchid/:id", /*validateToken,*/ async(req, res) => {
    const id = req.params.id;
    const listOfProducts = await Products.findAll({where: {branchId : id}});
    res.json(listOfProducts);
});

router.post("/bybranchid/:branchid", /*validateToken,*/ async (req, res) => {
    let product = req.body;
    const BranchId = req.params.branchid;
    product = {...product, BranchId: BranchId};
    productnew = await Products.create(product);
    res.json(productnew);
});




router.get("/byuserid/user/:id", /*validateToken,*/ async (req,res) => {
    const userid = req.params.id;
    const listofProductnames = await sequelize.query(`SELECT productname FROM Salerecords WHERE branchId IN(SELECT branchId FROM Branches WHERE userId = ${userid}) GROUP BY productname`, {type: QueryTypes.SELECT});
    res.json(listofProductnames);
});

router.get("/reports/:id/:pname", /*validateToken,*/ async (req,res) => {
    const userid = req.params.id;
    const pname = req.params.pname;
    console.log(pname);
    console.log(userid);
    const Allrecords = await sequelize.query(`SELECT branchname,count FROM Salerecords,Branches,Users WHERE Users.id = ${userid} AND Salerecords.productname = "${pname}"
     AND Branches.id = Salerecords.branchId`, {type: QueryTypes.SELECT});
    res.json(Allrecords);
});



module.exports = router;