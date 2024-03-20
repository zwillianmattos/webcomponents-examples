import Task from './task.js';

export default class TodoList {
  
  constructor() {
    this.tasks = [];
  }

  addTask(description) {
    const task = new Task(description);
    this.tasks.push(task);
  }

  render() {
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = '';
    this.tasks.forEach(task => {
      const taskElement = task.render();
      todoListElement.appendChild(taskElement);
    });
  }
}