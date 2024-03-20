export default class Task {
  constructor(description, todoList) {
    this.todoList = todoList;
    this.description = description;
  }

  render() {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.textContent = this.description;
    return taskElement;
  }
}