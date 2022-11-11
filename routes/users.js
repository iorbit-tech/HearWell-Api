const express = require("express");

const router = express.Router();

const { createUsers, userLogin, updateUser } = require("../controllers/users");

// /**
//  * @route GET api/vitals
//  * @description get all todos
//  * @access public
//  */

// router.get("/", getAllVitals);

/**
 * @route POST api/todo
 * @description Add a new TODO
 * @access public
 */

router.post("/", createUsers);

// /**
//  * @route PUT api/todo/:id
//  * @description update todo
//  * @access public
//  */

/**
 * @route POST api/user/login
 * @description Add a new TODO
 * @access public
 */

router.post("/login", userLogin);

router.put("/:id", updateUser);

// /**
//  * @route DELETE api/todo/:id
//  * @description delete todo by id
//  * @access public
//  */

// router.delete("/:id", deleteTodo);

module.exports = router;
