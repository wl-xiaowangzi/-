/**
 * 驳回提示
 * Created by land on 2017/9/3.
 */
define(["jquery", "artTemplate", "text!tpls/approvalRefuse.html", "bootstrap"], function ($, art, approvalRefuseTpl) {

    return function () {

        $("#modalApprovalRefuse").remove();

        var $approvalRefuse = $(approvalRefuseTpl);

        $approvalRefuse.appendTo("body").modal();
        // $approvalRefuse
        //     .on("click", ".btn-refuse", function () {

        //         $approvalEdit.on("submit", "form", function () {

        //             $("#btnCourseTimeManager").trigger("click");
        //             return false; //阻止表单同步提交
        //         })


        //     })

    }
})