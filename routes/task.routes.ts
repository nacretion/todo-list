import express from 'express';
import {TaskController} from "../controllers/task.controller";

const router = express.Router();

const taskController = new TaskController();
router.post('/create', taskController.createTask);

router.get('/byrespid', taskController.getTasksByResponsibleId);
router.get('/bycreatorid', taskController.getTasksByCreatorId);

export default router;