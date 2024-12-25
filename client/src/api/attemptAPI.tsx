import { AttemptAdd } from "../interfaces/AttemptData.js";

const addAttempt = async (body: AttemptAdd) => {
    try{
        const response = await fetch(
            '/api/attempts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }
        )
        const data = await response.json();
        if(!response.ok){
            throw new Error('Invalid API response. Check your network tab!')
        }
        return data;
    }catch(err){
        console.log('Error from creating the attempt: ', err);
        return Promise.reject('Could not create an attempt.');
    }
}

export { addAttempt };