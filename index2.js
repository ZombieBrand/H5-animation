! function () {
    // document.body.style.overflow = 'hidden'
    var $loading = $('#J-loading')
    var $progress = $('#J-progress-text')
    var prg = 0
    var timer = 0

    var now = new Date() // 记录当前时间
    var timeout = 5000 // 超时时间

    progress([80, 90], [1, 3], 100)

    window.onload = function () {
        complete()
    }

    if (now - loadingStartTime > timeout) { // 超时
        complete()
    } else {
        window.setTimeout(function () { // 未超时，则等待剩余时间
            complete()
        }, timeout - (now - loadingStartTime))
    }

    function complete() { // 封装完成进度功能
        progress(100, [1, 5], 10, function () {
            window.setTimeout(function () {
                $loading.hide()
            }, 1000)
        })
    }

    function progress(dist, speed, delay, callback) {
        var _dist = random(dist)
        var _delay = random(delay)
        var _speed = random(speed)
        window.clearTimeout(timer)
        timer = window.setTimeout(function () {
            if (prg + _speed >= _dist) {
                window.clearTimeout(timer)
                prg = _dist
                callback && callback()
            } else {
                prg += _speed
                progress(_dist, speed, delay, callback)
            }

            $progress.html(parseInt(prg) + '%')
            console.log(prg)
        }, _delay)
    }

    function random(n) {
        if (typeof n === 'object') {
            var times = n[1] - n[0]
            var offset = n[0]
            return Math.random() * times + offset
        } else {
            return n
        }
    }

    /* ------上边是Loding --------*/
    var money = $('.money')
    // 跷跷板直
    var seesawS = $('.seesaw1')
    // 跷跷板弯
    var seesawB = $('.seesaw2')
    // 话语1
    var talk = $('.talk')
    // person1
    var person1 = $('.person')
    // person2
    var person2 = $('.person2')
    // 楼直
    var towerS = $('.tower1')
    // 楼弯
    var towerB = $('.tower2')
    // var app = document.querySelector('#app');
    var app = document.querySelector('.first');
    var hammertime = new Hammer(app);
    var mark = null //标记动画顺序
    var deltaY = 0
    var time = null
    var isSwipe = false
    var key = 0
    hammertime.on('pan', function (ev) {
        // ev.isFirst  开始pan
        // ev.isFinal  结束pan
        // console.log(ev.srcEvent.path[0].classList[0] === 'money')
        var dY = deltaY + (-ev.deltaY);

        money.css('marginTop', `0`)
        if (ev.isFinal) {
            deltaY -= ev.deltaY
        }
        if (dY > 350) {
            dY = 350
        }
        if (dY > 250) {

            talk.css({
                'transform': 'scale(1,1)',
                'transition': 'transform,1s'
            })
        } else if (dY < 250) {
            talk.css({
                'transform': 'scale(0)',
                'transition': 'transform,1s'
            })
        }

        money.css('transform', `translate3d(0px,${dY}px,0px)`)
        key = 1
        switch(key){
            case 1:
            key =2
            
            break;
        }
        if (dY > 320 && ev.deltaY < 0) {
            clearTimeout(time)
            seesawS.css('opacity', '0')
            seesawB.css('opacity', '1')
            time = setTimeout(function () {
                mark = money.css('transform')
            }, 1000)


        } else if (dY < 320 && ev.deltaY > 0) {
            seesawS.css('opacity', '1')
            seesawB.css('opacity', '0')
            mark = null
        }
        if (/350/.test(mark) && ev.distance < 300 && ev.deltaY < 0) {
            towerS.addClass('tada animated')
            seesawB.addClass('swing animated')
            towerB.fadeIn('slow')
            towerS.fadeOut('slow')
            person1.css({
                'transform': `translate3d(0px,300px,0px)`,
                'transition': 'transform 1s'
            }).fadeOut('slow')
            clearTimeout(isSwipe)
            isSwipe = setTimeout(swipe, 500)

        }else if(/350/.test(mark) && ev.deltaY > 0){
            towerS.addClass('tada animated')
            seesawB.addClass('swing animated')
            towerB.fadeOut('slow')
            towerS.fadeIn('slow')
            person1.css({
                'transform': `translate3d(0px,0px,0px)`,
                'transition': 'transform 2s'
            }).css({
                'transform': `translate3d(0px,0px,0px)`,
                'transition': 'transform 2s'
            }).fadeIn('slow')
        }
    });
    //支持垂直方向
    hammertime.get('pan').set({
        direction: Hammer.DIRECTION_ALL
    });
    hammertime.get('swipe').set({
        direction: Hammer.DIRECTION_VERTICAL
    });




    /* swiper */
    function swipe() {
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical', // 垂直切换选项
            speed: 600,
            on: {
                slideNextTransitionEnd: function () {
                    console.log(this)

                    if (this.isEnd) {
                        console.log(this.isEnd, '2b')
                        // this.allowSlidePrev = true
                        this.allowSlideNext = false
                        this.allowSlidePrev = true

                    }

                },
                slidePrevTransitionEnd: function () {
                    if (this.isBeginning) {
                        console.log(this.isBeginning, '1a')
                        this.allowSlidePrev = false
                        this.allowSlideNext = true
                    }
                }

            }
            // on: {
            //     slideChangeTransitionEnd: function () {
            //         // console.log(this.activeIndex);
            //         //切换结束时，告诉我现在是第几个slide
            //         console.log(this);
            //         const slide_operation = slide_operation_map[this.activeIndex];
            //         if (slide_operation) {
            //             if (typeof slide_operation === 'function') {
            //                 slide_operation(this);
            //             } else if (Array.isArray(slide_operation)) {
            //                 slide_operation.forEach(opt => {
            //                     opt(this);
            //                 })
            //             }
            //         }
            //     },
            // }
        })

    }

}()