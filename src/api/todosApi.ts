import type { ITodos } from "@/types/ITodo";
import axios from "./index";

export async function getTodos(): Promise<ITodos[]> {
    try {
        const response = await axios.get<ITodos[]>(`/todos`);
        return response.data;
    } catch {
        return Promise.reject(new Error('Failed to fetch todos'));
    }
}

export async function getTodo(id: string): Promise<ITodos> {
    try {
        const response = await axios.get<ITodos>(`/todos/${id}`);
        return response.data;
    } catch {
        return Promise.reject(new Error('Failed to fetch todos'));
    }
}

export async function createTodo(payload: ITodos): Promise<ITodos> {
    try {
        const response = await axios.post<ITodos>(`/todos`, payload);
        return response.data;
    } catch {
        return Promise.reject(new Error('Failed to fetch todos'));
    }
}

export async function updateTodo(payload: ITodos): Promise<ITodos> {
    const { id } = payload
    try {
        const response = await axios.put<ITodos>(`/todos/${id}`, payload);
        return response.data;
    } catch {
        return Promise.reject(new Error('Failed to fetch todos'));
    }
}

export async function deleteTodo(id: string): Promise<ITodos> {
    try {
        const response = await axios.delete<ITodos>(`/todos/${id}`);
        return response.data;
    } catch {
        return Promise.reject(new Error('Failed to fetch todos'));
    }
}