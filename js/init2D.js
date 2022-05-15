
// bugs = true;

const node = function(nodeName) {
    return document.querySelectorAll(nodeName);
}


const loadModes = function(index){
    
    if(index > Object.keys(model_data).length){
        index = 0;
        console.log('索引超出范围了!')
    }else{
        index = `model_${index}`;
        const ModelData = model_data[index];
        const script = document.createElement("script");
        script.id = 'models';
        script.src = ModelData['js'];
        document.body.appendChild(script);

        setTimeout(function() {
            document.body.removeChild(node('#models')[0])
            eval(ModelData['funs'])
            
            loadlive2d({
                modelConfig:{
                    modelPath: ModelData['url'],
                    canvasID: "live2d",
                    width: 400,
                    height: 600,
                    enlarge: 1,
                    bottom: 12
                }
            });
            console.log('加载模型成功了')

        }, 600)
        
    }
    
    
}














































