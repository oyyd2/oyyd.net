var itemSize = 18,
  cellSize = itemSize-1,
  width = 800,
  height = 800,
  margin = {top:20,right:20,bottom:20,left:25},
  hourFormat = d3.time.format('%H'),
  dayFormat = d3.time.format('%j'),
  timeFormat = d3.time.format('%Y-%m-%dT%X'),
  monthDayFormat = d3.time.format('%m-%d'),  
  dateExtent = null,
  data = null,
  dayOffset = 0,
  xAxisScale = d3.time.scale(),
  xAxis = d3.svg.axis()
    .orient('top')
    .ticks(d3.time.days,3)
    .tickFormat(monthDayFormat),
  yAxisScale = d3.scale.linear()
    .range([0,itemSize*24])
    .domain([0,24]),
  yAxis = d3.svg.axis()
    .orient('left')
    .ticks(5)
    .scale(yAxisScale);

initCalibration();

var svg = d3.select('[role="spectrogram"]');

var spectrogram = svg
  .attr('width',width)
  .attr('height',height)
.append('g')
  .attr('width',width-margin.left-margin.right)
  .attr('height',height-margin.top-margin.bottom)
  .attr('transform','translate('+margin.left+','+margin.top+')');

var rect = null;

var dailyValueExtent = {};

d3.json('../data/test_device_pm25.json',function(err,data){
  data = data.data;
  data.forEach(function(valueObj){
    valueObj['date'] = timeFormat.parse(valueObj['timestamp']);
    var day = valueObj['day'] = monthDayFormat(valueObj['date']);

    var dayData = dailyValueExtent[day] = (dailyValueExtent[day] || [1000,-1]);
    var pmValue = valueObj['value']['PM2.5'];
    dayData[0] = d3.min([dayData[0],pmValue]);
    dayData[1] = d3.max([dayData[1],pmValue]);
  });

  dateExtent = d3.extent(data,function(d){
    var value = d.date;
    return value;
  });

  xAxisScale.range([0,itemSize*(dayFormat(dateExtent[1])-dayFormat(dateExtent[0])+1)]);
  xAxisScale.domain([dateExtent[0],dateExtent[1]]);

  xAxis.scale(xAxisScale);
  svg.append('g')
    .attr('transform','translate('+margin.left+','+margin.top+')')
    .attr('class','x axis')
    .call(xAxis);

  svg.append('g')
    .attr('transform','translate('+margin.left+','+margin.top+')')
    .attr('class','y axis')
    .call(yAxis);

  dayOffset = dayFormat(dateExtent[0]);

  rect = spectrogram.selectAll('rect')
    .data(data)
  .enter().append('rect')
    .attr('width',cellSize)
    .attr('height',cellSize)
    .attr('x',function(d){
      return itemSize*(dayFormat(d.date)-dayOffset);
    })
    .attr('y',function(d){            
      return hourFormat(d.date)*itemSize;
    })
    .attr('class','item');

  rect.append('title')
    .text(function(d){
      if(d.value['PM2.5']>0){
        return monthDayFormat(d.date)+' '+d.value['PM2.5'];                
      }
    });

  rerenderColor();

  console.log(dateExtent[0],',',dateExtent[1]);
  console.log(data);
});

function initCalibration(){
  var calibrationElement = document.getElementsByClassName('calibration'),
    itemElements = document.getElementsByClassName('item');

  var forEach = [].forEach;
  forEach.call(itemElements,function(itemElement,index){
    itemElement.setAttribute('x',index*itemSize);
  });
}
function rerenderColor(){
  var renderByCount = document.getElementsByName('displayType')[0].checked;

  rect
    // .transition()
    // .delay(function(d,i){
    //   return (dayFormat(d.date)-dayOffset)*30;
    // })
    // .attr('width',0)
    .attr('class',function(d){
      var colorIndex = d3.scale.quantize()
        .range([0,1,2,3,4,5])
        .domain((renderByCount?[0,500]:dailyValueExtent[d.day]));

      if(d.value['PM2.5']<0){
        return 'item';
      }      
      return 'item q'+colorIndex(d.value['PM2.5'])+'-6';
    })
  
  // rect.transition()
  //   .delay(function(d,i){
  //     return (dayFormat(d.date)-dayOffset)*10+500;
  //   })
  //   .attr('width',cellSize);
}