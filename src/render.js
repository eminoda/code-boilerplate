const Mustache = require('mustache')
const fs = require('fs')
const path = require('path')

module.exports = {
  renderList(view) {
    console.log(view)
    const template = fs.readFileSync(path.join(__dirname, '../vue2-element/list.vue')).toString()
    return Mustache.render(template, view)
  },
}
