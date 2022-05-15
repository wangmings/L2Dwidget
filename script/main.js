
let { uint8ArrayString, writeFileData, getBase64, exeShell } = require('./buffer')






function getObjName(path){
    let paths,path_1,path_2,name,format;
    paths = path.split('/')
    path_1 = paths[paths.length - 2]
    path_2 = paths[paths.length - 1]
    name = `__${path_1}__${path_2}`
    name = name.replaceAll('.','___')
    name = name.replaceAll('-','____')
    name = name.replaceAll('*','__')
    path_2 = path_2.split('.')
    format = path_2[path_2.length - 1]
    // console.log(name,format)
    return [format,name]

}




function modelFile(filePath,data){
    let funs = filePath.split('/')[2].split('.')[0];
    writeFileData(filePath, `
        function ${funs}(key){

            let model = {
                ${data}
            }
          
            return model[key];
        }
    `);

    
}





function modelData(){
    
    let [paths,name, data,jsonData] = ['','','',''];
    let [modelPath, modelConfig, model_data_json, ] = ['','',''];
    
    jsonData = exeShell('bash ./json.sh')
    jsonData = jsonData.split('END');

    let num = 0;
    for (let i = 0; i < jsonData.length; i++) {
        num  = 0;
        model_data_json = '';
        jsonData[i].split('\n').forEach((path) => {
            if(path.length > 0){
                if(num == 0){
                    num = 1;
                    modelPath = path;
                }
                name = getObjName(path)
                path = path.replaceAll('*',' ')
                data = (name[0] == 'png'||name[0] == 'mp3') ? getBase64(path) : uint8ArrayString(path);
                model_data_json += `\n${name[1]}: "${data}", `;
                
            }
        })

        if(model_data_json.length > 2){

            paths = `../model/model_${i+1}.js`
            modelConfig += `\nmodel_${i+1}: { funs: "loadModelData=model_${i+1}", js: "./model/model_${i+1}.js", url: "${modelPath}"}, `;
            model_data_json = model_data_json.replace(/(\s|,)+$/g, '');
            modelFile(paths,model_data_json)
        }

    }

    modelConfig = modelConfig.replace(/(\s|,)+$/g, '');
    modelConfig = `
        let model_data = {
            ${modelConfig}
        }
    `;

    writeFileData('../data/model.js',modelConfig);



    

    
}


console.log('开始处理数据请稍等..........!')
modelData()

console.log('处理数据结束!')



































