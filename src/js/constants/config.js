
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
  apiKey: '8518cb97ba1c4acbbf21041a49a85093',
  pageSize: 100,
  language: 'ru',
  sortBy: 'popularity',
  days: 7
}



