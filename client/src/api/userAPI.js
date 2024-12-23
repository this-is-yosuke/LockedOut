import Auth from '../utils/auth';
const retrieveUsers = async () => {
    try {
        const response = await fetch('/api/users', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Player ${Auth.getToken()}` // passing authorization token
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Invalid user API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval:', err);
        return [];
    }
};
export { retrieveUsers };
//Auth
