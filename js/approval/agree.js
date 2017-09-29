/**
 * 审批成功提示
 * Created by land on 2017/9/29.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/approvalAgree.html", "bootstrap"], function ($, art, API, approvalAgreeTpl) {

    return function (ep_id) {

        $("#modalApprovalAgree").remove();

        var $approvalAgree = $(approvalAgreeTpl);
        
        $approvalAgree.appendTo("body").modal({
            backdrop: "static"//模态框不会自动关闭
        });
        setTimeout(function(){$approvalAgree.modal("hide")},500)
    }
})