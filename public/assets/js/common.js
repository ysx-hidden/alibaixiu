$("#logout").on("click", function() {
    let isConfirm = confirm("确定要退出吗？")
    if (isConfirm) {
        $.ajax({
            type: "post",
            url: "/logout",
            success() {
                location.href = "login.html"
            },
            error() {
                alert("退出失败")
            },
        })
    }
})
// 获取登录用户的信息
$.ajax({
    type: "get",
    url: "/users/" + userId,
    success(response) {
        // console.log(response)
        $(".avatar").attr("src", response.avatar)
        $(".profile .name").html(response.nickName)
    },
})
