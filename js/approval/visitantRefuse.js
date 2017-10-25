/**
 * 访客驳回提示
 * Created by land on 2017/9/3.
 */
define(["jquery", "artTemplate", "common/api","text!tpls/approvalRefuse.html", "bootstrap"], function ($, art,API, approvalRefuseTpl) {
    return function (ps_id) {
        // 转转为jq对象
        var $approvalRefuse = $(approvalRefuseTpl);
        var ps_id = ps_id;
        // 提交表单
        $approvalRefuse
            .on("submit", "form", function () {
                var checksuggestion = $(".checksuggestion").val();
                API.checkVisitor(ps_id,2, checksuggestion, function (res) {
                    $approvalRefuse.modal("hide");
                    $("#btnApproval").trigger("click");
                })
                return false;//阻止表单的自动提交
            })
        // 移除上一次的模态框
        $("#modalApprovalRefuse").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $approvalRefuse.appendTo("body").modal();
    }
})