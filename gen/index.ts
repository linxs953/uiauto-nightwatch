import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "fs"
import { importStep, sceneExport, stepObject } from "./template/scene"
import { stepClick, stepFunc, stepSendKey } from "./template/step"


// 封装生成文件的操作
function write(path_:string,filename:string,data:string) {
    if (!existsSync(path_)) {
        mkdirSync(path_)
    }
    writeFileSync(`${path_}/${filename}.ts`,data)
}

function mkdir(dirName:string) {
    try{
        mkdirSync(dirName)
    } catch(err) {
        console.log(`make dir error: ${JSON.stringify(err)}`)
    }
}

function generate(scene:any) {
    if (!existsSync("./src/steps")) {
        mkdir("./src/steps")
    }
    if (!existsSync("./src/scene")) {
        mkdir("./src/scene")
    }
    // 处理模板数据生成
    let sceneExportStr = sceneExport.replace(/\$dataSourceName/g,`${scene.sceneName}_data`)
    let importStr = ""
    let allStepsStr = ""
    sceneExportStr = sceneExportStr.replace(/\$scene/g,scene.sceneName)
    sceneExportStr = sceneExportStr.replace(/\$dataName/g,scene.dataId)
    for (let st of scene.steps) {
        let stepFuncStr = stepFunc.replace(/\$pageName/g,st.pageKey)
        stepFuncStr = stepFuncStr.replace(/\$functionName/g, st.stepName)
        if (!st.navigate) {
            // 不需要跳转页面，去除nagigate语句
            stepFuncStr = stepFuncStr.replace(`${st.pageKey}.navigate()`,"")   
        }

        let actions = ""

        for (let action of st.actions) {
            switch(action.operation) {
                case "click": {
                    actions += stepClick.replace(/\$pageName/g,st.pageKey)
                                        .replace(/\$target/g,action.target)
                    break
                }
                case "sendKey":  {
                    actions += stepSendKey.replace(/\$pageName/g,st.pageKey)
                                          .replace(/\$target/g,action.target)
                                          .replace(/\$value/g,`"${action.value?action.value:""}"`)
                    break
                }
            }

            if (action.wait) {
                actions = actions.replace("$timeout",action.wait)
            } else {
                actions = actions.replace(".pause($timeout)","")
            }
        }

        allStepsStr += stepObject.replace(/\$stepName/g,st.stepName)
                                 .replace(/\$stepCnName/g,st.stepCnName)
        
        importStr += importStep.replace("$scene",scene.sceneName).replace(/\$stepName/g,st.stepName)
        stepFuncStr = stepFuncStr.replace(/\$actions/g, actions)
        write(`./src/steps/${scene.sceneName}`, st.stepName,stepFuncStr)
    }
    allStepsStr = allStepsStr.slice(0,allStepsStr.length-2)
    sceneExportStr = sceneExportStr.replace("$steps",allStepsStr).replace("$importStep",importStr)
    write(`./src/scene/`,scene.sceneName,sceneExportStr)
}


function run(filepath:string) {
    if (!existsSync(filepath)) {
        console.log("case config path not found")
    }
    const files = readdirSync(filepath)
    for (let file of files) {
        const configFilePath = `${filepath}/${file}`
        try {
            const content = readFileSync(configFilePath)
            const fileContent = JSON.parse(content.toString())
            generate(fileContent)
        }catch(err) {
            console.log(`json parse: ${JSON.stringify(err)}`)
            continue
        }
    }
}



run("./gen/config")