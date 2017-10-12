/**
 * 访客添加首次相机
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/camera.html", "common/api","people/visitantAdd","common/undetected"], function ($, art, cameraTpl, API,addVisitor,undetected) {
    return function () {
        $("#modalcamera").remove();

        var $camera = $(cameraTpl);

        $camera
            .on("click", ".picture", function () {
                context.drawImage(video, 0, 0, 640, 480);
                //从画布上获取照片数据  
                var imgData = canvas.toDataURL("image/png");
                // 关闭摄像头
                mediaStreamTrack && mediaStreamTrack.stop();
                //将图片转换为Base64  
                var base64Data = imgData.substr(22);
                //将图片上传到服务器
                API.uploadImage(base64Data,function(res){
                    if (res.code != 0) {
                        undetected(res.message)
                        return
                    }
                    console.log(res)
                    var faceimages=res.data.faceimage;
                    var facedatas=res.data.facedata;
                    var headfaceimage=res.data.headfaceimage;
                    $camera.modal("hide")
                    addVisitor(faceimages,facedatas,headfaceimage)
                })
            })

        $camera.appendTo("body").modal();
        $(".psType").html("访客");
    };
});