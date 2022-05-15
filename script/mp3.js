/**
 * desc: base64对象转blob文件对象
 * @param base64  ：数据的base64对象
 * @returns {URL}：Blob文件对象
 */
function base64Blob(base64) {

    let base64_ARR = base64.split(',');
    let base64_data = base64_ARR[1];
    let format = base64_ARR[0].match(/:(.*?);/)[1];

    let bytes = window.atob(base64_data);
    let arrayBuffer = new ArrayBuffer(bytes.length);
    let uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < bytes.length; i++) {
        uint8Array[i] = bytes.charCodeAt(i);
    }

    let audioBlob  = new Blob([arrayBuffer], { type: format });

    return window.URL.createObjectURL(audioBlob);
}








/**
 * 
 * blob二进制 to base64
 **/
 function blobToDataURI(blob, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);
    }
    reader.readAsDataURL(blob);
}







// var audio = document.createElement("img");
// audio.id = 'imgId';
// audio.src = base64Blob(imgBase64);
// document.body.append(audio)





var audio = document.createElement("audio");
audio.id = 'audioId';
audio.src = base64Blob(mp3Base64);
audio.controls = true
document.body.append(audio)



function play() {
    console.log(audio)
    audio.play();
}

function pause() {
    audio.pause();
}

function stop() {
    audio.currentTime = 0;
    audio.pause();
    // 注意释放内存
    window.URL.revokeObjectURL(audio.src);
}

function skip() {
    audio.currentTime = 10;
    audio.play();
}


setTimeout(function(){
    window.URL.revokeObjectURL(audio.src);
    console.log('执行了')
},2000)

audio.addEventListener("canplay", () => {
    console.log('加载完毕')
});