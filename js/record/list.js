/**
 * 识别记录列表
 * Author:land
 *   Date:2017/8/30
 */
define(["jquery", "artTemplate", "text!tpls/recordList.html", "common/api", "./show", "./edit", "moment", "datetimepicker", "datetimepickerLang", "daterangepicker"], function ($, art, recordListTpl, API, recordShow, recordEdit, moment) {
    return function () {
        var organizationid = $.cookie("organizationid");
        var time = new Date();
        var starttime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours()+ ':' + time.getMinutes();
        var endtime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' +(time.getHours()+1) + ':' + time.getMinutes();
        var starttime = $("#btnStarttime").attr("starttime") || starttime;
        var endtime = $("#btnEndtime").attr("endtime") || endtime;
        var similarity = $("#btnSimilarity").attr("similarity") || 0.75;
        $("#btnStarttime").removeAttr("starttime");
        $("#btnEndtime").removeAttr("endtime");
        $("#btnSimilarity").removeAttr("similarity");

        var start = 0;
        var limit = 30;

        console.log(starttime, endtime, similarity)
        API.getRecordList(organizationid, starttime, endtime, start, limit, function (res) {
            console.log(res)
            //编译模板
            var recordList = art.render(recordListTpl, res);
            var $recordList = $(recordList);

            // //修改用户状态
            $recordList

                //     //查看详细信息
                .on("click", ".btn-show", function () {
                    var ps_id = $(this).parent().attr("ps_id");
                    var ps_type = $(this).parent().attr("ps_type");
                    recordShow(ps_id, ps_type);
                })

                //     //查看最近信息
                .on("click", ".btn-edit", function () {
                    var ps_id = $(this).parent().attr("ps_id");

                    recordEdit(ps_id);
                })
                .on("click", ".similarity li a", function () {
                    var similarity = $(this).attr("similarity");
                    console.log(similarity)
                    $("#btnSimilarity").attr("similarity", similarity);
                    $("#btnRecord").trigger("click");
                })

            $(".module-container").append($recordList);

            $(".slm").html(similarity * 100 + "%")

            function init() {
                //定义locale汉化插件
                var locale = {
                    "format": 'YYYY-MM-DD H:mm',
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
                        timePicker: true, //是否显示小时和分钟 
                        timePickerIncrement: 10, //时间的增量，单位为分钟 
                        timePicker24Hour: true,
                        timePicker12Hour: false, //是否使用12小时制来显示时间 
                        //汉化按钮部分
                        ranges: {
                            '今日': [moment().startOf('day'), moment()],
                            '昨日': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                            '最近7日': [moment().subtract(6, 'days').startOf('day'), moment()],
                            '最近30日': [moment().subtract(29, 'days').startOf('day'), moment()],
                            '本月': [moment().startOf('month'), moment().endOf('month')],
                            '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                        },
                        startDate: moment().subtract(29, 'days'),
                        endDate: moment()
                    },
                    function (start, end) {

                        $('#daterange-btn span').html(start.format('YYYY-MM-DD H:mm') + ' - ' + end.format('YYYY-MM-DD H:mm'));
                        var starttime = start.format('YYYY-MM-DD H:mm');
                        var endtime = end.format('YYYY-MM-DD H:mm');
                        $("#btnStarttime").attr("starttime", starttime);
                        $("#btnEndtime").attr("endtime", endtime);
                    }
                );
            };

            $(document).ready(function () {
                init();
            });
            $(".daterangepicker .ranges li").on("click", function () {
                $("#btnRecord").trigger("click");
            })
            $(".applyBtn").on("click", function () {
                $("#btnRecord").trigger("click");
            })
        })

    };
});