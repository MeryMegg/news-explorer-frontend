import { newsServerConfig, } from "../constants/config";
import { months, compOfTime } from '../constants/constants';


export function conversionDateForCard(data) {
  const date = new Date(data);
  const dateCard = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  return { dateCard };
}

export function getDate() {
  const lengthPeriod = newsServerConfig.days * compOfTime.min * compOfTime.sec * compOfTime.ms;
  const currentDate = new Date();
  const toDate = currentDate.toISOString();
  const fromDate = new Date(currentDate.getTime() - lengthPeriod).toISOString();
  return { fromDate, toDate }
}

export function getQuery(keyWord) {
  const query = new URLSearchParams({
    q: keyWord,
    from: getDate().fromDate,
    to: getDate().tromDate,
    language: newsServerConfig.language,
    pageSize: newsServerConfig.pageSize,
    apiKey: newsServerConfig.apiKey
  })
  return query.toString();
}

export function enumerate(num, arr) {
  if (num > 100) num = num % 100;
  if (num <= 20 && num >= 10) return arr[2];
  if (num > 20) num = num % 10;
  return num === 1 ? arr[0] : num > 1 && num < 5 ? arr[1] : arr[2];
}

export const sortKeyWords = (articles) => {
  const repeatCount = articles.map((article) => article.keyword).reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  const keysSorted = Object.keys(repeatCount).sort(function (a, b) { return repeatCount[b] - repeatCount[a] })
  return keysSorted;
};
