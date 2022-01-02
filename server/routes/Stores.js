const express = require("express");
const router = express.Router();
const { Stores, Storeproducts, Users, Branches, Products, Approvals, sequelize} = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");
const { QueryTypes } = require("sequelize");

router.get("/products/:id",/* validateToken,*/ async(req, res) => {
    const id = req.params.id;
    const listOfStoreProducts = await Storeproducts.findAll({where: {storeId : id}}); //çalışması denenmedi userId ile yukarıdan getirilebilir
    
    res.json(listOfStoreProducts);
});

router.put("/approvalcheck/:id",/* validateToken*/ async(req, res) => {
    const branchid = req.params.id;
    const {approvalid, productname, productid} = req.body;
    const branch = await Branches.findOne({where: {id:branchid}});
    const userId = branch.UserId;
    const StoreId = await Stores.findOne({where: {UserId: userId}});
    const StoreProduct = await Storeproducts.findOne({where: {StoreId: StoreId.id,productname:productname}});
    if(StoreProduct.quantity > 50){
        await Storeproducts.decrement({ quantity: 50 }, { where: {id: StoreProduct.id}});
        await Products.increment({quantity: 50}, {where: {id: productid}});
        //await Products.update({state: "1"},{where: {id:productid}});
        
        res.json({err: "noerror"});
    }
    else{
        res.json({err: "error"});
    }

});

router.put("/statecheck/:id",/* validateToken*/ async(req, res) => {
    const id = req.params.id;
    
    await Products.update({state: "No Current Order"},{where: {id:id}});
    

});

router.get("/capacity/:id",/* validateToken,*/ async(req, res) => {
    const id = req.params.id;
    const capacity = await Stores.findOne({where: {id : id}});
    res.json(capacity);
});

router.post("/", validateToken, async (req, res) => {
    const store = req.body;
    store.UserId = req.user.id;
    await Stores.create(store);
    res.json(store);
});

router.post("/addStoreproduct/:id", /*validateToken,*/ async (req, res) => {
    const id = req.params.id;
    const StoreId = await Stores.findOne({where: {UserId: id}});
    const {productname, startamount} = req.body;
    const sp = {productname: productname, quantity: parseInt(startamount), StoreId: StoreId.id};
    await Storeproducts.create(sp);
    res.json(sp);
});

router.put("/updateq/:id", /*validateToken,*/ async (req,res) => {
    const id = req.params.id;
    const urun = req.body;
    const store = await Stores.findOne({where: {userId: id}});
    await Storeproducts.increment({quantity: urun.quantity}, {where: {storeId: store.id, productname: urun.pname}});

    res.json("hello");

});



module.exports = router;