function PageCss(name, env) {
  if (env !== 3000) {
    this.css = `https://apple-tart-01426.herokuapp.com/stylesheets/${name}.css`
  } else {
    this.css = `http://localhost:3000/stylesheets/${name}.css`
  }
}

module.exports = {
  PageCss
}