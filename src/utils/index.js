export function formatSeconds(seconds) {
  if (seconds < 60) {
    return "1分钟";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let result = "";
  if (hours > 0) {
    result += `${hours}小时`;
  }
  if (minutes > 0) {
    result += `${minutes}分钟`;
  }

  return result;
}

export function removeParenthesesContent(str) {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/[\(\（][^\)\）]*[\)\）]/g, "");
}

export function formatDistance(distance) {
  if (distance < 1000) {
    return `${distance}米`;
  }
  return `${(distance / 1000).toFixed(1)}公里`;
}