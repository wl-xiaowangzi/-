/**
 * 审批成功提示
 * Created by land on 2017/9/29.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/approvalAgree.html", "bootstrap"], function ($, art, API, approvalAgreeTpl) {
    return function (ep_id) {
        // 转化为jq对象
        var $approvalAgree = $(approvalAgreeTpl);
        // 移除上一次的模态框
        $("#modalApprovalAgree").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $approvalAgree.appendTo("body").modal({
            backdrop: "static"//模态框不会自动关闭
        });
        setTimeout(function(){$approvalAgree.modal("hide")},1500)
    }
})