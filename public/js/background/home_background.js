/**
 *  @author : abhishek goswami
 *
 *  creating dots and connecting them with lines to create a cool effect
 */

(function($, w, d, t) {

    $.fn._homeBackgroundFunctions = function() {

        var width,
            height,
            container,
            canvas,
            ctx,
            points,
            target,
            animateHeader = true,
            circleRadius = 3,
            colorHexCode = {
                grey : '#2c2c2c',
                white : '#fff',
                black : '#000'
            },
            _Functions = {
                initContainer : function() {
                    container = d.getElementById('container');
                    width = w.innerWidth;
                    height = w.innerHeight;
                    target = {
                        x : width / 2,
                        y : height / 2
                    };
                    canvas = d.getElementById('demo-canvas');
                    canvas.width = width;
                    canvas.height = height;
                    canvas.style.backgroundColor = colorHexCode.grey;
                    // canvas.css('background-color', colorHexCode.grey);
                    ctx = canvas.getContext('2d');

                    // creating points
                    points = [];
                    for(var x = 0; x < width * 2; x = x + width / 3) {
                        for(var y = 0 ; y < height * 2; y = y + height / 3) {
                            var px = x + Math.random() * width / 3;
                            var py = y + Math.random() * height / 3;
                            var p = {x : px, originX : px, y : py, originY : py};
                            points.push(p);
                        }
                    }

                    // for each point find the three closest points
                    for(var i = 0; i < points.length; i++) {
                        var closest = [];
                        var p1 = points[i];
                        for(var j = 0; j < points.length; j++) {
                            var p2 = points[j]
                            if(!(p1 == p2)) {
                                var placed = false;
                                for(var k = 0; k < 3; k++) {
                                    if(!placed) {
                                        if(closest[k] == undefined) {
                                            closest[k] = p2;
                                            placed = true;
                                        }
                                    }
                                }

                                for(var k = 0; k < 3; k++) {
                                    if(!placed) {
                                        if(this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
                                            closest[k] = p2;
                                            placed = true;
                                        }
                                    }
                                }
                            }
                        }
                        p1.closest = closest;
                    }

                    // assign a circle to each point
                    for(var i in points) {
                        var c = new this.Circle(points[i], circleRadius, 'rgba(255,255,255,1)');
                        points[i].circle = c;
                    }

                    return _Functions;
                },

                // Circle class for creating a circle
                Circle : function(pos, rad, color) {
                    var _this = this;

                    // constructor
                    (function() {
                        _this.pos = pos || null;
                        _this.radius = rad || null;
                        _this.color = color || null;
                    })();

                    // i will be using arc method for creating the circles
                    // arc( x, y, radius, starting angle(radians), ending angle(radians), clockwise/ anti)
                    this.draw = function() {
                        if(!_this.active) return;
                        ctx.beginPath();
                        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
                        ctx.fillStyle = 'rgba(255, 255, 255,' + _this.active + ')';
                        ctx.fill();
                    };
                },

                getDistance : function(p1, p2) {
                    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
                },

                initAnimation : function() {
                    this.animate();
                    for(var i in points) {
                        _Functions.shiftPoint(points[i]);
                    }
                    return _Functions;
                },

                //clearRect function (x, y, width, height)
                animate : function() {
                    // console.log('in the animate function');
                    if(animateHeader) {
                        ctx.clearRect(0, 0, width, height);
                        for(var i in points) {
                            points[i].active = .12;
                            points[i].circle.active = 1;
                            _Functions.drawLines(points[i]);
                            points[i].circle.draw();
                        }
                    }
                    requestAnimationFrame(_Functions.animate);
                },

                // function to draw lines b/w points
                drawLines : function(p) {
                    // console.log('drawing lines');
                    if(!p.active) return;
                    for(var i in p.closest) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p.closest[i].x, p.closest[i].y);
                        ctx.strokeStyle = 'rgba(255,255,255,'+ p.active+')';
                        ctx.stroke();
                    }
                },

                shiftPoint : function(p) {
                    t.to(p, 1+1 * Math.random() * 10, {
                        x : p.originX - 50 + Math.random() * 100,
                        y : p.originY - 50 + Math.random() * 100,
                        onComplete : function() {
                            _Functions.shiftPoint(p);
                        }
                    });
                },

                addListeners : function() {
                    if(!('ontouchstart' in window)) {
                        $(w).on('mousemove', function(e){
                            var posx = posy = 0;
                            if(e.pageX || e.pageY) {
                                posx = e.pageX;
                                posy = e.pageY;
                            }
                            else if (e.clientX || e.clientY)    {
                                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                            }
                            target.x = posx;
                            target.y = posy;
                        });
                    }

                    $(w).on('scroll', function() {
                        if(d.body.scrollTop > height) animateHeader = false;
                        else animateHeader = true;
                    });

                    $(w).on('resize', function() {
                        width = w.innerWidth;
                        height = w.innerHeight;
                        container.style.height = height + 'px';
                        canvas.width = width;
                        canvas.height = height;
                    });

                    return _Functions;
                }
            }
        _Functions.initContainer().initAnimation().addListeners();
    }

    $.fn._homeBackgroundFunctions();

})(jQuery, window, document, TweenLite);