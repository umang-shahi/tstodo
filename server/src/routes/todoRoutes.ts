import { Request,Response } from "express";

const router = require("express").Router();

const todoItemsModel = require("../models/todoItems");

//post
router.post("/api/item", async (req: Request, res:Response) => {
  try {
    const newItem = await new todoItemsModel({
      item: req.body.item,
    });

    const saveItem = newItem.save();
    res.status(200).json("Item added successfully");
  } catch (err) {
    res.json(err);
  }
});




// get

router.get("/api/items", async (req : Request, res: Response) => {
  try {
    const alltodoItems = await todoItemsModel.find({});
    res.status(200).json(alltodoItems);
  } catch (error) {
    res.json(error);
  }
});



// //put

router.put("/api/items/:id", async (req: Request, res: Response) => {
  try {
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id,  
      {$set: req.body},
    {new: true}
    );
    res.status(200).json("Item updated");
  } catch (error) {
    res.json(error);
  }
});



//delete

router.delete("/api/item/:id", async (req:Request, res:Response) => {
  try {
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Item deleted");
  }
   catch (error) {
    res.json(error);
  }
});


module.exports = router;