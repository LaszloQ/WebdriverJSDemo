function baseUrl( path ) {
  return "http://demoqa.com" + path
}

function today() {
  var d = new Date();
  var n = d.getDate();
  var m = d.getMonth();
  var y = d.getFullYear();
  return [n, m + 1, y];
}

module.exports = {
  today,
  baseUrl
}
