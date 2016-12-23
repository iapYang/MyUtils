var fs = require('fs');
var util = require('util');
var xlsx = require('node-xlsx');

var obj = xlsx.parse(fs.readFileSync(__dirname + '/Cheveron_IDV_Data.xlsx')); // parses a buffer
var data = obj[0].data.slice(1);

var pre_mood, pre_outfit;
var index_mood = -1,
    index_outfit = -1;

var result = {};

var xlsx_data = [];


data.forEach(function(item) {
    for (var j = 0; j < item.length - 1; ++j) {
        if (!xlsx_data[j]) xlsx_data[j] = [];
        xlsx_data[j].push([item[0], item[j + 1]]);
    }
});

console.log(xlsx_data);

console.log(util.inspect(result, {
    depth: null,
    colors: true
}));

fs.writeFile('data.json', JSON.stringify(xlsx_data), 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
});
