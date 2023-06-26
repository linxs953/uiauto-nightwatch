
import { NightwatchBrowser } from "nightwatch"
export const bs_login = (browser:NightwatchBrowser,data:any) => {
    var bs_login = browser.page.bs_login()
    bs_login.navigate()
    
    bs_login.waitForElementVisible("@username").setValue("@username",data["username"]).pause(5000)

    bs_login.waitForElementVisible("@password").setValue("@password",data["password"]).pause(5000)

    bs_login.waitForElementVisible("@submitBtn").click("@submitBtn").pause(5000)

}
