import { Task } from "../interfaces";
import api from "../plugins/axios";

class TodoService {
    async getTodoList(): Promise<Task[] | []> {
        try {
            const response = await api.get('');
            return <Task[]>response.data;
        } catch (error) {
            console.error(error);
        }
        return [];
    }

    async postTodo(task_name: string) {
        try {
            const response = await api.post('', JSON.stringify({ task_name }));
            console.log(response);
            return <Task>response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteTodo(id: number) {
        const deleteURL: string = `/${id}`;
        console.log(`deleteURL: ${deleteURL}`);
        try {
            const response = await api.delete(deleteURL);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async patchTodo(id: number, newIsDoneStatus: number) {
        const patchURL: string = `/${id}`;
        const stringfiedNewStatus = JSON.stringify({ isDone: newIsDoneStatus });

        try {
            const response = await api.patch(patchURL, stringfiedNewStatus);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new TodoService();
