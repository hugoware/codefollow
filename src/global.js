
// helps define properties for a class
global.__define = function( to, obj )  {
  for ( var k in obj )
    (function( key, value ) {
      var is_function = typeof value == 'function' || value instanceof Function
        , is_property = value.get || value.set;

      // general functions
      if ( is_function )
        to[ key ] = function() { 
          return value.apply( to, arguments );
        };

      // just define whatever is there
      else if ( is_property )
        Object.defineProperty( to, key, value );

      // otherwise, just set it
      else
        to[ key ] = value;


    })( k, obj[k] );
};



// standard way to setup requests to handle responses
global.__request = function( handler ) {
  handler.run = function( request, response ) {
    var handle = new handler( request, response );
    handle.run();
    return handle;
  };
};




// // simple properties definition
// global.__prop = function( context, property ) {
//   return { 
//     get: function() { return context[ property ]; },
//     set: function( value ) { context[property] = value; } 
//   };
// };


// // simple properties definition
// global.__rprop = function( context, property ) {
//   return { get: function() { return context[ property ]; } };
// };







// // reads a file if it exists
// global.__read_file = function( path ) {
//   var exists = $fs.existsSync( path );
//   if ( exists )
//     return $fs.readFileSync(path).toString();
// };

