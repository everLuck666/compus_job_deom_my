export function time(date) {
  if (date) {
    date = new Date(date);
  }
  //当前的时间
  let currentDate = new Date();
  //与当前时间的日期间隔
  let timeInterval = currentDate.getDate() - date.getDate();
  //星期数组
  let weekdays = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ];
  //时间范围
  let timeRange = '上午';
  if (date.getHours() > 12) {
    timeRange = '下午';
  }
  //如果与当前时间同日
  if (
    date.getMonth() == currentDate.getMonth() &&
    date.getDate() == currentDate.getDate()
  ) {
    return `${timeRange} ${date.getHours()}:${date.getMinutes()}`;
  }
  //在当前时间同一年且日期间隔在7天内
  if (
    date.getFullYear() == currentDate.getFullYear() &&
    timeInterval <= 6 &&
    timeInterval >= 1
  ) {
    //当前时间的前一天
    if (timeInterval == 1) {
      return `昨天 ${timeRange} ${date.getHours()}:${date.getMinutes()}`;
    } else {
      return `${
        weekdays[date.getDay()]
      } ${timeRange} ${date.getHours()}:${date.getMinutes()}`;
    }
  }
  //如果日期超过7天
  else
    return `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()} ${timeRange}  ${date.getHours()}:${date.getMinutes()}`;
}
