#!/bin/bash

# find ../live2d-model -name "*.model.json"


# 格式化json文件
jsonFormat(){
    local paths=$1
    local bak='./model.bak'
    cp -r "$paths" $bak
    cat $bak | python -mjson.tool > "$paths"
    rm $bak
}







# 获取index.json配置数据
getFliePath(){
    local data=''
    local json=$1
    local path=(${json//\//\ })
    local len="${#path[*]}-1"
    len=$(( $len ))
    path=${path[$len]}
    path=${json//${path}/}
    

    arr=(moc png mtn json mp3)
    for name in ${arr[*]};do
        data="$data \n$(sed -n '/\.'$name'/p' $json)"
    done

    data=$(echo -e "$data"|sed '/"name"/d')
    data="$(echo -e "$data")"
    data="${data//\"/}"
    data="${data//\{/}"
    data="${data//\}/}"
    data="${data//\]/}"
    data="${data//\[/}"
    data="${data//\:/\\n}"
    data="${data//\,/\\n}"
    data="${data//motions\/\.\.\//}"
    data="${data//expressions\/\.\.\//}"
  
    

    local jsonData=$(echo -e "$data")
    data=''
    for name in ${arr[*]};do
        data="$data \n$(echo "$jsonData"|sed -n '/\.'$name'/p')"
    done
    
    data=$(echo -e "$data") 
    data=${data//\_\ /\_\*}
    # echo "$data"   
    for name in $(echo -e "$data"|sort|uniq);do
        name="$path$name" 
        name=${name//\/\//\/}
        if ! test -e $name; then
            echo "文件不存在: $name"
        else
            json="$json\n$name"
        fi
        
        
    done
    
    echo -e "$json"


}




getIndexData(){
    
    jsonPath=$(find ./model -name "*.model.json"|sort|uniq)
    
    for paths in $(echo -e "$jsonPath");do
        # getFliePath $paths >> ./data.json
        # echo 'END' >> ./data.json
        # jsonFormat "$paths"
        getFliePath $paths
        echo 'END'
        
    done

    # echo "处理结束!"

}



getIndexData




















