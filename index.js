!(function () {
    var heightc = window.screen.height
    var widthc = window.screen.width
    var ratio =(heightc/widthc).toFixed(1)
    var htmlFont = $('html').css('font-size').match(/^\d+.\d/)[0]
    var heightR = 64/htmlFont
    console.log(heightR)
    var abc = $('.abc')
    if(ratio >= 2){
        abc.css('height',heightR+'rem')
    }else{
        abc.css('height',0)
    }
    /* 样式兼容 */
    // document.body.style.overflow = 'hidden'
    var $loading = $("#J-loading");
    var $progress = $("#J-progress-text");
    var prg = 0;
    var timer = 0;

    var now = new Date(); // 记录当前时间
    var timeout = 5000; // 超时时间

    progress([80, 90], [1, 3], 100);

    window.onload = function () {
        complete();
    };

    if (now - loadingStartTime > timeout) {
        // 超时
        complete();
    } else {
        window.setTimeout(function () {
            // 未超时，则等待剩余时间
            complete();
        }, timeout - (now - loadingStartTime));
    }

    function complete() {
        // 封装完成进度功能
        progress(100, [1, 5], 10, function () {
            window.setTimeout(function () {
                $loading.hide();
            }, 1000);
        });
    }

    function progress(dist, speed, delay, callback) {
        var _dist = random(dist);
        var _delay = random(delay);
        var _speed = random(speed);
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
            if (prg + _speed >= _dist) {
                window.clearTimeout(timer);
                prg = _dist;
                callback && callback();
            } else {
                prg += _speed;
                progress(_dist, speed, delay, callback);
            }

            $progress.html(parseInt(prg) + "%");
            console.log(prg);
        }, _delay);
    }

    function random(n) {
        if (typeof n === "object") {
            var times = n[1] - n[0];
            var offset = n[0];
            return Math.random() * times + offset;
        } else {
            return n;
        }
    }

    /* ------上边是Loding --------*/
    var first = $(".first");
    var money = $(".money");
    // 跷跷板直
    var seesawS = $(".seesaw1");
    // 跷跷板弯
    var seesawB = $(".seesaw2");
    // 话语1
    var talk = $(".talk");
    // person1
    var person1 = $(".person");
    // person2
    var person2 = $(".person2");
    // 楼直
    var towerS = $(".tower1");
    // 楼弯
    var towerB = $(".tower2");
    // 话语2
    var talk2 = $('.talk2')
    // 线
    var line = $('.line')
    // 数字
    var num = $('.num')
    // var app = document.querySelector('#app');
    var app = document.querySelector(".first");
    var hammertime = new Hammer(app);
    var mark = null; //标记动画顺序
    var deltaY = 0;
    var time = null;
    var isSwipe = false;
    var key = false;
    hammertime.on("pan", function (ev) {
        // ev.isFirst  开始pan
        // ev.isFinal  结束pan
        // console.log(ev.srcEvent.path[0].classList[0] === 'money')
        var dY = deltaY + -ev.deltaY;
        money.css("marginTop", `0`);
        if (ev.isFinal) {
            deltaY -= ev.deltaY;
        }
        if (dY > 350) {
            dY = 350;
        }
        if (dY > 250) {
            talk.css({
                transform: "scale(1,1)",
                transition: "transform,1s"
            });
        } else if (dY < 250) {
            talk.css({
                transform: "scale(0)",
                transition: "transform,1s"
            });
        }

        money.css("transform", `translate3d(0px,${dY/37.5}rem,0px)`);

        if (dY > 320 && ev.deltaY < 0) {
            clearTimeout(time);
            seesawS.css("opacity", "0");
            seesawB.css("opacity", "1");
            time = setTimeout(function () {
                mark = money.css("transform");
                console.log(mark)
            }, 1000);
        } else if (dY < 320 && ev.deltaY > 0) {
            seesawS.css("opacity", "1");
            seesawB.css("opacity", "0");
            mark = null;
        }
        // ev.distance < 500
        // if (/350/.test(mark) && ev.deltaY < 0) {
        if (/3/.test(mark) && ev.deltaY < 0) {
            towerS.addClass("tada animated");
            seesawB.addClass("swing animated");
            towerB.fadeIn("slow");
            towerS.fadeOut("slow");
            person1
                .css({
                    'transform': `translate3d(0px,300px,0px)`,
                    'transition': "transform 1s"
                })
                .fadeOut("slow");
            first.removeClass("stop-swiping");
            clearTimeout(isSwipe);
            isSwipe = setTimeout(swipe, 500);
            key = true
            // } else if (/350/.test(mark) && ev.deltaY > 0) {
        } else if (/3/.test(mark) && ev.deltaY > 0) {
            towerS.addClass("tada animated");
            seesawB.addClass("swing animated");
            towerB.fadeOut("slow");
            towerS.fadeIn("slow");
            person1
                .css({
                    'transform': `translate3d(0px,0px,0px)`,
                    'transition': "transform 2s"
                })
                .css({
                    'transform': `translate3d(0px,0px,0px)`,
                    'transition': "transform 2s"
                })
                .fadeIn("slow");
            first.addClass("stop-swiping");
            deltaY = 355;
            key = false
        }
    });
    if (key) {

    }
    //支持垂直方向
    hammertime.get("pan").set({
        direction: Hammer.DIRECTION_ALL
    });
    hammertime.get("swipe").set({
        direction: Hammer.DIRECTION_VERTICAL
    });

    /* swiper */
    function swipe() {
        var mySwiper = new Swiper(".swiper-container", {
            direction: "vertical", // 垂直切换选项
            speed: 2000,
            noSwiping: true,
            noSwipingClass: "stop-swiping",
            on: {
                init: function () {
                    this.allowSlidePrev = false;
                },
                slideNextTransitionStart: function () {
                    if (this.isEnd) {
                        // this.allowSlidePrev = true
                        this.allowSlideNext = false;
                        this.allowSlidePrev = true;
                        talk2.fadeIn('fast').css({
                            'transform': 'translate3d(0px,17.3333rem,0px)',
                            'transition': 'transform 2s'
                        });
                        line.fadeIn('fast').css({
                            'transform': 'translate3d(0px,15.62666rem,0px)',
                            'transition': 'transform 1s'
                        });
                        person2.fadeIn('fast').css({
                            'transform': 'translate3d(0px,22.13333rem,0px) rotate(1turn)',
                            'transition': 'transform 2s'
                        });
                        setTimeout(function () {
                            num.fadeIn('fast')
                        }, 2200)
                    }
                },
                slidePrevTransitionStart: function () {
                    if (this.isBeginning) {
                        this.allowSlidePrev = false;
                        this.allowSlideNext = true;
                        talk2.css({
                            'transform': 'translate3d(0px,0px,0px)',
                            'transition': 'transform 2s'
                        }).fadeOut(2000);
                        line.css({
                            'transform': 'translate3d(0px,0px,0px)',
                            'transition': 'transform 1s'
                        }).fadeOut(2000);
                        person2.css({
                            'transform': 'translate3d(0px,0px,0px) rotate(-1turn)',
                            'transition': 'transform 2s'
                        }).fadeOut(2000)
                        setTimeout(function () {
                            num.fadeOut('fast')
                        }, 2200)
                    }
                }
            }
        });
    }
})();