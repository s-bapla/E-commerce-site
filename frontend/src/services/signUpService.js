import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/users';

const signUp = async (data) => {
    const user = await axios.post(baseUrl, data)
    return user.data
}

export default {signUp}