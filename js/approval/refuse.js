/**
 * 员工驳回提示
 * Created by land on 2017/9/3.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/approvalRefuse.html", "bootstrap"], function ($, art, API, approvalRefuseTpl) {

    return function (ep_id) {

        $("#modalApprovalRefuse").remove();

        var $approvalRefuse = $(approvalRefuseTpl);
        var ep_id=ep_id;
        
        $approvalRefuse
            .on("submit", "form", function () {
                var checksuggestion = $(".checksuggestion").val();
                
                API.checkEmployee(ep_id,2, checksuggestion, function (res) {
                    
                    $approvalRefuse.modal("hide");
                    $("#btnApproval").trigger("click");
                })
                return false;//阻止表单的自动提交
            })
             $approvalRefuse.appendTo("body").modal();
    }
})