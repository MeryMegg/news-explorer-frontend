import { newsServerConfig } from "../constants/config";

function getDate() {
  const lengthPeriod = newsServerConfig.days * 60 * 60 * 1000;
  const toDate = new Date().toISOString();
  const fromDate = (startDate.getTime() - lengthPeriod).toISOString();
  return { fromDate, toDate }
}

function getQuery(keyWord) {
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

export { getQuery, getDate };