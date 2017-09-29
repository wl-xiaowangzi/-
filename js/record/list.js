/**
 * 识别记录列表
 * Author:land
 *   Date:2017/8/30
 */
define(["jquery", "artTemplate", "text!tpls/recordList.html", "common/api", "./show", "./edit", "moment", "datetimepicker", "datetimepickerLang", "daterangepicker","pager"], function ($, art, recordListTpl, API, recordShow, recordEdit, moment) {
    return function () {
        var organizationid = $.cookie("organizationid");
        var time = new Date();
        var starttime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate();
        var endtime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (time.getDate()+1);
        var starttime = $("#btnStarttime").attr("starttime") || starttime;
        var endtime = $("#btnEndtime").attr("endtime") || endtime;
        var similarity = $("#btnSimilarity").attr("similarity") || 0.75;
        var persontype = $("#btnPersontype").attr("persontype");
        $("#btnStarttime").removeAttr("starttime");
        $("#btnEndtime").removeAttr("endtime");
        $("#btnSimilarity").removeAttr("similarity");
        $("#btnPersontype").removeAttr("persontype");
        var page = $("#btnPager").attr("page")||1;
        $("#btnPager").removeAttr("page");
        var start = 30*(page-1);
        var limit = 30*(page);
        var keyword = $("#btnSearchWords").attr("keyword");
        var personid;
        $("#btnSearchWords").removeAttr("keyword");
        console.log(starttime,endtime)
        API.getRecordList(organizationid, starttime, endtime, start, limit, persontype, similarity, keyword, personid, function (res) {
            console.log(res)
            //编译模板
            var recordList = art.render(recordListTpl, res);
            var $recordList = $(recordList);

            // //修改用户状态
            $recordList

                //     //查看详细信息
                .on("click", ".btn-show", function () {
                    var datanumber = $(this).attr("datanumber");

                    recordShow(datanumber);
                })

                //     //查看最近信息
                .on("click", ".btn-edit", function () {
                    var ps_id = $(this).parent().attr("ps_id");
                    var ps_type = $(this).parent().attr("ps_type");
                    recordEdit(ps_id,ps_type);
                })
                .on("click", ".similarity li a", function () {
                    var similarity = $(this).attr("similarity");
                    $("#btnSimilarity").attr("similarity", similarity);
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
                .on("click", ".btn-search", function () {
                    var keyword = $(".search-word").val();
                    $("#btnSearchWords").attr("keyword", keyword);
                    $("#btnRecord").trigger("click"); //刷新
                })
                .on("click", ".allRecord", function () {
                    $("#btnRecord").trigger("click");
                })

            $(".module-container").append($recordList);

            var num = Math.ceil(res.sumsize/30);
            
            Page({
                num: num, //页码数
                startnum: page||1, //指定页码
                elem: $('#page1'), //指定的元素
                callback: function (n) { //回调函数
                    $("#btnPager").attr("page",n);
                    $("#btnRecord").trigger("click");
                }
            });



            if (persontype == 1) {
                $(".trick").html("员工");
            } else if (persontype == 2) {
                $(".trick").html("访客");
            } else {
                $(".trick").html("所有人员");
            }
            $(".slm").html(similarity * 100 + "%")

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
                $('#daterange-btn span').html(starttime + ' - ' + endtime);

                // $('#daterange-btn span').html(moment().subtract(1, 'months').format('YYYY-MM-DD H:mm') + ' - ' + moment().format('YYYY-MM-DD H:mm'));
                //日期控件初始化
                $('#daterange-btn').daterangepicker({
                        'locale': locale,
                        
                        timePicker24Hour: true,
                        
                        //汉化按钮部分
                        ranges: {
                            '今日': [moment().startOf('day'), moment().subtract(-1, 'days')],
                            '昨日': [moment().subtract(1, 'days').startOf('day'), moment().subtract(0, 'days').endOf('day')],
                            '最近7日': [moment().subtract(6, 'days').startOf('day'), moment().subtract(-1, 'days')],
                            '最近30日': [moment().subtract(29, 'days').startOf('day'), moment().subtract(-1, 'days')],
                            '本月': [moment().startOf('month'), moment().endOf('month')],
                            '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                        },
                        startDate: moment().subtract(29, 'days'),
                        endDate: moment()
                    },
                    function (start, end) {
                        $('#daterange-btn span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
                        var starttime = start.format('YYYY-MM-DD');
                        var endtime = end.format('YYYY-MM-DD');
                        $("#btnStarttime").attr("starttime", starttime);
                        $("#btnEndtime").attr("endtime", endtime);
                        $("#btnRecord").trigger("click");
                    }
                );
            };

            $(document).ready(function () {
                init();
            });
            
        })

    };
});