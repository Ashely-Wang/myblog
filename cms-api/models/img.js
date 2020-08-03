const fs = require('fs')
const buff = function(img) {
	return new Promise(function(res, rej) {
		var file = fs.readFile(img, function(err, data) {
			if (err) {
				rej(err)
			} else {
				res(data)
			}
		})
	})
}
exports.buff = buff
// var file = fs.readFile(img, 'binary', function(err,data) {
		// 	if (err) {
		// 		rej(err)
		// 	} else {
		// 		const buffer = new Buffer(data, 'binary')
		// 		const finalldata = buffer.toString('base64')
		// 		res(finalldata)
		// 		// res(data)
		// 	}
		// })