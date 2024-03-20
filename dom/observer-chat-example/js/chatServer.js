// Classe do Subject (Assunto)
class ChatRoom {
  constructor() {
    this.messages = [];
    this.observers = [];
  }

  // Adiciona um observador (usuário) ao chat
  addObserver(observer) {
    this.observers.push(observer);
  }

  // Remove um observador (usuário) do chat
  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  // Envia uma nova mensagem para o chat e notifica os observadores
  sendMessage(message, sender) {
    this.messages.push({ message, sender });
    this.notifyObservers();
  }

  // Notifica todos os observadores (usuários) sobre a nova mensagem
  notifyObservers() {
    this.observers.forEach(observer => {
      observer.update(this.messages);
    });
  }
}