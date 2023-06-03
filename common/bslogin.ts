import { NightwatchBrowser } from "nightwatch"

export function login(browser:NightwatchBrowser,username:String, password:String) {
    var login = browser.page.bs_login()
    login.navigate()
            .waitForElementVisible('@usernameInput').clearValue('@usernameInput')
            .setValue('@usernameInput',username)
            .waitForElementVisible('@passwordInput').clearValue('@passwordInput')
            .setValue('@passwordInput',password)
            .waitForElementVisible('@loginSubmit').click('@loginSubmit')
            .pause(5000)
}