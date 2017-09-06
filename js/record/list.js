/**
 * 识别记录列表
 * Author:land
 *   Date:2017/8/30
 */
define(["jquery","artTemplate","text!tpls/recordList.html","common/api","./show","./add","./edit","moment","datetimepicker","datetimepickerLang","daterangepicker"],function ($,art,recordListTpl,API,recordShow,teacherAdd,recordEdit,moment) {
    return function () {

        // API.getTeacherList(function(res){

            // var teacherList=art.render(teacherListTpl,res);
            // var $teacherList=$(teacherList);

            var $recordList=$(recordListTpl);

            // //修改用户状态
            $recordList
            //     .on("click",".btn-status",function(){

            //     var tc_id=$(this).parent().attr("tc_id");
            //     var tc_status=$(this).parent().attr("tc_status");

            //     var btnStatus=this;


            //     API.changeTeacherStatus(tc_id,tc_status,function(res){

            //         //把新的状态值渲染到页面中
            //         var new_tc_status=res.result.tc_status;//1:"启用"  0:"注销"
            //         $(btnStatus).parent().attr("tc_status",new_tc_status);

            //         //修改按钮的文本
            //         $(btnStatus).text(new_tc_status==1?"注销":"启用");

            //         //修改账户状态列的文本
            //         $(btnStatus).parent().siblings(".col-status").text(new_tc_status==1?"启用":"注销");

            //     })
            // })
            //     //查看讲师
                .on("click",".btn-show",function(){
                    // var tc_id=$(this).parent().attr("tc_id");
                    
                    recordShow();
                })
            //     //添加讲师
            //     .on("click",".btn-add-teacher",function(){

            //         teacherAdd();
            //     })
            //     //编辑讲师
                .on("click",".btn-edit",function(){
                    // var tc_id=$(this).parent().attr("tc_id");

                    // recordEdit(tc_id);
                    recordEdit();
                })

            $(".module-container").append($recordList);
           


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
        $('#daterange-btn span').html(moment().subtract(1,'hours').format('YYYY-MM-DD H:mm') + ' - ' + moment().format('YYYY-MM-DD H:mm'));
        //日期控件初始化
        $('#daterange-btn').daterangepicker(
            {
                'locale': locale,
                timePicker : true, //是否显示小时和分钟 
                timePickerIncrement : 10, //时间的增量，单位为分钟 
                timePicker24Hour : true,
                timePicker12Hour : false, //是否使用12小时制来显示时间 
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
            }
       );
    };
    $(document).ready(function() {
        init();
        
    });
        // })


    };
});