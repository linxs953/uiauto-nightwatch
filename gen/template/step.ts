

export const stepFunc = `
import { NightwatchBrowser } from "nightwatch"
export const $functionName = (browser:NightwatchBrowser,data:any) => {
    var $pageName = browser.page.$pageName()
    $pageName.navigate()
    $actions
}
`


export const  stepClick = `
    $pageName.waitForElementVisible("@$target").click("@$target").pause($timeout)
`

export const stepSendKey = `
    $pageName.waitForElementVisible("@$target").setValue("@$target",data[$value]).pause($timeout)
`