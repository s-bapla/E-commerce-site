import axios from 'axios';

const baseUrl = '/api/users';

const signUp = async (data) => {
    const user = await axios.post(baseUrl, data)
    return user.data
}

export default {signUp}