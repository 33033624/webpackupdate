var walkSync = require('walk-sync')
var fs = require('fs')

function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var getEntrys = function (path) {
    var files = walkSync(path, { globs: ['**/**/index.js'] })
    var res = {}, key
    files.forEach(function (cur) {
      var temp = cur.split('/')
      key = temp[0]
      if (temp[2]) key += '_' + temp[1]
    //   if (temp[2]) key += jsUcfirst(temp[1])
      res[key] = path + '/' + cur
    })
    return res
}

var setPageUrl = function (json) {
    var temp = []
    var jsonKeyArr = Object.keys(json)
    jsonKeyArr.forEach(function (cur) {
        var jsonVal = json[cur]
        temp.push(`let ${cur} = '${jsonVal}';\n`)
    })
    var exportStr = jsonKeyArr.join(',')
    temp.push(`export { ${exportStr} }`)
    var str = temp.join(' ')
    // var str = 'let pageUrl = ' + JSON.stringify(json) + '; export default pageUrl'
    fs.writeFile('./src/conf/pageUrl.conf.js', str, 'utf8', (err) => {
        if (err) throw err;
        console.log('pageUrl saved!');
    })
}

module.exports = {
    getEntrys: getEntrys,
    setPageUrl: setPageUrl
}
