export const sceneExport = `
import {multDataRunner} from "../../multDataRunner"
import {getSceneData} from "../../fetch/data"
$importStep
let $dataSourceName = getSceneData("$dataName")

const $scene = {$steps}

module.exports = multDataRunner($scene, $dataSourceName)
`

export const importStep = `
import {$stepName} from "../steps/$scene/$stepName"
`

export const stepObject = `
'$stepCnName': (data:any) => {
    $stepName(browser,data)
},
`