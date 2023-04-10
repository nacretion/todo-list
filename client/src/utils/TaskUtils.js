export const getTasksByResponsibleId = async (id) => {
    if (id) {
        const response = await fetch('http://localhost:5000/task/byrespid?id=' + id);

        const data = await response.json();

        return response.ok ? data : undefined;
    } else {
        return undefined;
    }
}

export const getStatus = (status) => {
    switch (status) {
        case 0: return "К выполнению";
        case 1: return "Выполняется";
        case 2: return "Выполнена";
        case 3: return "Отменена";
    }
}

export const updateTask = async (task) => {
    const response = await fetch('http://localhost:5000/task/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({task})
    });

    const data = await response.json();

    return response.ok ? data : undefined;
}
