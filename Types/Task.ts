export type updFields = {
    heading?:string,
    description?:string,
    endDate?:Date,
    createDate?:Date,
    updDate?:Date,
    priority?:number,
    status?:number,
    creatorId?:number,
    responsibleId?:number
}
export type TaskType = {
    id?: number,
    heading: string,
    description: string,
    endDate: Date,
    createDate?: Date,
    updDate?: Date,
    priority:number,
    status:number,
    creatorId:number,
    responsibleId:number
}
export type TaskArrayType = {
    task: TaskType[]
}
