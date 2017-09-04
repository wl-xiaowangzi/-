/**
 * 修改头像
 * Author:land
 *   Date:2017/9/4
 */
define(["jquery",'artTemplate',"common/api","text!tpls/changePic.html","upload"],function ($,art,API,changePicTpl) {
    return function (cs_id) {


        // API.getCoursePic(cs_id,function(res){
            // console.log(res);

            // var coursePic=art.render(coursePicTpl,res.result);

            var $changePic=$(changePicTpl);



            $(".module-container").append($changePic);

            $changePic.find("#changePicUpload").uploadify({
                itemTemplate:"<span></span>",       //指定进度条的模板
                // formData:{cs_id:cs_id},                     //需要额外提交的表单数据
                fileObjName:"cs_cover_original",        //指定上传文件的时候，表单的name
                swf: 'assets/uploadify/uploadify.swf',  //指向本地的flash文件(.swf)
                uploader: '/api/uploader/cover',    //指向服务器的地址
                fileTypeExts: '*.gif; *.jpg; *.png', //限制上传文件类型
                buttonText:"选择图片",
                onUploadComplete:function(){
                    // $("#btnChangePWD").trigger("click");
                }
            })
        // })

    };
});