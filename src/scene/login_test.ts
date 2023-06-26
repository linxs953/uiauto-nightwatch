
import {multDataRunner} from "../../multDataRunner"
import {getSceneData} from "../../fetch/data"

import {bs_login} from "../steps/login_test/bs_login"

let login_test_data = getSceneData("鉴定成功")

const login_test = {
'登录': (data:any) => {
    bs_login(browser,data)
}}

module.exports = multDataRunner(login_test, login_test_data)
