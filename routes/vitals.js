const express = require("express");

const router = express.Router();

const {
    getAllVitals,
   
} = require("../controllers/vitals");

/**
 * @route GET api/vitals
 * @description get all todos
 * @access public
 */

router.get("/", getAllVitals);

// /**
//  * @route POST api/todo
//  * @description Add a new TODO
//  * @access public
//  */

// router.post("/", postCreateTodo);

// /**
//  * @route PUT api/todo/:id
//  * @description update todo
//  * @access public
//  */
// router.put("/:id", putUpdateTodo);

// /**
//  * @route DELETE api/todo/:id
//  * @description delete todo by id
//  * @access public
//  */

// router.delete("/:id", deleteTodo);

module.exports = router;
