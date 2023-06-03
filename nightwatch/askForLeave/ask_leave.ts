import {NightwatchTests} from 'nightwatch';
import {login} from "../../common/bslogin" 
import {approvalLeave, checkLeaveStatus, publish} from "../../common/ask_for_leave" 
import {multDataRunner} from "../../multDataRunner"
import {getSceneData} from "../../data"

const askLeaveData = getSceneData("请假成功")
const AskLeave: NightwatchTests = {
  '登录': (data:any) => {
    login(browser,data.publish_user,data.publish_pass)
  },
  '发布请假': (data:any) => {
      publish(browser,data)
  },

  "切换审批账号": (data:any) => {
    login(browser,data.approval_user,data.approval_pass)
  },

  "审批请假": (data:any) => {
    approvalLeave(browser,data)
  },

  "切换回请假账号": (data:any) => {
    login(browser,data.publish_user,data.publish_pass)
  },
  "查看请假状态": (data:any) => {
    checkLeaveStatus(browser, data)
  }
};

export default multDataRunner(AskLeave,askLeaveData);
