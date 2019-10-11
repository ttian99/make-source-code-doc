var fs = require('fs');
var glob = require('glob');
var path = require('path');

function readFile(url) {
    let str = '';
    try {
        str = fs.readFileSync(url);
    } catch (error) {
        console.error('==> readFile error: ' + error.message);
        str = '';
    }
    return str;
}

function main() {
    var dir = './script/';
    var filePath = path.join(dir, '**/*.ts');
    console.log(filePath);
    glob(filePath,function (err, arr) {
        if (err) return console.error(err);
        console.log(JSON.stringify(arr));

        let data = '';
        for (let i = 0, len = arr.length; i < len; i++) {
            const url = arr[i];
            data += readFile(url);
        }
        // console.log(data);
        fs.writeFileSync('ydm.doc', data);
        console.log('==> over');
    })
}

main();