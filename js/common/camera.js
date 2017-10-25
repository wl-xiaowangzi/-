/**
 * 相机
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/camera.html", "common/api","common/undetected"], function ($, art, cameraTpl,API, undetected) {
    return function (ps_type) {
        // 转换为jq对象
        var $camera = $(cameraTpl);
        // 拍照上传
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
                    // 关闭摄像头
                    mediaStreamTrack && mediaStreamTrack.stop();
                    $("#btnPeopleManager").attr("faceimage",res.data.faceimage);
                    $("#btnPeopleManager").attr("facedata",res.data.facedata);
                    $(".secPIC").attr("src",res.data.headfaceimage);
                    $camera.modal("hide");
                })
            })
        // 移除上一次调出的模板
        $("#modalcamera").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $camera.appendTo("body").modal();
        // 设置标题对应的值
        if(ps_type==1){
            $(".psType").html("员工");
        }else{
            $(".psType").html("访客");
        }
    };
});