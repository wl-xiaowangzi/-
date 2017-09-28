/**
 * 职务管理
 * Created by land 2017/9/4.
 */
define(["jquery","artTemplate","common/api","text!tpls/configPostManagement.html","./postAdd","pager"],function($,art,API,configPostManagementTpl,postAdd){

    return function(){
        var parameterkey="key_job";
        var page = $("#btnPager").attr("page")||1;
        $("#btnPager").removeAttr("page");
        var start = 30*(page-1);
        var limit = 30*(page);
        API.getParameterList(start,limit,parameterkey,function(res){
            console.log(res)
            //编译模板
            var configPostManagement=art.render(configPostManagementTpl,res.data);

            //将编译成功的内容转换为jquery对象(--->方便后续的事件绑定)
            var $configPostManagement=$(configPostManagement);

            //实现编辑职位
            $configPostManagement
                .on("click", ".btn-device-add", function () {
                    var dv_id = $(this).parent().attr("dv_id");
                    postAdd();
                })
                .on("click", ".btn-device-edit", function () {
                    var dv_id = $(this).parent().attr("dv_id");
                    deviceEdit(dv_id);
                })
                .on("click", ".btn-device-del", function () {
                    var dv_id = $(this).parent().attr("dv_id");
                    console.log(dv_id)
                    deviceDel(dv_id);
                })
            
            //把渲染好的元素放到页面中
            $(".module-container").append($configPostManagement);

            var num = Math.ceil(res.sumsize/30);
            
            Page({
                num: num, //页码数
                startnum: page||1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page",n);
                    $("#btnPostManagement").trigger("click");
                }
            });
        })

        

    }
})