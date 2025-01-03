//add register and login API calls -dylan
import type { UserLogin } from '../interfaces/UserLogin';
import type { UserRegister } from '../interfaces/UserRegister';

const login = async (userInfo: UserLogin) => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('User information not retrieved, check network tab!');
        }
        return data;
    } catch (err) {
        console.log('Error from user login: ', err);
        return Promise.reject('Could not fetch user info');
    }
};

const register = async (userInfo: UserRegister) => {
    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('User information not retrieved, check network tab!');
        }
        return data;
    } catch (err) {
        console.log('Error from user register: ', err);
        return Promise.reject('Could not fetch user info');
    }
};

export { login, register };