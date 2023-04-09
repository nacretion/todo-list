import {Request, Response} from "express";
import {TaskType} from "../Types/Task";
import Task from "../Utils/Task";

export class TaskController {
    async createTask(request: Request, result: Response) {
        try {
            const data = request.body as TaskType
            console.log(data)

            if (data) {
                const task = await Task.create(data)

                return result.status(201).json(task)
            }

        } catch (e: any) {

            result.status(500).json({message: e.message})
        }
    }

    async getTasksByResponsibleId(request: Request, result: Response) {
        try {
            const id = parseInt(<string>request.query.id)

            const tasks = await Task.getByResponsibleId(id)

            if (!tasks) {
                return result.status(404).json("Not found")
            }

            return result.status(200).json(tasks)
        } catch (e: any) {

            result.status(500).json({message: e.message})
        }
    }
    async getTasksByCreatorId(request: Request, result: Response) {
        try {
            const id = parseInt(<string>request.query.id)

            const tasks = await Task.getByCreatorId(id)

            if (!tasks) {
                return result.status(404).json("Not found")
            }

            return result.status(200).json(tasks)
        } catch (e: any) {

            result.status(500).json({message: e.message})
        }
    }
}
