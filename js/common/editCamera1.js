/**
 * 编辑相机1
 * Author:land
 *   Date:2017/9/24
 */
define(["jquery", "artTemplate", "text!tpls/camera.html", "common/api","common/undetected"], function ($, art, cameraTpl,API, undetected) {
    return function () {
        $("#modalcamera").remove();

        var $camera = $(cameraTpl);

        $camera
            .on("click", ".picture", function () {
                context.drawImage(video, 0, 0, 640, 480);
                //从画布上获取照片数据  
                var imgData = canvas.toDataURL("image/png");
                //将图片转换为Base64  
                var base64Data = imgData.substr(22);
                //将图片上传到服务器
                API.uploadImage(base64Data,function(res){
                     if (res.code != 0) {
                        undetected(res.message)
                        return
                    }
                    $(".btn-blue").parent().attr("firstFaceimages",res.data.faceimage);
                    $(".btn-blue").parent().attr("firstFacedatas",res.data.facedata);
                    $(".picture1").attr("src",res.data.headfaceimage)
                    $camera.modal("hide");
                })
            })

        $camera.appendTo("body").modal();

    };
});