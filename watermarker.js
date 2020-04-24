var gm = require('gm').subClass({imageMagick: true})
var data = require('./data.json')

async function readData() {
  let promises = []
  data.forEach((item) => {
    item = new Promise((resolve, reject) => {
      gm(`./images/${item.src}`)
        .borderColor('#dfeffc')
        .border(0, 65)
        .background('#dfeffc')
        .out('-gravity', 'SouthWest')
        .out('-splice', '65x48')
        .out('-gravity', 'SouthEast')
        .out('-splice', '65x48')
        .draw(['gravity SouthEast image Over 170,110 0,0 "./assets/ig-logo.png"'])
        .fontSize(15)
        .out('-gravity', 'SouthWest')
        .out('-size', '650x', `caption: ${item.caption}`)
        .out('-geometry', '+70+110')
        .out('-composite')
        .drawText(75, 110, "/Nepal.Smiles", "SouthEast")
        .fill("#ffffff")
        .drawText(80, 170, "© Nepal Smiles", "SouthEast")
        .write(`./output/${item.src}`, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve('done');
        }
      })
    })
    promises.push(item)
  })
  let result = await Promise.all(promises)
  console.log(result)
}

readData()