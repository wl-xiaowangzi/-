/**
 * 这是注释的内容
 * Author:land
 *   Date:2017/9/6
 */
define(["jquery"],function($){
    return {
        /**
        //  * 获取课程对应的课时信息
        //  * @param cs_id 课程id
        //  * @param callback 接口响应成功了，执行该回调函数
        //  */
        
        // getCourseLesson:function(cs_id,callback){
        //     $.get("/api/course/lesson",{cs_id:cs_id},function(res){
        //         if(res.code!=200){
        //             console.log(res.msg);
        //             return;
        //         }

        //         //接口响应成功了
        //         callback && callback(res);

        //     })
        // },

        // /**
        //  * 根据指定的课时id获取相应的课时信息
        //  * @param ct_id 课时id
        //  * @param callback 接口响应成功了，执行该回调函数
        //  */
        // editCourseTime:function(ct_id,callback){
        //     $.get("/api/course/chapter/edit",{ct_id:ct_id},function(res){
        //         if(res.code!=200){
        //             console.log(res.msg);
        //             return;
        //         }

        //         //接口响应成功了
        //         callback && callback(res);

        //         //editCourseTime(10,function(){})
        //         //editCourseTime(10)
        //     })
        // },
        // /**
        //  * 编辑课时表单提交
        //  * @param formData
        //  * @param callback
        //  */
        // modifyCourseTime:function(formData,callback){
        //     $.post("/api/course/chapter/modify",formData,function(res){
        //         if(res.code!=200){
        //             console.log(res.msg);
        //             return;
        //         }

        //         callback && callback();

        //     })
        // },
        /**
         * 根据员工id获取员工基本信息
         * @param ep_id 员工id
         * @param callback
         */
        getEmployeeBaseInfo:function(ep_id,callback){
            $.get("http://39.108.171.172:8081/facerecognition/system/employee/query",{employeeid:ep_id},function(res){
                if(res.code!=0){
                    console.log(res.msg);
                    return;
                }
                callback && callback(res);
            },"jsonp")
        },

//         /**
//          * 修改讲师账户状态
//          * @param tc_id 讲师id
//          * @param tc_status 讲师账户原来的状态
//          * @param callback
//          */
//         changeTeacherStatus:function(tc_id,tc_status,callback){
//             this.ajax("post","teacher/handle",{tc_id:tc_id,tc_status:tc_status},callback);
//         },

//         /**
//          * 实现查看讲师
//          * @param tc_id
//          * @param callback
//          */
//         showTeacher:function(tc_id,callback){
//             this.ajax("get","teacher/view",{tc_id:tc_id},callback);
//         },
//         /**
//          * 实现添加讲师
//          * @param formData
//          * @param callback
//          */
//         addEmployee:function(formData,callback){
//             this.ajax("post","api/employee/add",formData,callback);
//         },
//         /**
//          * 根据讲师id获取讲师原来的基本信息
//          */
//         editTeacher:function(tc_id,callback){
//             this.ajax("get","teacher/edit",{tc_id:tc_id},callback);
//         },
//         /**
//          * 编辑保存
//          */
//         editSaveTeacher:function(formData,callback){
//             this.ajax("post","teacher/update",formData,callback);
//         },
//         /**
//          * 个人中心——>获取讲师原来的详细信息
//          * @param callback
//          */
//         editPersonalCenter:function(callback){
//             this.ajax("get","teacher/profile",{},callback);
//         },
//         /**
//          * 个人中心——>保存讲师原来的信息
//          * @param callback
//          */
//         editSavePersonalCenter:function(formData,callback){
//             this.ajax("post","teacher/modify",formData,callback);
//         }
    }
})