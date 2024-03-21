class NewsHeader extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    
    const title = this.getAttribute('title');
    const header = document.createElement('header');
    header.innerHTML = `
      <h1>${title}</h1>
    `;

    const style = document.createElement('style');
    style.textContent = `
      h1 {
        color: #333;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(header);
  }
}

class NewsNavbar extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const nav = document.createElement('nav');
    nav.innerHTML = `
      <ul>
        <slot></slot>
      </ul>
    `;

    shadow.appendChild(nav);
  }
}

class NewsNavItem extends HTMLElement {
  connectedCallback() {
    const { source, author, title, description, url, urlToImage, publishedAt } = this.dataset;
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `

    .card {
      width: 250px; /* Definindo a largura dos cards para ocupar 1/3 do container */
      margin-bottom: 20px;
      border-radius: 5px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      
    }
    
    .card img {
      width: 100%;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    
    .card-content {
      padding: 10px;
    }
    
    .card-content h2 {
      margin-top: 0;
      font-size: 18px;
    }
    
    .card-content p {
      font-size: 14px;
      color: #555;
    }
    `;
    const nav = document.createElement('div');
    nav.innerHTML = `
    <div class="card">
      <img src="${urlToImage}" alt="${title}">
      <div class="card-content">
        <h2>${title}</h2>
        <p>${description}</p>
        <a href="${url}" target="_blank">Read more</a>
      </div>
    </div>
  `;

    shadow.appendChild(style);
    shadow.appendChild(nav);
  }
}

class NewsFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <p>&copy; ${new Date().getFullYear()} News App. All rights reserved.</p>
      </footer>
    `;
  }
}

class NewsContent extends HTMLElement {
  async connectedCallback() {
    try {
      const shadow = this.attachShadow({ mode: 'open' });
      const response = await fetch('https://newsapi.org/v2/everything?q=Bauru&apiKey=2eb849c122b546d3929678e27a902aa6');
      const data = await response.json();
      
      const style = document.createElement('style')
      style.textContent = `
      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between; /* Para garantir que os cards se distribuam uniformemente */
        padding: 20px;
      }`
      const div = document.createElement('div');
      div.classList.add('container');
      if (data.status === 'ok') {
        const articles = data.articles;
        articles.forEach(article => {
          const newsItem = document.createElement('news-navitem');
          newsItem.dataset.source = article.source.name;
          newsItem.dataset.author = article.author;
          newsItem.dataset.title = article.title;
          newsItem.dataset.description = article.description;
          newsItem.dataset.url = article.url;
          newsItem.dataset.urlToImage = article.urlToImage;
          newsItem.dataset.publishedAt = article.publishedAt;
          div.appendChild(newsItem);
        });
        
      } else {
        console.error('Erro ao obter notícias:', data.message);
      }

      shadow.appendChild(style);
      shadow.appendChild(div);
    } catch (error) {
      console.error('Erro ao obter notícias:', error);
    }
  }
}

customElements.define('news-content', NewsContent);
customElements.define('news-header', NewsHeader);
customElements.define('news-navbar', NewsNavbar);
customElements.define('news-navitem', NewsNavItem);
customElements.define('news-footer', NewsFooter);