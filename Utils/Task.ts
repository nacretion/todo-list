import {Database} from "../database"
import {TaskArrayType, TaskType} from "../Types/Task";


export default class Task {
    id!: number;
    heading: string;
    description: string;
    endDate: Date;
    createDate: Date;
    updDate: Date;
    priority: number;
    status: number;
    creatorId: number;
    responsibleId: number;

    constructor(
        heading: string,
        description: string,
        endDate: Date,
        createDate: Date,
        updDate: Date,
        priority: number,
        status: number,
        creatorId: number,
        responsibleId: number,
        id?: number
    ) {
        if (id) {
            this.id = id
        }
        this.heading = heading;
        this.description = description;
        this.endDate = endDate;
        this.createDate = createDate;
        this.updDate = updDate;
        this.priority = priority;
        this.status = status;
        this.creatorId = creatorId;
        this.responsibleId = responsibleId;
    }

    static async create(
        data: TaskType
    ) {

        let endDate = new Date(new Date(data.endDate).getTime())

        console.log(endDate)
        const result = await Database.query(
            "INSERT INTO task (heading, description, end_date, priority, status, creator_id, responsible_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [data.heading, data.description, endDate, data.priority, data.status, data.creatorId, data.responsibleId]
        );

        if (result.rows[0]) {
            const id =  result.rows[0].id
            const createDate =  result.rows[0].create_date
            const updDate =  result.rows[0].upd_date
            return new Task(data.heading, data.description, data.endDate, createDate, updDate,  data.priority, data.status, data.creatorId, data.responsibleId, id)
        }
    }

    static async updateTask(updTask: Partial<TaskType>): Promise<TaskType | undefined> {
        const oldTask = await Database.query("SELECT * FROM task WHERE id = $1", [updTask.id]);


        console.log(updTask.endDate)
        if (oldTask.rows[0]) {
            const task = oldTask.rows[0] as TaskType;
            const newTask = { ...task, ...updTask} as TaskType;

            const query =`UPDATE task SET heading = $1, description = $2, end_date = $3, priority = $4, status = $5, responsible_id = $6, upd_date=$7 WHERE id = $8 RETURNING *`


            const result = await Database.query(query, [newTask.heading, newTask.description, newTask.endDate, newTask.priority, newTask.status, newTask.responsibleId, new Date(Date.now()), updTask.id]);

            if (result.rows[0]) {
                return result.rows[0] as TaskType;
            }
        }

        return undefined;
    }


    async getById(id: number) {
        const result = await Database.query("SELECT * FROM task where id = $1", [id])
        if (result.rows[0]) {
            const params = result.rows as TaskType

            console.log(params)
            // return new Task(heading, description, end_date, create_date, upd_date, priority, status, creator_id, responsible_id, id)
        }
    }
    static async getByResponsibleId(id: number) {
        const result = await Database.query("SELECT * FROM task where responsible_id = $1", [id])
        if (result.rows[0]) {
            return result.rows as TaskArrayType
            // return new Task(heading, description, end_date, create_date, upd_date, priority, status, creator_id, responsible_id, id)
        }
    }
    static async getByCreatorId(id: number) {
        const result = await Database.query("SELECT * FROM task where creator_id = $1", [id])
        if (result.rows[0]) {
            return result.rows as TaskArrayType
            // return new Task(heading, description, end_date, create_date, upd_date, priority, status, creator_id, responsible_id, id)
        }
    }


}
