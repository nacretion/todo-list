export const getTasksByResponsibleId = async (id) => {
    if (id) {
        const response = await fetch('http://localhost:5000/task/byrespid?id=' + id);

        const data = await response.json();

        if (response.ok) {
            return data
        }
    } else return undefined

}
// export const getTasksByCreatorId = async (id) => {
//
// }

export const getStatus = (status) => {
    switch (status) {
        case 0: return "К выполнению"
        case 1: return "Выполняется"
        case 2: return "Выполнена"
        case 3: return "Отменена"
    }
}


