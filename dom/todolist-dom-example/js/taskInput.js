export default class TaskInput {
  constructor(todoList) {
    this.todoList = todoList;
    this.taskInput = document.getElementById('taskInput');
    this.addTaskBtn = document.getElementById('addTaskBtn');
    this.addTaskBtn.addEventListener('click', this.handleAddTask.bind(this));
  }

  handleAddTask() {
    const taskDescription = this.taskInput.value.trim();
    if (taskDescription !== '') {
      this.todoList.addTask(taskDescription);
      this.todoList.render();
      this.taskInput.value = '';
    }
  }
}