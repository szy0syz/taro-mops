export default (str, obj) => {
  if (str.length && str.length > 1) {
    return str.replace(/{([^{}]*)}/g,
      function (a, b) {
        var r = obj[b]
        return typeof r === 'string' || typeof r === 'number' ? r : a
      }
    )
  }
}