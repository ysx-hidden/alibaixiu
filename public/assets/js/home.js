// 获取轮播图的数据
$.ajax({
    type: "get",
    url: "/slides",
    success(response) {
        // console.log(response)
        let html = template("slidesTpl", { data: response })
        $("#slidesBox").html(html)
        // 轮播图代码放在这里，因为ajax是异步的，只有ajax请求成功才能执行这个代码
        var swiper = Swipe(document.querySelector(".swipe"), {
            auto: 3000,
            transitionEnd: function(index) {
                // index++;
                $(".cursor span")
                    .eq(index)
                    .addClass("active")
                    .siblings(".active")
                    .removeClass("active")
            },
        })
        // 上/下一张
        $(".swipe .arrow").on("click", function() {
            var _this = $(this)
            if (_this.is(".prev")) {
                swiper.prev()
            } else if (_this.is(".next")) {
                swiper.next()
            }
        })
    },
})
// 获取热门推荐数据
$.ajax({
    type: "get",
    url: "/posts/recommend",
    success(response) {
        // console.log(response)
        let html = template("recommendTpl", { data: response })
        $("#recommend").html(html)
    },
})
// 最新发布
$.ajax({
    type: "get",
    url: "/posts/lasted",
    success(response) {
        // console.log(response)
        let html = template("newTpl", { data: response })
        $("#new").append(html)
    },
})
