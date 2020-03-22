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
        .draw(['gravity SouthWest image Over 65,40 0,0 "./assets/logo1.jpg"'])
        .draw(['gravity SouthWest image Over 480,20 0,0 "./assets/logo2.jpg"'])
        .draw(['gravity SouthEast image Over 170,110 0,0 "./assets/ig-logo.png"'])
        //.out('-size', '400x', item.caption)
        //.out('-gravity', 'SouthWest')
        //.out('-composite')
        .fontSize(15)
        .drawText(70, 130, item.caption, "SouthWest")
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