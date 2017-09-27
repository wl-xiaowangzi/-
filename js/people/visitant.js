/**
 * 访客列表
 * Created by land on 2017/9/2.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/peopleVisitantList.html", "./visitantinfo", "./visitantAdd", "./visitantDel", "common/visitorCamera"], function ($, art, API, peopleVisitantListTpl, visitantinfo, visitantAdd, visitantDel, visitorCamera) {

    return function () {
        var start = 0;
        var limit = 30;
        var keyword = $("#btnSearchWords").attr("keyword");
        $("#btnSearchWords").removeAttr("keyword");
        $(".module-container").empty();

        API.getVisitorList(start, limit, keyword, function (res) {
            console.log(res)
            //编译模板
            var peopleVisitantList = art.render(peopleVisitantListTpl, res);

            //将编译成功的内容转换为jquery对象(--->方便后续的事件绑定)
            var $peopleVisitantList = $(peopleVisitantList);
            //编辑入库信息
            $peopleVisitantList
                .on("click", ".btn-peopleList", function () {
                    $("#btnPeopleManager").trigger("click");
                })
                .on("click", ".btn-edit-visitant-baseinfo", function () {
                    var vs_id = $(this).parent().attr("vs_id");
                    visitantinfo(vs_id);
                })
                .on("click", "#visitantAdd", function () {
                    visitorCamera();
                })
                .on("click", ".btn-visitant-del", function () {
                    var vs_id = $(this).attr("vs_id");
                    visitantDel(vs_id);
                })
                .on("click", ".btn-search", function () {
                    var keyword = $(".search-word").val();
                    $("#btnSearchWords").attr("keyword", keyword);
                    $("#btnVisitorManager").trigger("click"); //刷新
                })
            //把渲染好的元素放到页面中
            $(".module-container").append($peopleVisitantList);
        })

    }
})