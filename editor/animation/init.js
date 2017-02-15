//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function powerSupplyCanvas(dom, dataInp, dataExp) {

            var color = {
                blue: "#65A1CF",
                base: "#294270",
                orange: "#FAAB00",
                white: "#FFFFFF",
            };
            var ord = 0;
            var delay = 200;
            var nw = dataInp[0],
                pp = dataInp[1],
                cities = {},
                all_cities = []; 

            for (var i=0; i < nw.length; i += 1) {
                for (var j=0; j < 2; j+=1) {
                    var [n1, n2] = [nw[i][j], nw[i][1-j]];
                    if (! cities[n1]) {
                        cities[n1] = {
                            power: 0, 
                            net: [n2], 
                            co: dataExp[1].indexOf(n1),
                            num: ord
                        };
                        ord += 1;
                        if (pp[n1]) {
                            cities[n1].power = pp[n1];
                        } else {
                            all_cities.push(n1);
                        }
                    } else {
                        cities[n1].net.push(n2);
                    }
                }
            }

            function createCirclesCanvas(paper, circlesSet) {
                var radius = 15;
                var attrCircle = {
                    "stroke": color.base,
                    "stroke-width": 3, 
                    "fill": color.white
                };
                for (var c in cities) {
                    var [x, y] = [cities[c].co % 5,
                        Math.floor(cities[c].co / 5)];
                    circlesSet.push(
                        paper.circle(
                            x * 63 + 20, 
                            y * 63 + 22, 
                            radius
                        ).attr(attrCircle));
                    circlesSet[circlesSet.length-1].city = c;
                }
                return paper;
            }

            function createLinePath(x1, y1, x2, y2) {
                return "M" + x1 + "," + y1 + "L" + x2 + "," + y2;
            }

            //
            // M A I N
            //
            var canvas = Raphael(dom, 300, 300, 0, 0);
            var circleSet = canvas.set();

            // drow circles of cities and power-plant
            createCirclesCanvas(canvas, circleSet);

            // text set
            var numbers = canvas.set();
            var attrText = {"stroke": color.base, "font-size": 14};
            for (var i = 0; i < circleSet.length; i+=1) {
                numbers.push(canvas.text(
                    circleSet[i].attr().cx,
                    circleSet[i].attr().cy,
                    circleSet[i].city
                ).attr(attrText));
            }

            // draw blue line (and prepare orange line)
            var lineDict = canvas.set();
            var attrLine = {"stroke-width": 4, "stroke": color.blue};
            var attrLine_orange
                = {"stroke-width": 4, "stroke": color.orange};
            nw.forEach((nodes)=>{
                var start = cities[nodes[0]].num;
                var end = cities[nodes[1]].num;
                var x1 = circleSet[start].attr().cx;
                var y1 = circleSet[start].attr().cy;
                var x2 = circleSet[end].attr().cx;
                var y2 = circleSet[end].attr().cy;
                canvas.path(createLinePath(x1, y1, x2, y2)).attr(attrLine);
                var sp_line1 = canvas.path(
                    createLinePath(x1, y1, x1, y1)).attr(attrLine_orange);
                var sp_line2 = canvas.path(
                    createLinePath(x2, y2, x2, y2)).attr(attrLine_orange);
                lineDict[nodes[0] + nodes[1]] = sp_line1;
                lineDict[nodes[1] + nodes[0]] = sp_line2;
            });

            lineDict.toFront();
            circleSet.toFront();
            numbers.toFront();

            // prepare PowerPlant
            var tgt_cities = [];
            for (var o in pp){
                if (pp[o]) {
                    tgt_cities.push(o);
                    circleSet[cities[o].num].animate(
                        {'fill': color.orange}, delay * 3);
                }
            }

            // start power-supply
            var phase = 1;
            var spLines = canvas.set();
            while (tgt_cities.length) {
                var next_cities = [];
                for (var i=0; i < tgt_cities.length; i+=1) {
                    var tgt_city = tgt_cities[i];
                    var send_power = cities[tgt_city].power - 1;
                    for (var j=0; j < cities[tgt_city].net.length; j+=1) {
                        var cm_city = cities[tgt_city].net[j];
                        setTimeout(function () {
                            var tgt_c = tgt_cities;
                            var ii = i;
                            var jj = j;
                            return function(){
                                var tgt = tgt_c[ii];
                                var cm = cities[tgt].net[jj];
                                var c_tgt = circleSet[cities[tgt].num];
                                var c_cm = circleSet[cities[cm].num];
                                lineDict[tgt+cm].animate({
                                    "path": createLinePath(
                                        c_tgt.attr().cx, c_tgt.attr().cy, 
                                        c_cm.attr().cx, c_cm.attr().cy 
                                )}, delay * 3);
                            };
                        }(), delay * 3 * phase);
                        setTimeout(function () {
                            var tgt_c = tgt_cities;
                            var ii = i;
                            var jj = j;
                            return function(){
                                var tgt = tgt_c[ii];
                                var cm = cities[tgt].net[jj];
                                circleSet[cities[cm].num].animate({
                                    'fill': color.orange}, delay * 3 * 1.5);
                            };
                        }(), delay * 3 * (phase+1));
                        if (cities[cm_city].power < send_power) {
                            cities[cm_city].power = send_power;
                            if (next_cities.indexOf(cm_city) === -1) {
                                next_cities.push(cm_city);
                            }
                        }
                    }
                }
                tgt_cities = next_cities;
                phase += 2;
            }
        }
        var $tryit;
        var io = new extIO({
            functions: {
                js: 'powerSupply',
                python: 'power_supply'
            },
            multipleArguments: true,
            animation: function($expl, data){
                powerSupplyCanvas(
                    $expl[0],
                    data.in,
                    data.ext.explanation ? data.ext.explanation : {});
            }
        });
        io.start();
    }
);
