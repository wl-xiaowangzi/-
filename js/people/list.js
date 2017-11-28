/**
 * 人员列表
 * Created by landon 2017/9/4.
 */

define(["jquery", "artTemplate", "common/api", "text!tpls/peopleList.html", "text!tpls/peopleOrgTree.html", "./baseInfo", "./visitant", "./add", "./del", "./orgAdd", "./orgDel", "./orgEdit", "common/employeeCamera", "pager"], function ($, art, API, peopleListTpl, peopleOrgTpl, baseInfo, visitant, peopleAdd, peopleDel, orgAdd, orgDel, orgEdit, employeeCamera) {

    return function () {
        var page = $("#btnPager").attr("page") || 1;
        var parameterkey = "key_job";
        var start = 40 * (page - 1);
        var limit = 40;
        var keyword = $("#btnSearchWords").attr("peopleKeyword");
        // 移除参数
        $("#btnPager").removeAttr("page");
        $("body").removeClass("noResult");
        // 清空其他模块保留的搜索信息
        $("#btnSearchWords").removeAttr("visitantkeyword");
        $("#btnSearchWords").removeAttr("approvalkeyword");
        $("#btnSearchWords").removeAttr("recordkeyword");
        $("#btnSearchWords").removeAttr("deviceKeyword");
        $("#btnSearchWords").removeAttr("usersKeyword");
        $("#btnKeepSearchWords").removeAttr("visitantSearchWords");
        $("#btnKeepSearchWords").removeAttr("approvalsearchwords");
        $("#btnKeepSearchWords").removeAttr("recordsearchwords");
        $("#btnKeepSearchWords").removeAttr("deviceSearchwords");
        $("#btnKeepSearchWords").removeAttr("usersSearchWords");
        // 调用接口
        var organizationid = $.cookie("organizationid");
          
        API.getPeopleList(start, limit, keyword, function (res) {
            console.log(res)
            //编译模板
            var peopleList = art.render(peopleListTpl, res);
            //将编译成功的内容转换为jquery对象(--->方便后续的事件绑定)
            var $peopleList = $(peopleList);
            // 查询组织树
            API.queryTree(organizationid, function (res) {
                console.log(res)
                var configOrganizationalManagement = art.render(peopleOrgTpl, res.data[0]);
                var $configOrganizationalManagement = $(configOrganizationalManagement);
                $configOrganizationalManagement
                    .on("click", ".btn-add", function () {
                        var parentorganizationid = $(this).parent().parent().attr("organizationid");
                        var principal = $(this).parent().parent().attr("principal");
                        orgAdd(parentorganizationid, principal);
                    })
                    .on("click", ".btn-post-edit", function () {
                        var parentorganizationid = $(this).parent().parent().attr("parentorganizationid");
                        var organizationid = $(this).parent().parent().attr("organizationid");
                        var principal = $(this).parent().parent().attr("principal");
                        var name = $(this).parent().parent().attr("name");
                        orgEdit(parentorganizationid, organizationid, principal, name);
                    })
                    .on("click", ".btn-post-del", function () {
                        var organizationids = $(this).parent().parent().attr("organizationid");
                        orgDel(organizationids);
                    })
                $("#TreeList").append($configOrganizationalManagement);
                $(".myline").on("mouseenter", function () {
                    $(".right").addClass("displayN")
                    $(this).find(".right").removeClass("displayN")
                });
                $(".total-menu").on("mouseenter",function(){
                    $(".sub-menu").addClass("displayN")
                    $(this).siblings(".sub-menu").removeClass("displayN")
                });
                $(".myline").on("click",function(){

                    if(!$(this).siblings("ul").hasClass("displayN")){
                        $(this).siblings("ul").addClass("displayN");
                    }else{
                        $(this).siblings("ul").removeClass("displayN");
                    }
                })
            });

            //实现人员管理事件
            $peopleList
                .on("click", "#peopleAdd", function () {
                    // employeeCamera();
                    peopleAdd()
                })
                .on("click", ".btn-people-del", function () {
                    //1、获取员工id
                    var ep_id = $(this).attr("ep_id");
                    // 传参
                    peopleDel(ep_id);
                })
                .on("click", "#peopleVisitantList", function () {
                    visitant();
                })
                .on("click", ".btn-edit-course-baseinfo", function () {
                    //编辑员工基本信息
                    //1、获取员工id
                    var ep_id = $(this).parent().attr("ep_id");
                    //将员工id传入信息模块
                    baseInfo(ep_id)
                })
                .on("click", "#people_search_btn", function () {
                    var keyword = $("#people_search_word").val();
                    $("#search").val(keyword);
                    $("#btnSearchWords").attr("peopleKeyword", keyword);
                    // 设置搜索关键字保留
                    $("#btnKeepSearchWords").attr("peopleSearchWords", keyword);
                    $("#btnPeopleManager").trigger("click"); //刷新
                })
            //把渲染好的元素放到页面中
            $(".module-container").empty();
            $(".module-container").append($peopleList);
            
            // 设置下拉菜单鼠标移入触发
            $('div.dropdown').mouseover(function () {
                $(this).addClass('open');
            }).mouseout(function () {
                $(this).removeClass('open');
            });
            // 设置搜索关键字保留
            var searchWords = $("#btnKeepSearchWords").attr("peopleSearchWords");
            $("#people_search_word").val(searchWords);
            $("#search").val(searchWords);
            // 获取员工参数
            API.getParameterList(start, limit, parameterkey, function (res) {
                var list = res.data.list;
                var mySource = "["
                for (var i = 0; i < list.length; i++) {
                    var title = list[i].title;
                    if (title != '') {
                        mySource += '{"id":' + (i + 1) + ',"name":"' + title + '"},';
                    }
                }
                if (mySource != '[') {
                    mySource = mySource.substring(0, mySource.length - 1);
                }
                mySource += ']';
                $("#btnMySource").attr("mySource", mySource)
            })

            // 设置分页
            var num = Math.ceil(res.sumsize / 40);
            Page({
                num: num, //页码数
                startnum: page || 1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page", n);
                    $("#btnPeopleManager").trigger("click"); //刷新
                }
            });
        })
    }
})