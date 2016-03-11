function LoadGrowGuage.settings(){
    return {
        color : ["#BACA29", "#ECE00E",  "#E7B410", "#F4A300", "#ED6000"],
        guageText : "Memory Usage",
        gradientCircle : true,
        gradientSegment : false,
    }
}

function LoadGrowGuage(element, value, config)     {
    
    var $element = d3.select(element).node().getBoundingClientRect(),
        width = $element.width,
        height = $element.height,
        Dimension = Math.min(width, height),
        cirlceRadius =50;


    var segmentData = [{
            arc: "M42.6,115.3c5.2,1.5,11,2.4,16.8,2.4c1.1,0,2.7,0,3.7-0.1v-2.2c-7,0-13.1-1.3-18.8-3.6L42.6,115.3z"
        }, {
            arc: "M25.7,99.3c4.3,4.7,9.5,8.6,15.3,11.3l-1.4,3.8c-6.9-2.4-13.2-6.1-18.6-10.8L25.7,99.3z"
        }, {
            arc: "M23.7,97c-5.2-6.4-8.8-14-10.3-22.4L2.9,75.7c2.9,10,8.5,18.9,15.8,25.9L23.7,97z"
        }, {
            arc: "M13,71.5c-0.2-2-0.4-4-0.4-6c0-10.7,3.4-20.6,9.2-28.8L9.4,28.3c-5.6,9-8.9,19.6-8.9,30.9  c0,4.6,0.6,9.1,1.6,13.5L13,71.5z"
        }, {
            arc: "M63,15.7V0.8c-1-0.1-2.5-0.1-3.7-0.1c-19.9,0-37.5,9.9-48.1,25l12.7,8.6C33.1,23,46,15.7,63,15.7z"
        }];


        config =  config || LoadGrowGuage.settings();

        var color = config.color;

        for (var i in segmentData) {
            segmentData[i].color = color[i];
        }


        var svg = d3.select(element).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("viewBox", "0 0 120 120")
                    .attr("preserveAspectRatio", "xMidYMid");

        
        var container = svg.append("g").attr("class","GA_Container")


        /*Arc Guage Section */
        var gauge = container.append("g").attr('class','gauge');

        var segments = gauge.selectAll(".segment")
                            .data(segmentData);            
        segments.enter()
                .append("path")
                .attr("fill",  function(d,i) {  return "url(#radial"+i+")" })
                .attr("d", function(d) { return d.arc; });

        var gaugeBox = gauge.node().getBBox();                        

        
        /* Center Circle section */
        var circle = container.append("g").attr('class','circle')

        var centerCircle = circle.append("circle")
                                .data(color)
                                .attr("fill", "url(#radial)")
                                .attr("cx", gaugeBox.width + (gaugeBox.width*5/100))
                                .attr("cy", (gaugeBox.height - gaugeBox.y)/2 + (gaugeBox.height *6.8/100) )
                                .attr("r", cirlceRadius);
        
        var circleBox = circle.node().getBBox();


        /* Text for the Guage section */

        var marker = container.append("g").attr('class','marker')
        
        var circleText = marker.append("svg:text")
                            .text(config.guageText)
                            .attr("text-anchor", "middle")
                            .attr("font-size", "0.7em")
                            .attr("fill", "white")
                            .attr("transform", "translate("+parseFloat((circleBox.width + circleBox.x)/1.78) + "," + parseFloat(gaugeBox.height/1.3) + ")");
    
        var circlePercentage = marker.append("svg:text").text(0)   
                                .attr("font-size", "1em")
                                 .attr("text-anchor", "middle")
                                .attr("fill", "white")
                                .attr("transform", "translate("+ parseFloat((circleBox.width + circleBox.x)/1.78) + "," + parseFloat(gaugeBox.height/2 + 10) + ")");                          

        
        /*Radial Gradient Pattern */
        var dfs = svg.append('defs');
        var segmentColor = [];
        var centerCircleColor;

        if (config.gradientSegment) {
            segMentGradient();            
        }

        if (config.gradientCircle) {
            cirlceGraident();
        }

       update(value);



       function cirlceGraident() {
             var radial = dfs.append("radialGradient")
                                .attr("id", "radial")
                                .attr("cx", "100%")
                                .attr("cy", "50%")
                                .attr("r", "100%")
                                .attr("fx", "50%")
                                .attr("fy", "50%");

            var centerCircleColor1 = radial.append("stop")
                                    .attr("offset", "10%")
                                    .attr("stop-opacity",1)
                                    .attr("stop-color", "#ccc");

            var centerCircleColor2 = radial.append("stop")
                                    .attr("offset", "100%")
                                    .attr("stop-opacity",0.5)
                                    .attr("stop-color", "#000");
            
            centerCircleColor =centerCircleColor1;
       }

       function segMentGradient() {
            
            for( var i=0; i<color.length; i++) {


                var radial = dfs.append("radialGradient")
                                    .attr("id", "segment"+i)
                                    .attr("cx", "10%")
                                    .attr("cy", "10%")
                                    .attr("r", "100%")
                                    .attr("fx", "10%")
                                    .attr("fy", "10%");

                var color1 = radial.append("stop")
                                    .attr("offset", "90%")
                                    .attr("stop-opacity",1)
                                    .attr("stop-color", "#ccc");

                
                var color2 = radial.append("stop")
                                    .attr("offset", "100%")
                                    .attr("stop-opacity",0)
                                    .attr("stop-color", "#000");

                segmentColor.push(color1);
            }
       }

        function update(value) {            
            var segementValue  = (value - (value % 20 )) / 20;
            segementValue =  (segementValue > 0) ? (segementValue + 1) === 6 ? 5 : segementValue + 1  : 1;

        
            if (config.gradientSegment) {
                segments.transition(100)
                        .attr("fill", function(d, i) { 
                            segmentColor[i].attr("stop-color", i < segementValue ? d.color : "#ccc");  
                            return "url(#segment"+i+")";
                        });
            } else {
                 segments.transition(100)
                    .attr("fill", function(d, i) { return i < segementValue ? d.color : "#ccc"; });
                
            }

           if (config.gradientCircle) {
                centerCircleColor.transition(100)
                      .attr("stop-color", function(d,i) {  return color[segementValue-1]; });
           } else {
                centerCircle.transition(100)
                            .attr("fill", function(d,i) {  return color[segementValue-1] });
            }
           
            circlePercentage.transition(100).text(value+"%");
        }

    return  { 
        update : update
    };

} 