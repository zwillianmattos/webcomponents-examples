// Classe do Observer (Observador)
class User {
  constructor(name) {
    this.name = name;
    this.lastDisplayedMessageIndex = -1; // Inicia com -1 para indicar que nenhuma mensagem foi exibida ainda
  }

  update(messages) {
    const chatElement = document.getElementById('chat');
    messages.slice(this.lastDisplayedMessageIndex + 1).forEach(msg => {
      const messageHTML = `<p><strong>${msg.sender}:</strong> ${msg.message}</p>`;
      chatElement.insertAdjacentHTML('beforeend', messageHTML);
      if (msg.sender !== this.name) {
        this.showToast(msg.sender, msg.message);
      }
    });
    this.lastDisplayedMessageIndex = messages.length - 1; // Atualiza o índice da última mensagem exibida
  }

  showToast(sender, message) {
    Toastify({
      text: `New message from ${sender}: ${message}`,
      className: "info",
    }).showToast();
  }
}