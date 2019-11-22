var fs = require('fs');
var glob = require('glob');
var path = require('path');

function readFile(url) {
    let str = '';
    try {
        str = fs.readFileSync(url, { encoding: 'utf8' });
    } catch (error) {
        console.error('==> readFile error: ' + error.message);
        str = '';
    }
    return str;
}

function main() {
    var config = fs.readFileSync('config.json', { encoding: 'utf8' });
    var cfg = JSON.parse(config);
    var filePath = path.join(cfg.src, cfg.reg);
    console.log(filePath);
    glob(filePath, function (err, arr) {
        if (err) return console.error(err);
        console.log('len = ' + arr.length);

        let data = '';
        for (let i = 0, len = arr.length; i < len; i++) {
            const url = arr[i];
            data += readFile(url);
        }
        var outFile = path.join(cfg.dest, "源代码.doc");
        fs.writeFileSync(outFile, data, { encoding: 'utf8' });
        console.log('==> over');
    })
}

main();