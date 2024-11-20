const router = require("express").Router();
// middlewares:
const verifyMWToken = require("../middlewares/verifyMWToken");
const objectIdMWValidator = require("../middlewares/objectIdMWValidator");
const taskController = require("../controllers/task.controller");
const validateMW = require("../middlewares/validateMW");
// schemas
const newTaskSchema = require("../utils/newTask.schema");
const updateTaskSchmea = require("../utils/updateTask.schmea");

// validate id param:
router.param("userId", objectIdMWValidator("userId"));
router.param("taskId", objectIdMWValidator("taskId"));
router.use(verifyMWToken);

// 1) all tasks route:
router.get("/:userId", taskController.getAllTasks);
// 2) task route:
router.get("/:userId/:taskId", taskController.getTask);
// 3) new task route:
router.post("/:userId", validateMW(newTaskSchema), taskController.addNewTask);
// 4) update task route:
router.put(
  "/:userId/:taskId",
  validateMW(updateTaskSchmea),
  taskController.updateTask
);
// 5) check task route:
router.patch(
  "/:userId/:taskId/checked",
  validateMW(updateTaskSchmea),
  taskController.checkTask
);
// 6) delete task route:
router.delete("/:userId/:taskId", taskController.deleteTask);
// 7) delete all tasks route:
router.delete("/:userId", taskController.deleteAllTasks);

module.exports = router;
