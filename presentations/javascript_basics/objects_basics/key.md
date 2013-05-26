# Working With Objects
## Referencing Properties

You can refer to a property by using a string.

<pre class="code javascript" >
var coordinate = { 
  lat: '37.8499232',
  long: '-119.5676663'
};

position['lat'] // == '37.8499232'
position['long'] // == '-119.5676663'
position['other'] // == undefined
</pre>