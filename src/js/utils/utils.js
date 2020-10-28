import { newsServerConfig, } from "../constants/config";
import { months, compOfTime } from '../constants/constants';


export function conversionDateForCard(data) {
  const date = new Date(data);
  const dateCard = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  const marginErr = 1;
  const monthAtribute = ((date.getMonth() + marginErr) < 10) ? '0' + (date.getMonth() + marginErr) : (date.getMonth() + marginErr);
  const dayAtribute = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
  const dateAtribute = `${date.getFullYear()}-${monthAtribute}-${dayAtribute}`
  return { dateCard, dateAtribute };
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
