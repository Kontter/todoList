export interface IData {
  todoList: ITodo[];
  cartTodoList: ITodo[];
  filter: string;
  completedTasks: number;
  uncompletedTasks: number;
  allTasks: number;
  cartTasks: number;
  isAuth: boolean
}

export interface ITodo {
  id: number,
  text: string,
  isComlpeted: boolean
}