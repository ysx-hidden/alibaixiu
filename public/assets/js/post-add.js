// 获取文章分类数据, 显示在所属分类选项中
$.ajax({
    type: "get",
    url: "/categories",
    success(response) {
        let html = template("postAddTpl", { data: response })
        $("#category").html(html)
    },
})
// 文件上传功能
$("#feature").on("change", function() {
    let data = new FormData()
    data.append("img", this.files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data,
        // 只要是通过jquery实现上传文件功能  就需要设置下面两个属性
        processData: false,
        contentType: false,
        success(response) {
            // 预览上传的图片
            $(".thumbnail")
                .show()
                .attr("src", response[0].img)
            // 添加一个隐藏域, 保存上传图片后的地址
            $("#hiddenSrc").val(response[0].img)
        },
    })
})
// 文章添加功能
$("#publishBtn").on("click", function() {
    let data = $("form").serialize()
    console.log(data)
    $.ajax({
        type: "post",
        url: "/posts",
        data,
        success(response) {
            location.href = "posts.html"
        },
    })
})
// 从浏览器地址栏中获取查询参数
function getUrlParams(name) {
    // console.log(location.search.substr(1).split("&"))
    let params = location.search.substr(1).split("&")
    // 去掉等于号
    for (let i = 0; i < params.length; i++) {
        let tmp = params[i].split("=")
        if (tmp[0] == name) return tmp[1]
    }
    return -1
}
// 如果点击编辑按钮跳转到此页面, 就会有id, 否则返回-1
// console.log(getUrlParams("id"))
let id = getUrlParams("id")
// 文章编辑功能
if (id != -1) {
    $("#editBtn").show()
    $("#publishBtn").hide()
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success(response) {
            // console.log(response)
            $("h1").text("编辑文章")
            $("#title").val(response.title)
            $("#content").val(response.content)
            // 图片
            $(".thumbnail")
                .attr("src", response.thumbnail)
                .show()
            // 隐藏域
            $("#hidden").val(response.thumbnail)
            // 日期
            $("#created").val(response.createAt.substr(0, 16))
            // 分类
            $("#category option").each(function(index, item) {
                // console.log(item)
                // console.log($(item).attr("value"))
                if ($(item).attr("value") == response.category._id) {
                    $(item).prop("selected", true)
                }
            })
            // 状态
            $("#status option").each(function(index, item) {
                if ($(item).attr("value") == response.state) {
                    $(item).prop("selected", true)
                }
            })
        },
    })
}
$("#editBtn").on("click", function() {
    let data = $("form").serialize()
    $.ajax({
        type: "put",
        url: "/posts/" + id,
        data,
        success(response) {
            location.href = "posts.html"
        },
    })
})
