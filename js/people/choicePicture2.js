/**
 * 编辑选择照片2
 * Author:land
 *   Date:2017/10/17
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/peopleChoicePicture.html", "common/editCamera2"], function ($, art, API, peopleChoicePictureTpl,editCamera2) {
    return function (ps_id,ps_type,ps_name) {
        // 获取参数
        var organizationid = $.cookie("organizationid");
        var time = new Date();
        var starttime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();
        var endtime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (time.getDate()+1) + ' ' + time.getHours() + ':' + time.getMinutes();
        var page = $("#btnPager").attr("page")||1;
        var start = 0;
        var limit = 50*(page)-1;
        var similarity = $("#btnSimilarity").attr("similarity") || 0.75;
        var persontype = ps_type;
        var keyword = $("#btnSearchWords").attr("keyword");
        var personid=ps_id;
        // 清除参数
        $("#btnPager").removeAttr("page");
        // 调用识别记录接口
        API.queryRecordList(starttime, endtime, start, limit,persontype,similarity,keyword,personid, function (res) {
            //编译模板
            var peopleChoicePicture = art.render(peopleChoicePictureTpl, res);
            var $peopleChoicePicture = $(peopleChoicePicture);
            // 设置事件
            $peopleChoicePicture
                .on("click",".editCamera1",function(){
                    $peopleChoicePicture.modal("hide");
                    editCamera2();
                })
                .on("click",".replaceIMG",function(){
                    // 设置点击样式
                    $(this).siblings().removeClass("opacity05");
                    $(this).addClass("opacity05");
                     // 调用接口
                    var datanumber = $(this).attr("datanumber");
                    API.showRecord(starttime,endtime,start,limit,datanumber,function(res){
                    // 保存人脸数据
                    if(res.data.list[0].facedata==null){alert("该数据已损坏，请重新选择");return}
                    var data = res.data.list[0].facedata.replace(/\[|]/g, '')
                    if(data.substr(data.length-1,1)==","){
                        alert("该数据已损坏，请重新选择");
                        return
                    }
                    var facedata2 = "["+data+"]";
                    var facedata2 = JSON.parse(facedata2);
                    console.log(facedata2.length)
                    if(facedata2.length!=1024){alert("该数据已损坏，请重新选择");return}
                    var secondFacedatas = res.data.list[0].facedata.replace(/\s/g,"");
                    var secondFaceimages = res.data.list[0].faceimage;
                    $(".btn-blue").attr("secondFaceimages",secondFaceimages);
                    $(".btn-blue").attr("secondFacedatas",secondFacedatas);
                    $(".btn-blue").attr("facetypes2","2");
                    $(".picture2").attr("src",res.data.list[0].faceimage);
                    // $peopleChoicePicture.modal("hide");
                    $peopleChoicePicture.css("width",0);
                    $(".modal-backdrop").remove();
                    })
                })
                .on("click",".loadMore",function(){
                    page++
                    // editLoadMore(ps_id,ps_type,page)
                })
            // 移出上一次的模态框
            $("#modalPeopleChoicePicture").remove();
            // 移除弹出层，防止重复点击造成页面卡顿
            $(".modal-backdrop").remove();
            // 渲染数据
            $peopleChoicePicture.appendTo("body").modal();
            $(".replaceName").html(ps_name)
        })
    };
});