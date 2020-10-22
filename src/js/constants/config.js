const NODE_ENV = process.env.NODE_ENV || 'development';

const NEWS_SERVER = NODE_ENV === 'development' ? 'https://newsapi.org/v2/everything?' : 'https://nomoreparties.co/news/v2/everything?';
const MY_SERVER = NODE_ENV === 'development' ? 'http://localhost:30000' : 'https://api.explorer-news.ml';

export const myServerConfig = {
  baseUrl: `${MY_SERVER}`,
  headers: {
    'Content-Type': 'application/json'
  }
}

export const newsServerConfig = {
  baseUrl: `${NEWS_SERVER}`,
  query: new URLSearchParams({
    q: word,
    apiKey: '8518cb97ba1c4acbbf21041a49a85093',
    from: date.toISOString().substr(0, 10),
    to: (new Date()).toISOString().substr(0, 10),
    pageSize: 100
  })
}


