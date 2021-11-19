// returns a date string in yyyy-mm-dd format
export function dateString(date) {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

// returns a time string in hh:mm format
export function timeString(date) {
  let hour = date.getHours().toString();
  let minute = date.getMinutes().toString();
  if (hour.length < 2) hour = '0' + hour;
  if (minute.length < 2) minute = '0' + minute;
  return [hour, minute].join(':');
}
