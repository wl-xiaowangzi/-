/**
 * 个人中心
 * Author:land
 *   Date:2017/9/3
 */
// "UEditor","UEditorConf"
define(["jquery", "artTemplate", "common/api", "text!tpls/personalCenter.html"], function ($, art, API, personalCenterTpl) {

    return function () {
      $.get("http://39.108.171.172:8081/facerecognition/system/user/query",{userid:2},function(res){

        console.log(res)
        $("#modalPersonalCenter").remove();

        var personalCenter=art.render(personalCenterTpl,res.data[0]);

        var $personalCenter = $(personalCenter);

        $personalCenter
        // .on("submit","form",function(){

        //     var formData=$(this).serialize();

        //     API.editSavePersonalCenter(formData,function(){
        //         location.href="/";//刷新页面
        //     })

        //     return false;
        // })



        $personalCenter.appendTo("body").modal();
        

        //设置出生日期的日期控件
        // $personalCenter.find(".date-birthday").datetimepicker({
        //     weekStart:1,//一周从哪一天开始。0（星期日）到6（星期六）
        //     format: 'yyyy-mm-dd',
        //     //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
        //     autoclose:true,
        //     minView:"month",
        //     todayBtn:true,
        //     todayHighlight:true,
        //     language:"zh-CN"
        // });

        //编辑器初始化
        // var ue = UE.getEditor('introduceContainer');



        },"jsonp")


    }
})