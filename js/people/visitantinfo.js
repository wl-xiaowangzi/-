/**
 * 编辑基本信息
 * Author:land
 *   Date:2017/9/1
 */
define(["jquery","artTemplate","common/api","text!tpls/peopleVisitantInfo.html"],function ($,art,API,peopleVisitantInfoTpl) {

    return function(vs_id){
        //把渲染好的元素放到页面中
        //根据访客id获取访客基本信息
        API.getVisitorBaseInfo(vs_id,function(res){

            var peopleVisitantInfo=art.render(peopleVisitantInfoTpl,res.data[0]);

            var $peopleVisitantInfo=$(peopleVisitantInfo);

            $("#modalVisitantEditInfo").remove();
            $peopleVisitantInfo.appendTo("body").modal();

        
            //渲染入库日期-->日期控件
            $peopleVisitantInfo.find(".date-join").datetimepicker({
                weekStart:1,//一周从哪一天开始。0（星期日）到6（星期六）
                format: 'yyyy-mm-dd h:mm',
                //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
                autoclose:true,
                // minView:"month",
                todayBtn:true,
                todayHighlight:true,
                language:"zh-CN"
            });
       })
    }
})