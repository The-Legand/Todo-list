import {atom} from 'jotai';

const refreshTasksAtom = atom(0);
export const tasksAtom = atom(async(get)=>{
    get(refreshTasksAtom);
    try{
        const response = await fetch('http://localhost:4000/');
        if(!response.ok) throw new Error('Failed to fetch tasks');
        return await response.json()
    }
    catch(error){
        console.error(error);
        throw new Error(error.message)
    }
})

export const triggerTaskRefreshAtom = atom(null, (get, set)=>{
    set(refreshTasksAtom, (n) => n+1);
})