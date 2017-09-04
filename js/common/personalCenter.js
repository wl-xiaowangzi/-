/**
 * 个人中心
 * Author:land
 *   Date:2017/9/3
 */
// "UEditor","UEditorConf"
define(["jquery","artTemplate","common/api","text!tpls/personalCenter.html","upload"],function($,art,API,personalCenterTpl){

    return function(){
        // API.editPersonalCenter(function(res){


            $("#modalPersonalCenter").remove();

            // var personalCenter=art.render(personalCenterTpl,res.result);

            var $personalCenter=$(personalCenterTpl);
            
            $personalCenter
                // .on("submit","form",function(){
                
                //     var formData=$(this).serialize();

                //     API.editSavePersonalCenter(formData,function(){
                //         location.href="/";//刷新页面
                //     })

                //     return false;
                // })
                .on("scroll",".modal-body",function(e){
                    console.log(1);
                })
                


            $personalCenter.appendTo("body").modal();
             $personalCenter.find("#changePicUpload").uploadify({
                itemTemplate:"<span></span>",       //指定进度条的模板
                // formData:{cs_id:cs_id},                     //需要额外提交的表单数据
                fileObjName:"cs_cover_original",        //指定上传文件的时候，表单的name
                swf: 'assets/uploadify/uploadify.swf',  //指向本地的flash文件(.swf)
                uploader: '/api/uploader/cover',    //指向服务器的地址
                fileTypeExts: '*.gif; *.jpg; *.png', //限制上传文件类型
                buttonText:"选择图片",
                onUploadComplete:function(){
                    $("#btnPersonalCenter").trigger("click");
                }
            })

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



        // })


    }
})