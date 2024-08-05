// 一律经度在前 纬度在后
export function generateRandomLngLatData(count) {
  // Helper function to generate random longitude and latitude within China
  function getRandomLngLat() {
    const minLng = 73.5;
    const maxLng = 135.0;
    const minLat = 18.0;
    const maxLat = 53.5;

    const lng = (Math.random() * (maxLng - minLng) + minLng).toFixed(6);
    const lat = (Math.random() * (maxLat - minLat) + minLat).toFixed(6);

    return [parseFloat(lng), parseFloat(lat)];
  }

  // Generate the random data
  const data = [];
  for (let i = 0; i < count; i++) {
    const entry = {
      lnglat: getRandomLngLat(),
    };
    data.push(entry);
  }

  return data;
}

/**
 * Format position to specified type.
 * @param {Object|Array} position - The position to format. Can be an object {lng, lat} or an array [lng, lat].
 * @param {string} type - The type of return value. Can be "array" or "object".
 * @returns {Object|Array} The formatted position.
 */

export function getFormatPosition(position, type) {
  let lng, lat;

  if (Array.isArray(position)) {
    [lng, lat] = position;
  } else if (typeof position === "object" && position !== null) {
    ({ lng, lat } = position);
  } else {
    throw new Error("Invalid position format. Expected an array or an object.");
  }

  if (type === "array") {
    return [lng, lat];
  } else if (type === "object") {
    return { lng, lat };
  } else {
    throw new Error('Invalid type. Expected "array" or "object".');
  }
}

export function getPointsCenter(points) {
  var point_num = points.length; //坐标点个数
  var X = 0,
    Y = 0,
    Z = 0;
  for (let i = 0; i < points.length; i++) {
    if (points[i] == "") {
      continue;
    }
    let point = points[i];
    var lat, lng, x, y, z;
    lat = (parseFloat(point[1]) * Math.PI) / 180;
    lng = (parseFloat(point[0]) * Math.PI) / 180;
    x = Math.cos(lat) * Math.cos(lng);
    y = Math.cos(lat) * Math.sin(lng);
    z = Math.sin(lat);
    X += x;
    Y += y;
    Z += z;
  }
  X = X / point_num;
  Y = Y / point_num;
  Z = Z / point_num;

  var tmp_lng = Math.atan2(Y, X);
  var tmp_lat = Math.atan2(Z, Math.sqrt(X * X + Y * Y));

  return [(tmp_lng * 180) / Math.PI, (tmp_lat * 180) / Math.PI];
}

export function getLocation(timeout) {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      console.log("getLocation1");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("浏览器定位成功");
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("浏览器定位失败");
          reject(error.message);
        },
        { timeout }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
}
