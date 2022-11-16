class YapiParser {
  constructor(data) {
    this.source = data
  }
  parse(name) {
    const sourceList = name ? this.source.filter((item) => item.name == name) : this.source
    const apiList = sourceList.map(({ name, list }) => {
      return {
        name,
        apis: this.parseApi(list),
      }
    })
    return apiList
  }
  parseApi(list) {
    const parseBody = function ({ description, properties, required, items, type }) {
      if (type == 'object') {
        const _data = {}
        for (const key of Object.keys(properties)) {
          _data[key] = parseBody(properties[key])
        }
        return _data
      } else if (['array'].includes(type)) {
        return parseBody(items)
      } else if (['number', 'string', 'boolean'].includes(type)) {
        return {
          type,
          description,
        }
      }
    }
    const parseReqJSON = function ({ description, properties, required, items, type }) {
      if (type == 'object') {
        const _data = {}
        for (const key of Object.keys(properties)) {
          _data[key] = parseReqJSON(properties[key])
        }
        return _data
      } else if (['array'].includes(type)) {
        return parseReqJSON(items)
      } else if (['number', 'string', 'boolean'].includes(type)) {
        return {
          type,
          description,
        }
      }
    }
    const parseReqQuery = (list) => {
      const _data = {}
      list.forEach(({ name, required, description }) => {
        _data[name] = {
          type: 'string',
          required: required == 1,
          description,
        }
      })
      return _data
    }
    const apis = list.map(({ method, title, path, req_body_other, res_body, req_query }) => {
      const _resBody = JSON.parse(res_body)
      return {
        url: path,
        method,
        reqQuery: parseReqQuery(req_query),
        reqBody: parseReqJSON(JSON.parse(req_body_other)),
        resBody: parseBody(_resBody),
      }
    })
    return apis
  }
}

module.exports = YapiParser
