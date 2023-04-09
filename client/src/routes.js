import {checkToken} from "./utils/UserUtils";


const RequireAuth = () => {
    checkToken().then(r => r)
};


export default RequireAuth;