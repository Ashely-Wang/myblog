var  fs=require("fs")
var file=fs.createReadStream('./uploads/avatar-1593577052392brdnk-vision-h-fpMDENzjk-unsplash.jpg')
  file.on('data', function(data) {
	console.log(data)
})
