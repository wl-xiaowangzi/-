/**
 * 员工添加首次相机
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/camera.html", "common/api", "people/add","common/undetected"], function ($, art, cameraTpl, API, addEmployee,undetected) {
    return function () {
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
                API.uploadImage(base64Data, function (res) {
                    if (res.code != 0) {
                        undetected(res.message)
                        return
                    }
                   // 关闭摄像头
                    mediaStreamTrack && mediaStreamTrack.stop();
                    var faceimages = res.data.faceimage;
                    var facedatas = res.data.facedata;
                    var headfaceimage=res.data.headfaceimage;
                    $("#btnFirstFacedata").attr("firstFaceimages",faceimages);
                    $("#btnFirstFacedata").attr("firstFacedatas",facedatas);
                    $(".mainPIC").attr("src",headfaceimage);
                    $camera.modal("hide")
                })
            })
            .on("click",".close",function(){
                // 关闭摄像头
                mediaStreamTrack && mediaStreamTrack.stop();
                $camera.modal("hide");
            })
        // 移除上一次点出的模态框
        $("#modalcamera").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        $camera.appendTo("body").modal();
        // 修改标题
        $(".psType").html("员工");
    };
});