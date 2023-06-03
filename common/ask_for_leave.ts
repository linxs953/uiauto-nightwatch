import { NightwatchBrowser } from "nightwatch";

// 发布请假
export function publish(browser:NightwatchBrowser,data:any) {
    var askLeave = browser.page.ask_leave()
      askLeave.navigate()
      .waitForElementVisible('@askForLeaveBtn').click('@askForLeaveBtn')
      .waitForElementVisible('@apTypeInput').click('@apTypeInput')
      .waitForElementVisible('@apTypeOption').click('@apTypeOption')
      .waitForElementVisible('@startTimeClickInput').click('@startTimeClickInput')
      .waitForElementVisible('@startDateInput').setValue('@startDateInput', data.startDate)
      .waitForElementVisible('@startDateConfirmBtn').click('@startDateConfirmBtn')
      .waitForElementVisible('@finishTimeClickInput').click('@finishTimeClickInput')
      .waitForElementVisible('@finishDateInput').setValue('@finishDateInput',data.endDate)
      .waitForElementVisible('@finishDateConfirmBtn').click('@finishDateConfirmBtn')
      .waitForElementVisible('@apReasonTextArea').setValue('@apReasonTextArea',data.leaveReason)
      .waitForElementVisible('@approvalSelectBtn').click('@approvalSelectBtn')
      .waitForElementVisible('@userSearchBar').setValue('@userSearchBar',data.userKeyWord)
      .waitForElementVisible('@userSearchBtn').click('@userSearchBtn')
      .waitForElementVisible('@selectUserCheckBox').click('@selectUserCheckBox')
      .waitForElementVisible('@userSelectConfirmBtn').click('@userSelectConfirmBtn')
      .waitForElementVisible('@submitApprovalBtn').click('@submitApprovalBtn')
      .pause(10000)
}

// 审批请假
export function approvalLeave(browser:NightwatchBrowser, data:any) {
    var leave_approval = browser.page.leave_approval()
    leave_approval.navigate()
                  .waitForElementVisible('@approvalDetailBtn').click('@approvalDetailBtn')
                  .pause(5000)
    var approval_detail = browser.page.approval_detail()
    approval_detail.waitForElementVisible('@approvalSuggestionInput').setValue('@approvalSuggestionInput',data.approvalSuggest)
                   .waitForElementVisible('@agreeApprovalBtn').click('@agreeApprovalBtn')
                   .pause(5000)
}

// 查看请假状态
export function checkLeaveStatus(browser:NightwatchBrowser, data:any) {
    var askLeave = browser.page.ask_leave()
    askLeave.navigate()
            .waitForElementVisible('@lastLeaveDataRow')
            .expect.element('@lastLeaveDataRow').text.to.equal(data.successMsg)
}