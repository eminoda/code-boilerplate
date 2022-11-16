const fs = require('fs')
const path = require('path')
const YapiParser = require('../src/YapiParser')
const render = require('../src/render')

const source = fs.readFileSync(path.join(__dirname, '../res/api.json'))
const yapiParser = new YapiParser(JSON.parse(source.toString()))

const apiList = yapiParser.parse('测试')

const api = apiList[0].apis[0]

const queryParamsMap = api.method == 'GET' ? api.reqQuery : Object.assign(api.reqBody, api.reqQuery)
const templateResult = render.renderList({
  queryParams: Object.keys(queryParamsMap).map((name) => {
    return {
      name,
      type: queryParamsMap[name].type,
      description: queryParamsMap[name].description || name,
    }
  }),
  columns: Object.keys(api.resBody.data.rows)
    .map((key) => {
      const { type, description } = api.resBody.data.rows[key]
      return {
        type,
        label: description,
        key,
        // column_default: true,
        column_formatter: true,
      }
    })
    .concat([
      {
        column_action: true,
        key: 'action',
      },
    ]),
  title: 'abc',
  url: api.url,
  method: api.method,
})

fs.writeFileSync(path.join(__dirname, '../test.vue'), templateResult)
