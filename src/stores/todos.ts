
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from '@/api/todosApi'
import type { ITodos } from '@/types/ITodo'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: <ITodos[]>[],
    selectTodo: <ITodos>{},
    statuses: ['Pending', 'Doing', 'Done']
  }),
  actions: {
    async loadTodos() {
      const res = await getTodos()
      this.todoList = res
    },

    async loadTodo(id: string) {
      const res = await getTodo(id)
      this.selectTodo = res
    },

    async addTodo(payload: ITodos) {
      const res = await createTodo(payload)
    },

    async updateTodo(payload: ITodos) {
      const res = await updateTodo(payload)
    },

    async deleteTodo(id: string) {
      const res = await deleteTodo(id)
    }

  }
})
