class HeaderToDo extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #4CAF50;
          color: #fff;
          padding: 20px;
          text-align: center;
        }

        h1 {
          text-align: center;
          color: #333;
        }
      </style>
      <slot></slot>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('header-todo', HeaderToDo);