/**
 *
 * Author:Wilbert
 *   Date:2017/6/16
 */
define(["jquery","artTemplate","text!tpls/chart.html","eCharts","common/api"],function ($,art,chartTpl,echarts,API) {
    return function () {

        API.getTeacherList(function(res){

            var genders=[
                {name:"男",value:0},
                {name:"女",value:0},
            ]

            res.result.forEach(function(v){
                //v：每一个讲师的信息
                if(v.tc_gender==0){//男
                    genders[0].value++;
                }else{//女
                    genders[1].value++;
                }



            })

            var chart=art.render(chartTpl);

            var $chart=$(chart);


            $(".module-container").append($chart);


            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init($(".module-container").find("#main").get(0));

            // var genders=[
            //     {name:"男",value:100},
            //     {name:"女",value:70},
            //     {name:"未知",value:150}
            // ]

            var option = {
                title : {
                    text: 'Itcast',
                    subtext: '5大学科',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: genders.map(function(v){
                        return v.name
                    })
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:genders,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };



            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        })


    };
});