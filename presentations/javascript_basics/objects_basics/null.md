# Working With Objects
## Referencing Properties

Be careful when accessing properties to avoid accidential null references exceptions.

<pre class="code javascript" >
var coordinate = { 
  lat: '37.8499232',
  long: '-119.5676663'
};

position.lat.fake // == null
position.long.fake // == null
position.other.fake // == exception!
</pre>