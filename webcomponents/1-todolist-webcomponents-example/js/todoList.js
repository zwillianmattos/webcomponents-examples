class TodoList extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }



        .input-container {
          display: flex;
          margin-bottom: 20px;
        }

        .input-container input[type="text"] {
          flex: 1;
          padding: 10px;
          font-size: 16px;
          border: 2px solid #ccc;
          border-radius: 4px;
          transition: border-color 0.3s ease;
        }

        .input-container input[type="text"]:focus {
          border-color: #4CAF50;
        }

        .input-container button {
          padding: 10px 20px;
          background-color: #4CAF50;
          color: #fff;
          font-size: 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .input-container button:hover {
          background-color: #45a049;
        }

        .task {
          background-color: #f9f9f9;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      </style>
      <div class="container">
        <div class="input-container">
          <input type="text" id="taskInput" placeholder="Nova Tarefa">
          <button id="addTaskBtn">Adicionar</button>
        </div>
        <div id="todo-list"></div>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.taskInput = this.shadowRoot.getElementById('taskInput');
    this.addTaskBtn = this.shadowRoot.getElementById('addTaskBtn');
    this.todoList = this.shadowRoot.getElementById('todo-list');
    this.tasks = [];

    this.addTaskBtn.addEventListener('click', this.handleAddTask.bind(this));
  }

  handleAddTask() {
    const taskDescription = this.taskInput.value.trim();
    if (taskDescription !== '') {
      this.tasks.push(taskDescription);
      this.renderTasks();
      this.taskInput.value = '';
    }
  }

  renderTasks() {
    this.todoList.innerHTML = '';
    this.tasks.forEach(taskDescription => {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task');
      taskElement.textContent = taskDescription;
      this.todoList.appendChild(taskElement);
    });
  }
}

customElements.define('todo-list', TodoList);