import Vue from "vue";
Vue.prototype.$imgPath =
  process.env.NODE_ENV == "production"
    ? "https://api.atyourway.com/" + "storage/images/"
    : "http://localhost:8000/" + "storage/images/";
Vue.prototype.$getItem = function (item, parse = true) {
  let data = localStorage.getItem(item);
  if (parse) {
    data = JSON.parse(data);
  }
  return data;
};
Vue.prototype.$setItem = function (name, item, stringify = true) {
  localStorage.setItem(name, stringify ? JSON.stringify(item) : item);
};
Vue.prototype.$randomColor = function () {
  var letters = "01233456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
function isURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" // query string
  ); // fragment locator
  return !!pattern.test(str);
}
Vue.prototype.$getUrl = function (url, id) {
  if (typeof url === "object" && (url instanceof File || url instanceof Blob)) {
    var fr = new FileReader();
    fr.onload = function (event) {
      document.getElementById(id).src = event.target.result;
    };
    fr.readAsDataURL(url);
  }
  if (isURL(url)) {
    return url;
  } else {
    return Vue.prototype.$imgPath + url;
  }
};

Vue.prototype.$getRgba = function (color, opacity = "0.9") {
  let result = this.$vuetify.theme.themes.light.primary;
  if (color[0] == "#") {
    color = hexToRgb(color);
  }
  if (color && color.indexOf("a") == -1) {
    result = color.replace(")", `, ${opacity})`).replace("rgb", "rgba");
  }
  return result;
};
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16
      )})`
    : null;
}

Vue.prototype.$subStr = function (str, len) {
  if (str) {
    if (str.length <= len) {
      return str;
    } else {
      return str.substr(0, len) + "...";
    }
  }
  return "";
};
Vue.prototype.$rand = function () {
  return Math.random();
};
Vue.prototype.$objectToFormData = function (
  obj,
  form = null,
  namespace = null
) {
  let fd = form || new FormData();
  let formKey;

  for (let property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      if (namespace) {
        formKey = namespace + "[" + property + "]";
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (Array.isArray(obj[property])) {
        fd.append(formKey, JSON.stringify(obj[property]));
      } else if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File) &&
        !(obj[property] instanceof Blob)
      ) {
        if (obj[property] == null) {
          fd.append(formKey, "");
        }
        Vue.prototype.$objectToFormData(obj[property], fd, property);
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property] || "");
      }
    }
  }
  return fd;
};
