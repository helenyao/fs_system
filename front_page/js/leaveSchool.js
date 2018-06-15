//添加缴纳取暖费信息
function add(obj){
    var tr = `<tr>
                <td>
                    <input type="checkbox" name="" id="a1" class="selectItem">
                </td>
                <td>${obj.num}</td>
                <td>${obj.datepicker}</td>
                <td>${obj.datepicker2}</td>
                <td>
                    <span class="del">删除</span> /
                    <span class="change" data-toggle="modal" data-target="#myModal">修改</span>
                </td>
            </tr>`;
    $("#mod tbody").prepend(tr);
}
    //提交按钮
$(".btn-primary").on("click",function(e){
    var comNum = 0;
    var objLength = 0;
    var obj = {
        "num": $("#num").val(),//学号
        "datepicker": $("#datepicker").val(),//休学日期
        "datepicker2": $("#datepicker2").val()//复学日期
    }
    // console.log(obj)

    for( var i in obj ){
        objLength++;
        if(obj[i]) comNum++;
    }

    if(comNum < objLength) $(".pop").css({display:"inline"});
    else{
        $(".btn-default").trigger("click");         //关闭模态框
        if( $(".btn-primary").attr("genre") == "add" ) add(obj);  //根据标识判断操作是修改还是添加
    }

});
//添加信息
$(".add").on("click",function(){
    $(".btn-primary").attr("genre","add"); //点击提交按钮时设置标识 添加
    $(".pop").css({display:"none"});
    $("#myModalLabel").html("添加休学信息");         //初始化模态框字段 置空
    $("#num").val("");
    $("#datepicker").val("");
    $("#datepicker2").val("");
})

//修改信息
$("body").on("click",".change",function(){
    var that = this;
    $(".btn-primary").attr("genre","mod"); //点击提交按钮时设置标识 添加
    $(".pop").css({display:"none"});
    $("#myModalLabel").html("修改休学信息");

    var obj = {
        "datepicker2": $(this).parent().prev().html(), //复学日期
        "datepicker": $(this).parent().prevAll().eq(1).html(), //休学日期
        "num": $(this).parent().prevAll().eq(2).html(),//学号
    }
                
    $("#num").val(obj.num);//初始化模态框字段
    $("#datepicker2").val(obj.datepicker2);
    $("#datepicker").val(obj.datepicker);

    $(".btn-primary").on("click",function(){
        var comNum = 0;
        var objLength = 0;
        var obj = {
            "datepicker2": $("#datepicker2").val(),
            "datepicker": $("#datepicker").val(),
            "num": $("#num").val()
        }
        

        for( var i in obj ){
            objLength++;
            if(obj[i]) comNum++;
        }

        if(comNum < objLength) $(".pop").css({display:"inline"});
        else{
            $(".btn-default").trigger("click");         //关闭模态框
            if( $(".btn-primary").attr("genre") == "mod" )//根据标识判断操作是修改还是添加
            {  
                $(that).parent().prevAll().eq(2).html(obj.num)
                $(that).parent().prevAll().eq(1).html(obj.datepicker)
                $(that).parent().prev().html(obj.datepicker2)
            }
        }
    });
})

// 删除公寓  通过事件委托解决新添加的元素绑定不上事件的问题
$("body").on("click",".del",function () {
    var res = confirm("确认删除吗？");
    if (!res) return;
    else {
        var ele = this.parentNode.parentNode;
        $(ele).remove();
    }
})

// 全选
var flag1 = true;
$(".selectAll").on("click",function(){
    if(flag1)
    {
        $(".selectItem").prop("checked",true);
        flag1 = !flag1;
    }
    else{
        $(".selectItem").prop("checked",false);
        flag1 = !flag1;
    }
})

// 批量删除
var selectNum = 0;
$(".deletes").on("click",function(){
    if( $(".selectAll").prop("checked") ) selectNum = -1;
    else selectNum = 0;
    $(".selectItem").each(function(index,item){
        if( $(item).prop("checked") ) selectNum++;
    })
    if(!selectNum) alert("未选中任何删除项！");
    else{
        var res = confirm("确认删除该 "+selectNum+" 项数据？");
        if(res) alert("请求已发送！");
    }
})