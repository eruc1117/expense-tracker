function PageCss(name) {
  this.view = name
}

PageCss.prototype.cssStyle = function () {
  return `http://localhost:3000/stylesheets/${this.view}.css`
}
module.exports = {
  PageCss
}