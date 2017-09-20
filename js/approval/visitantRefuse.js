/**
 * 访客驳回提示
 * Created by land on 2017/9/3.
 */
define(["jquery", "artTemplate", "common/api","text!tpls/approvalRefuse.html", "bootstrap"], function ($, art,API, approvalRefuseTpl) {

    return function (ps_id) {

        $("#modalApprovalRefuse").remove();

        var $approvalRefuse = $(approvalRefuseTpl);
        var ps_id = ps_id;
        console.log(ps_id)
        $approvalRefuse
            .on("click", ".btn-blue", function () {
                var checksuggestion = $(".checksuggestion").val();
                console.log(checksuggestion)
                API.checkVisitor(ps_id,2, checksuggestion, function (res) {
                    console.log(res);
                    $approvalRefuse.modal("hide");
                    $("#btnApproval").trigger("click");
                })
            })
             $approvalRefuse.appendTo("body").modal();
    }
})