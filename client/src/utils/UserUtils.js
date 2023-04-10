export const checkToken = async () => {
    const token = localStorage.token

    if (!token) {
        return false
    }

    const result = await fetch("https://api.nacretion.space/user/verify", {
        method: 'POST',
        headers: {
            'Authorization': token
        }
    });

    if (result.status === 200) {
        return true
    }
    localStorage.removeItem("token")
    return false
};

export const getAbbreviated = async (id) => {

    if (id) {
        const result = await fetch("https://api.nacretion.space/user/name?id=" + id);

        const data = result.json()
        if (result.ok) {
            return data;
        }
    }
}

export const loginUser = async (login, password) => {
    const response = await fetch('https://api.nacretion.space/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
    });

    const data = await response.json();


    console.log(data)
    if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user.id);
        return true
    }
}

export const getSlavesByBossId = async (id) => {

    const response = await fetch('http://localhost:5000/user/slaves?chief_id=' + id)

    const data = response.json()
    if (response.ok) {
        return data
    }
    else return undefined

}