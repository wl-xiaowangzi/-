/**
 * 个人中心
 * Author:Wilbert
 *   Date:2017/6/16
 */
define(["jquery","artTemplate","common/api","text!tpls/personalCenter.html","UEditor","UEditorConf"],function($,art,API,personalCenterTpl){

    return function(){
        API.editPersonalCenter(function(res){


            $("#modalPersonalCenter").remove();

            var personalCenter=art.render(personalCenterTpl,res.result);

            var $personalCenter=$(personalCenter);
            
            $personalCenter
                .on("submit","form",function(){
                
                    var formData=$(this).serialize();

                    API.editSavePersonalCenter(formData,function(){
                        location.href="/";//刷新页面
                    })

                    return false;
                })
                .on("scroll",".modal-body",function(e){
                    console.log(1);
                })


            $personalCenter.appendTo("body").modal();

            //设置出生日期的日期控件
            $personalCenter.find(".date-birthday").datetimepicker({
                weekStart:1,//一周从哪一天开始。0（星期日）到6（星期六）
                format: 'yyyy-mm-dd',
                //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
                autoclose:true,
                minView:"month",
                todayBtn:true,
                todayHighlight:true,
                language:"zh-CN"
            });

            //编辑器初始化
            var ue = UE.getEditor('introduceContainer');



        })


    }
})