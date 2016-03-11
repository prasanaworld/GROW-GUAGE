# GROW-GUAGE
A Simple D3 Gauge with dynamic update and configurable options. Based on the resuabled D3 component module.

## Dependencies
D3.js

![Grow Gauge](https://github.com/prasanaworld/GROW-GUAGE/blob/master/GrowGauge.png)

## Usuage 
``` javascript
LoadGrowGuage(elementDOM, initalValue , [config]);
````

### Option
  - **elementDom** : HTML Dom where the gauge to be loaded 
  - **initalValue** : Inital value for the guage, By Default set to `0`

**configuration**
``` javascript
var config = LoadGrowGuage.DefaultSettings();
LoadGrowGuage(elementDOM, initalValue , config);
``` 

### Default Configuration Object
``` javascript
{
  color: ["#BACA29", "#ECE00E", "#E7B410", "#F4A300", "#ED6000"],
  guageText: "Grow Gauge",
  gradientCircle: true,
  gradientSegment: false
}
```
  - **colors**          :   Array to specify the color code for various section
  - **gaugeText**       :   Gauge Heading to be displayed, By default set to `Grow Gauge`
  - **gradientCircle**  :   Boolean value to indicate whether the circle color is gradient.
  - **graidentSegment** :   Boolean value to indicate whether the segment color are gradient.
  
### Author
Prasana k

### License
MIT 
  

    

