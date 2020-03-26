let slideArr = []
// 获取轮播的图片
$.ajax({
    type: "get",
    url: "/slides",
    success(response) {
        slideArr = response
        render()
    },
})
// 定义一个渲染方法 免刷新
function render() {
    let html = template("tpl", { data: slideArr })
    $("tbody").html(html)
}
// 删除功能
$("tbody").on("click", ".deleteBtn", function() {
    if (confirm("确定要删除吗")) {
        let id = $(this).attr("data-id")
        $.ajax({
            type: "delete",
            url: "/slides/" + id,
            success(response) {
                slideArr = slideArr.filter(item => item._id != response._id)
                render()
            },
        })
    }
})
// 添加功能
// 第一步：先完成图片上传功能
$("#image").on("change", function() {
    let data = new FormData()
    data.append("img", this.files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data,
        processData: false,
        contentType: false,
        success(response) {
            let imgSrc = response[0].img
            // console.log(response)
            $(".thumbnail")
                .show()
                .attr("src", imgSrc)
            $("#hidden").val(imgSrc)
        },
    })
})
// 实现轮播图的添加功能
$("#btn").on("click", function() {
    let data = $("form").serialize()
    console.log(data)
    $.ajax({
        type: "post",
        url: "/slides",
        data,
        success(response) {
            slideArr.push(response)
            render()
            // 清空
            $(".thumbnail").hide()
            $("#image").val("")
            $("#hidden").val("")
            $("#text").val("")
            $("#link").val("")
        },
    })
})
