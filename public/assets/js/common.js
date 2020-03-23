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
