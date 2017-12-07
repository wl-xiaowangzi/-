/**
 * 识别记录列表
 * Author:land
 *   Date:2017/8/30
 */
define(["jquery", "artTemplate", "text!tpls/recordList.html", "common/api", "./show", "./visitorShow", "./edit", "./export","moment", "datetimepicker", "datetimepickerLang", "daterangepicker", "pager"], function ($, art, recordListTpl, API, recordShow, visitorShow, recordEdit,recordExport, moment) {
    return function () {
        // 获取所需参数
        var organizationid = $.cookie("organizationid");
        var time = new Date();
        // 日期补零
        var day = time.getDate();
        var month = time.getMonth();
        var nextMonth = (month + 1)
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
        var starttime = time.getFullYear() + '-' + month + '-' + day + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        var endtime = time.getFullYear() + '-' + nextMonth + '-' + day + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        var starttime = $("#btnStarttime").attr("starttime") || starttime;
        var endtime = $("#btnEndtime").attr("endtime") || endtime;
        var similarity = $("#btnSimilarity").attr("similarity") || 0.75;
        var persontype = $("#btnPersontype").attr("persontype");
        var page = $("#btnPager").attr("page") || 1;
        var keyword = $("#btnSearchWords").attr("recordKeyword");
        var start = 30 * (page - 1);
        var limit = 30;
        var personid;
        // 获取参数后清空自定义属性
        // $("#btnPersontype").removeAttr("persontype");
        $("#btnPager").removeAttr("page");
        $("body").removeClass("noResult");
        // 清空其他模块保留的搜索信息
        $("#btnSearchWords").removeAttr("visitantkeyword");
        $("#btnSearchWords").removeAttr("peoplekeyword");
        $("#btnSearchWords").removeAttr("approvalkeyword");
        $("#btnSearchWords").removeAttr("deviceKeyword");
        $("#btnSearchWords").removeAttr("usersKeyword");
        $("#btnKeepSearchWords").removeAttr("visitantkeyword");
        $("#btnKeepSearchWords").removeAttr("peoplesearchwords");
        $("#btnKeepSearchWords").removeAttr("approvalsearchwords");
        $("#btnKeepSearchWords").removeAttr("deviceSearchwords");
        $("#btnKeepSearchWords").removeAttr("usersSearchWords");
        // 调用识别记录接口   
        API.getRecordList(starttime, endtime, start, limit, persontype, similarity, keyword, personid, function (res) {
            //编译模板
            var recordList = art.render(recordListTpl, res);
            var $recordList = $(recordList);
            console.log(res)
            //修改用户状态
            $recordList
                //查看详细信息
                .on("click", ".show1", function () {
                    var ep_id = $(this).attr("personid");
                    recordShow(ep_id);
                })
                .on("click", ".show2", function () {
                    var vs_id = $(this).attr("personid");
                    visitorShow(vs_id);
                })
                //查看最近信息
                .on("click", ".btn-edit", function () {
                    var ps_id = $(this).parent().attr("ps_id");
                    var ps_type = $(this).parent().attr("ps_type");
                    // 设置截止时间
                    var ps_time = $(this).parent().siblings()[4].innerText;
                    recordEdit(ps_id, ps_type,ps_time);
                })
                // 选择相似度
                .on("click", ".similarity li a", function () {
                    var similarity = $(this).attr("similarity");
                    $("#btnSimilarity").attr("similarity", similarity);
                    $("#btnRecord").trigger("click");
                })
                // 人员类别选择
                .on("click", ".allRecord", function () {
                    var persontype = null;
                    $("#btnPersontype").attr("persontype", persontype);
                    $("#btnRecord").trigger("click");
                })
                .on("click", "#employeeRecord", function () {
                    var persontype = 1;
                    $("#btnPersontype").attr("persontype", persontype);
                    $("#btnRecord").trigger("click");
                })
                .on("click", "#visitorRecord", function () {
                    var persontype = 2;
                    $("#btnPersontype").attr("persontype", persontype);
                    $("#btnRecord").trigger("click");
                })
                // 关键字搜索
                .on("click", "#record_search_btn", function () {
                    var keyword = $("#record_search_word").val();
                    $("#search").val(keyword);
                    $("#btnSearchWords").attr("recordKeyword", keyword);
                    // 设置搜索关键字保留
                    $("#btnKeepSearchWords").attr("recordSearchWords",keyword);
                    $("#btnRecord").trigger("click"); //刷新
                })
                // 识别记录导出
                .on("click","#record_export",function(){
                    var persontype = $("#btnPersontype").attr("persontype")||0;
                    API.exportRecord(organizationid,starttime,endtime,persontype,similarity,function(res){
                        var uid = res.data;
                        recordExport(uid,starttime,endtime)
                    })
                })
                
            // 将模板数据添加的指定位置
            $(".module-container").empty();
            $(".module-container").append($recordList);
            // 为日期选择增加箭头上下指示，为下拉框替换左侧小三角
            var flag=true;
            $("#daterange-btn").on("click",function(){
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
            var searchWords=$("#btnKeepSearchWords").attr("recordSearchWords")
            $("#record_search_word").val(searchWords);
            $("#search").val(searchWords);
            // 设置分页
            var num = Math.ceil(res.sumsize / 30);
            Page({
                num: num, //页码数
                startnum: page || 1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page", n);
                    $("#btnRecord").trigger("click");
                }
            });
            // 设置下拉选项显示文字
            if (persontype == 1) {
                $(".trick").html("员工");
            } else if (persontype == 2) {
                $(".trick").html("访客");
            } else {
                $(".trick").html("所有人员");
            }
            // 相似度
            $(".slm").html(similarity * 100 + "%")
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
                $('#daterange-btn span').html(initStarttime + ' - ' + initEndtime);
                // $('#daterange-btn span').html(moment().subtract(1, 'months').subtract(-1, 'days').format('YYYY-MM-DD') + ' - ' + moment().subtract(-1, 'days').format('YYYY-MM-DD'));
                //日期控件初始化
                $('#daterange-btn').daterangepicker({
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
                        $('#daterange-btn span').html(start.format('YYYY-MM-DD HH-mm-ss') + ' - ' + end.format('YYYY-MM-DD HH-mm-ss'));
                        var starttime = start.format('YYYY-MM-DD HH-mm-ss');
                        var endtime = end.format('YYYY-MM-DD HH-mm-ss');
                        $("#btnStarttime").attr("starttime", starttime);
                        $("#btnEndtime").attr("endtime", endtime);
                        $("#btnRecord").trigger("click");
                    }
                );
            };
            // 默认加载
            $(document).ready(function () {
                init();
            });

        })

    };
});