import md5 from "js-md5"

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

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

export const getParamsWithSignature = (params) => {
  let sig = "";
  let entries = Object.entries(params);

  // 签名格式：sig=MD5(请求参数键值对（按参数名的升序排序）+ 私钥)
  // 请求服务为“testservice”；请求参数分别为“a=23，b=12，d=48，f=8，c=67”；私钥为“bbbbb”
  // 则数字签名为：sig=md5(a=23&b=12&c=67&d=48&f=8bbbbb)
  entries.sort((a, b) => a[0].localeCompare(b[0]));
  entries.forEach(([key, value], index) => {
    sig += index === 0 ? `${key}=${value}` : `&${key}=${value}`;
  });

  console.log(sig, "sig");
  return { ...params, sig: md5(sig + SECRET_KEY) };
};