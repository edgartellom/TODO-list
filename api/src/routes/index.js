const { Router } = require("express");
const getTODOs = require("../controllers/getTODOs");
const createTODO = require("../controllers/createTODO");
const deleteTODO = require("../controllers/deleteTODO");
const updateTODO = require("../controllers/updateTODO");
const markTODO = require("../controllers/markTODO");
const getCategories = require("../controllers/getCategories");

const router = Router();

router.get("/todos", getTODOs);
router.post("/todo", createTODO);
router.delete("/todo/:todoId", deleteTODO);
router.put("/todo/:todoId", updateTODO);
router.put("/todo_status/:todoId", markTODO);

router.get("/categories", getCategories);

module.exports = router;
