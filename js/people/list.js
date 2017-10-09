/**
 * 人员列表
 * Created by landon 2017/9/4.
 */

define(["jquery", "artTemplate", "common/api", "text!tpls/peopleList.html", "./baseInfo", "./visitant", "./add", "./del", "common/employeeCamera","pager"], function ($, art, API, peopleListTpl, baseInfo, visitant, peopleAdd, peopleDel, employeeCamera) {

    return function () {
        var page = $("#btnPager").attr("page")||1;
        $("#btnPager").removeAttr("page");
        var start = 30*(page-1);
        var limit = 30*(page);
        var keyword = $("#btnSearchWords").attr("keyword");
        $("#btnSearchWords").removeAttr("keyword");
        var parameterkey = "key_job";
        var start = 0;
        var limit = 30;
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
        API.getPeopleList(start, limit, keyword, function (res) {

            //编译模板
            var peopleList = art.render(peopleListTpl, res);
            console.log(res)
            //将编译成功的内容转换为jquery对象(--->方便后续的事件绑定)
            var $peopleList = $(peopleList);

            //实现人员管理事件
            $peopleList
                .on("click", "#peopleAdd", function () {
                    employeeCamera();
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
                .on("click", ".btn-search", function () {
                    var keyword = $(".search-word").val();
                    $("#btnSearchWords").attr("keyword", keyword);
                    $("#btnPeopleManager").trigger("click"); //刷新
                })
            //把渲染好的元素放到页面中
            $(".module-container").append($peopleList);

            var num = Math.ceil(res.sumsize/30);
            
            Page({
                num: num, //页码数
                startnum: page||1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page",n);
                    $("#btnPeopleManager").trigger("click"); //刷新
                }
            });

        })
    }
})