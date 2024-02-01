import { ITask } from "./types/tasks";

const baseUrl = "http://localhost:3001";
export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
  const todos = await res.json();
  return todos;
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const newTodo = await response.json();
  return newTodo;
};

export const editTodo = async (todo: ITask): Promise<ITask> => {
  const response = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: "PUTi",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const updatedTodo = await response.json();
  return updatedTodo;
};
