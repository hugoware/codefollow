# Working With Objects
## Referencing Properties

<pre class="code javascript" >
var coordinate = { 
  lat: '37.8499232',
  long: '-119.5676663'
};

position['lat'] // == '37.8499232'
position['long'] // == '-119.5676663'
position['other'] // == undefined
</pre>

* Object also allow properties be accessed using a `string` index