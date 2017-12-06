/**
 * 组织列表
 * Created by landon 2017/9/4.
 */

define(["jquery", "artTemplate", "common/api", "text!tpls/peopleList.html", "text!tpls/peopleOrgTree.html", "./baseInfo", "./visitant", "./add", "./del", "./orgAdd", "./orgDel", "./orgEdit", "common/employeeCamera", "pager"], function ($, art, API, peopleListTpl, peopleOrgTpl, baseInfo, visitant, peopleAdd, peopleDel, orgAdd, orgDel, orgEdit, employeeCamera) {

    return function () {
        // 调用接口
        var organizationid = $.cookie("organizationid");
        // 查询组织树
        API.queryTree(organizationid, function (res) {
            var configOrganizationalManagement = art.render(peopleOrgTpl, res.data[0]);
            var $configOrganizationalManagement = $(configOrganizationalManagement);
            $configOrganizationalManagement
                .on("click", ".btn-org-add", function () {
                    var parentorganizationid = $(this).parent().parent().attr("organizationid");
                    var principal = $(this).parent().parent().attr("principal");
                    orgAdd(parentorganizationid, principal);
                })
                .on("click", ".btn-org-edit", function () {
                    var parentorganizationid = $(this).parent().parent().attr("parentorganizationid");
                    var organizationid = $(this).parent().parent().attr("organizationid");
                    var principal = $(this).parent().parent().attr("principal");
                    var name = $(this).parent().parent().attr("name");
                    orgEdit(parentorganizationid, organizationid, principal, name);
                })
                .on("click", ".btn-org-del", function () {
                    var organizationids = $(this).parent().parent().attr("organizationid");
                    orgDel(organizationids);
                })
                .on("click",".myline",function(){
                    var organizationid=$(this).children(".right").attr("organizationid");
                    $("#btnOrganizationid").attr("organizationid",organizationid);
                    $("#btnPeopleManager").trigger("click"); //刷新
                })
                .on("click",".menu-header",function(){
                    var organizationid=$.cookie("organizationid");
                    $("#btnOrganizationid").attr("organizationid",organizationid);
                    $("#btnPeopleManager").trigger("click"); //刷新
                })
            $("#TreeList").empty();
            $("#TreeList").append($configOrganizationalManagement);

            $(".myline").on("mouseenter", function () {
                $(".right").addClass("displayN")
                $(this).find(".right").removeClass("displayN")
            });
            $(".total-menu").on("mouseenter", function () {
                $(".sub-menu").addClass("displayN")
                $(this).siblings(".sub-menu").removeClass("displayN")
            });

            $(".myline").siblings("ul").removeClass("displayN");
            $(".myline").children().children(".org-tips").addClass("org-tips-show")

            $(".left").on("click", function () {
                if (!$(this).parent().siblings("ul").hasClass("displayN")) {
                    $(this).parent().siblings("ul").addClass("displayN");
                    $(this).children(".org-tips").removeClass("org-tips-show")
                } else {
                    $(this).parent().siblings("ul").removeClass("displayN");
                    $(this).children(".org-tips").addClass("org-tips-show")
                }
            });
            $(".sub-menu").on("mouseleave", function () {
                $(this).addClass("displayN")
            })
        });
    }
})