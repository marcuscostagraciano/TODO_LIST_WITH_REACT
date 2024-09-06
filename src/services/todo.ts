import { Task } from "../interfaces";
import api from "../plugins/axios";

class TodoService {
    async getTodoList() {
        try{
            const response = await api.get('');
            return <Task[]>response.data;
        }catch(error){
            console.error(error);
        }
    }
    async postTodo(task_name: string) {
        const postURL: string = `?task_name=${task_name}`;
        console.log(`postURL: ${postURL}`);
        try{
            const response = await api.post(postURL);
            console.log(response);
            return response.data;
        }catch(error){
            console.error(error);
        }
    }
    async deleteTodo(id: number) {
        const deleteURL: string = `?id=${id}`;
        console.log(`deleteURL: ${deleteURL}`);
        try{
            const response = await api.delete(deleteURL);
            console.log(response);
            return response.data;
        }catch(error){
            console.error(error);
        }
    }
    async patchTodo(id: number, newIsDoneStatus: boolean) {
        const patchURL: string = `?id=${id}&isDone=${newIsDoneStatus}`;
        console.log(`patchURL: ${patchURL}`);
        try{
            const response = await api.delete(patchURL);
            return response.data;
        }catch(error){
            console.error(error);
        }
    }
}

export default new TodoService();
