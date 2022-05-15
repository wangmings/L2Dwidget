const fs = require('fs')
const { execSync } = require('child_process');




/**
 * [Uint8ArrayString 读取文件数据并转换成[Uint8Array]的字符串]
 * @param {[type]} filePath [文件路径]
 */
function uint8ArrayString(filePath){
    let buffer = fs.readFileSync(filePath)
    let uint8_array = new Uint8Array(buffer);
    return `[${uint8_array.toString()}]`;
}



/**
 * [getArrayBuffer 转换字符串[Uint8Array]类型成ArrayBuffer]
 * @param  {[string]} uint8ArrayData [字符串类型的:Uint8Array数据]
 * @return {[ArrayBuffer]}                [description]
 */
function getArrayBuffer(uint8ArrayData){
    eval(`uint8ArrayData = ${uint8ArrayData}`);
    let uint8_array = Uint8Array.from(uint8ArrayData);
    return uint8_array.buffer;   
}



/**
 * [testUint8Array 测试Uint8Array数据是否正确]
 * @param  {[bytes]} buffer [buffer数据]
 * @return {[type]}        [description]
 */
function testUint8Array(buffer){
    let enc = new TextDecoder("utf-8");
    let bytes = new Uint8Array(buffer);
    console.log(enc.decode(bytes))
}







/**
 * 异步读取文件
 * @param  {[type]} filePath [description]
 * @param  {String} encoding [description]
 * @return {[type]}          [description]
 */
function read(filePath, encoding = 'utf8'){
    if(encoding == 'buffer') encoding = '';
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath, encoding, (err,data) => {
            if(err){
                console.log('读取文件错误: ',err);
            }else{
                resolve(data)
            }
        })
    })
}






/**
 * [getBase64 将图片转换成base64数据]
 * @param  {[type]} filePath [description]
 * @return {[type]}          [description]
 */
function getBase64(filePath){
    let format;
    let fileName = filePath.split('.');
    let fileType = fileName[ fileName.length - 1 ];
    if(fileType == 'png' || fileType == 'jpg'){
        format = "data:image/[fileType];base64,[base64Data]";
    }else if(fileType == 'mp3' || fileType == 'wav'){
        format = "data:application/[fileType];base64,[base64Data]";
    }
    let bitmap = fs.readFileSync(filePath);
    let base64 = Buffer.from(bitmap, 'binary').toString('base64'); // base64编码
    return format.replace('[fileType]',fileType).replace('[base64Data]',base64);
}









// let data = getBase64('./1.mp3')
// // console.log(data)


// writeFileData('./mp3Base64.js',`
//     let mp3Base64 = "${data}";
// `)



let data = getBase64('./2.jpg')
// console.log(data)


writeFileData('./imgBase64.js',`
    let imgBase64 = "${data}";
`)










/**
 * [writeFileData 文件写入]
 * @param  {[type]} filePath [description]
 * @param  {[type]} data     [description]
 * @return {[type]}          [description]
 */
function writeFileData(filePath,data){
    fs.writeFile(filePath, data, err => { if(err) console.log('写入文件错误: ',err)})
}




/**
 * shell [shell命令]
 * @param  {[cmd]}
 * @param  {Boolean}
 * @return {[type]}
 */
function exeShell(cmd, log = false) {
    if (cmd.constructor === Array) {
        let _cmd = ''
        cmd.forEach((s) => { _cmd += s +' '})
        cmd = _cmd
    }

    try{
        return execSync(cmd,{shell:'/bin/bash',maxBuffer:2048*1024,encoding:'utf-8'});
    } catch (err) {
        console.log(err)
    }


}





module.exports = { 
    uint8ArrayString:uint8ArrayString,
    getArrayBuffer:getArrayBuffer,
    testUint8Array:testUint8Array,
    writeFileData:writeFileData,
    getBase64:getBase64,
    exeShell:exeShell
}






















