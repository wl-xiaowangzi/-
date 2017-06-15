/**
 * 编辑课程图片
 * Author:Wilbert
 *   Date:2017/6/14
 */
define(["jquery",'artTemplate',"common/api","text!tpls/coursePic.html","upload"],function ($,art,API,coursePicTpl) {
    return function (cs_id) {


        API.getCoursePic(cs_id,function(res){
            console.log(res);

            var coursePic=art.render(coursePicTpl,res.result);

            var $coursePic=$(coursePic);



            $(".module-container").append($coursePic);

            $coursePic.find("#coursePicUpload").uploadify({
                itemTemplate:"<span></span>",       //指定进度条的模板
                formData:{cs_id:cs_id},                     //需要额外提交的表单数据
                fileObjName:"cs_cover_original",        //指定上传文件的时候，表单的name
                swf: 'assets/uploadify/uploadify.swf',  //指向本地的flash文件(.swf)
                uploader: '/api/uploader/cover',    //指向服务器的地址
                fileTypeExts: '*.gif; *.jpg; *.png', //限制上传文件类型
                buttonText:"选择图片",
                onUploadComplete:function(){
                    $("#btnCourseManager").trigger("click");
                }
            })
        })

    };
});