/**
 * 访客列表
 * Created by land on 2017/9/2.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/peopleVisitantList.html", "./visitantinfo", "./visitantAdd", "./visitantDel", "./visitantExpired","moment","daterangepicker","pager"], function ($, art, API, peopleVisitantListTpl, visitantinfo, visitantAdd, visitantDel, visitantExpired,moment) {
    return function () {
        // 获取所需参数
        var organizationid = $.cookie("organizationid");
        var time = new Date();
        // 日期补零
        var day = time.getDate();
        var month = time.getMonth();
        var nextMonth = (month + 1);
        var hour = time.getHours();
        var minutes = time.getMinutes();
        if(day.toString().length == 1){
            day = "0"+day
        }
        if(month.toString().length == 1){
            if(month==9){
                month = "0"+month
                var nextMonth = 10;
            }else{
                month = "0"+month
            }
        }
        if(hour.toString().length == 1){
                hour = "0"+hour
        }
        if(minutes.toString().length == 1){
                minutes = "0"+minutes
        }
        var starttime = time.getFullYear() + '-' + month + '-' + day + " " + hour + ":" + minutes + ":" + "00";
        var endtime = time.getFullYear() + '-' + nextMonth + '-' + day + " " + hour + ":" + minutes + ":" + "00";
        var starttime = $("#btnVsStarttime").attr("starttime") || starttime;
        var endtime = $("#btnVsEndtime").attr("endtime") || endtime;
        var page = $("#btnPager").attr("page")||1;
        var status=$("#btnVsStatus").attr("status");
        var start = 40*(page-1);
        var limit = 40;
        var keyword = $("#btnSearchWords").attr("visitantKeyword");
        $("#btnPager").removeAttr("page");
        // 渲染前清空数据
        $(".module-container").empty();
        // 清空其他模块保留的搜索信息
        $("#btnSearchWords").removeAttr("peoplekeyword");
        $("#btnSearchWords").removeAttr("approvalkeyword");
        $("#btnSearchWords").removeAttr("recordkeyword");
        $("#btnSearchWords").removeAttr("deviceKeyword");
        $("#btnSearchWords").removeAttr("usersKeyword");
        $("#btnKeepSearchWords").removeAttr("peoplesearchwords");
        $("#btnKeepSearchWords").removeAttr("approvalsearchwords");
        $("#btnKeepSearchWords").removeAttr("recordsearchwords");
        $("#btnKeepSearchWords").removeAttr("deviceSearchwords");
        $("#btnKeepSearchWords").removeAttr("usersSearchWords");
        console.log(start, limit, keyword,status,starttime,endtime)
        // 调用接口
        API.getVisitorList(start, limit, keyword,status,starttime,endtime,function (res) {
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
                .on("click", ".btn-show-visitant-baseinfo", function () {
                    var vs_id = $(this).parent().attr("vs_id");
                    visitantinfo(vs_id);
                })
                .on("click", "#visitantAdd", function () {
                    // visitorCamera();
                    visitantAdd();
                })
                .on("click", ".btn-visitant-del", function () {
                    var vs_id = $(this).attr("vs_id");
                    var vs_status = $(this).attr("vs_status");
                    if(vs_status==3){
                        visitantExpired(vs_id);
                    }else{
                        visitantDel(vs_id);
                    }
                })
                .on("click","#all",function(){
                    $("#btnVisitorManager").trigger("click"); //刷新
                })
                .on("click","#overdue",function(){
                    $("#btnVsStatus").attr("status",3);
                    $("#btnVisitorManager").trigger("click"); //刷新
                })
                .on("click","#unoverdue",function(){
                    $("#btnVsStatus").attr("status",4);
                    $("#btnVisitorManager").trigger("click"); //刷新
                })
                .on("click", "#visitant_search_btn", function () {
                    var keyword = $("#visitant_search_word").val();
                    $("#search").val(keyword);
                    $("#btnSearchWords").attr("visitantKeyword", keyword);
                    // 设置搜索关键字保留
                    $("#btnKeepSearchWords").attr("visitantSearchWords",keyword);
                    $("#btnVisitorManager").trigger("click"); //刷新
                })
            //把渲染好的元素放到页面中
            $(".module-container").empty();
            $(".module-container").append($peopleVisitantList);
            // 为日期选择增加箭头上下指示，为下拉框替换左侧小三角
            var flag=true;
            $("#vs-daterange-btn").on("click",function(){
                if(flag){
                    $("#daterange-btn .caret").addClass("caret_down");
                    flag=false;
                }else{
                    $("#daterange-btn .caret").removeClass("caret_down");
                    flag=true;
                }
            })
            // 设置下拉菜单鼠标移入触发
            $('div.dropdown').mouseover(function() {   
            $(this).addClass('open');}).mouseout(function(){$(this).removeClass('open');});  
            // 设置搜索关键字保留
            var searchWords=$("#btnKeepSearchWords").attr("visitantSearchWords");
            $("#visitant_search_word").val(searchWords);
            $("#search").val(searchWords);
            // 设置分页
            var num = Math.ceil(res.sumsize/40);
            Page({
                num: num, //页码数
                startnum: page||1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page",n);
                    $("#btnVisitorManager").trigger("click"); //刷新
                }
            });
            // 设置日期控件
            function init() {
                //定义locale汉化插件
                var locale = {
                    "format": 'YYYY-MM-DD',
                    "separator": " -222 ",
                    "applyLabel": "确定",
                    "cancelLabel": "取消",
                    "fromLabel": "起始时间",
                    "toLabel": "结束时间'",
                    "customRangeLabel": "自定义",
                    "weekLabel": "W",
                    "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
                    "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    "firstDay": 1
                };
                //初始化显示当前时间
                var initStarttime = starttime.substring(0,starttime.indexOf(" "))
                var initEndtime = endtime.substring(0,endtime.indexOf(" "))
                $('#vs-daterange-btn span').html(initStarttime + ' - ' + initEndtime);
                // $('#daterange-btn span').html(moment().subtract(1, 'months').subtract(-1, 'days').format('YYYY-MM-DD') + ' - ' + moment().subtract(-1, 'days').format('YYYY-MM-DD'));
                //日期控件初始化
                $('#vs-daterange-btn').daterangepicker({
                        'locale': locale,
                        timePicker24Hour: true,
                        //汉化按钮部分
                        ranges: {
                            '今日': [moment().startOf('day'), moment().subtract(0, 'days')],
                            '昨日': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                            '最近7日': [moment().subtract(6, 'days').startOf('day'), moment().subtract(0, 'days').endOf('day')],
                            '最近30日': [moment().subtract(30, 'days').startOf('day'), moment().subtract(0, 'days').endOf('day')],
                            '本月': [moment().startOf('month'), moment().endOf('month')],
                            '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                        },
                        startDate: moment().subtract(29, 'days'),
                        endDate: moment()
                    },
                    function (start, end) {
                        $('#vs-daterange-btn span').html(start.format('YYYY-MM-DD HH-mm-ss') + ' - ' + end.format('YYYY-MM-DD HH-mm-ss'));
                        var starttime = start.format('YYYY-MM-DD HH-mm-ss');
                        var endtime = end.format('YYYY-MM-DD HH-mm-ss');
                        $("#btnVsStarttime").attr("starttime", starttime);
                        $("#btnVsEndtime").attr("endtime", endtime);
                        $("#btnVisitorManager").trigger("click");
                    }
                );
            };
            // 默认加载
            $(document).ready(function () {
                init();
            });
        })
    }
})