/**
 * 相机
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/camera.html", "common/api","common/undetected"], function ($, art, cameraTpl,API, undetected) {
    return function (ps_type) {
        $("#modalcamera").remove();

        var $camera = $(cameraTpl);

        $camera
            .on("click", ".picture", function () {
                context.drawImage(video, 0, 0, 640, 480);
                // 关闭摄像头
                mediaStreamTrack && mediaStreamTrack.stop();
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
                    $("#btnPeopleManager").attr("faceimage",res.data.faceimage);
                    $("#btnPeopleManager").attr("facedata",res.data.facedata);
                    $(".secPIC").attr("src",res.data.headfaceimage);
                    $camera.modal("hide");
                })
            })
            .on("click","#close",function(){
                
                
            },false)

        $camera.appendTo("body").modal();
        if(ps_type==1){
            $(".psType").html("员工");
        }else{
            $(".psType").html("访客");
        }
        
    };
});