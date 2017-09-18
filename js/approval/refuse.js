/**
 * 员工驳回提示
 * Created by land on 2017/9/3.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/approvalRefuse.html", "bootstrap"], function ($, art, API, approvalRefuseTpl) {

    return function () {

        $("#modalApprovalRefuse").remove();

        var $approvalRefuse = $(approvalRefuseTpl);

        $approvalRefuse.appendTo("body").modal();
        $approvalRefuse
            .on("click", ".btn-refuse", function () {
                var checksuggestion = $(".checksuggestion").val();
                API.checkEmployee(2, checksuggestion, function (res) {
                    console.log(res);
                    $approvalRefuse.modal("hide");
                    $("#btnApproval").trigger("click");
                })
            })

    }
})