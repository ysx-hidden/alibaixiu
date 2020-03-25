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
    console.log(1)
    let data = $("form").serialize()
    $.ajax({
        type: "post",
        url: "/posts",
        data,
        success(response) {
            location.href = "posts.html"
        },
    })
})
