
// generates filler string ( for testing )
String.generate = function( count ) {
  return (new Array( 0|count + 1 )).join('a');
};


// generates a simple unique ID
Object.generate_id = function( count ) {
  var id = [ ];
  count = count || 4;

  // generate the string
  for (var i = 0; i < count; i++ )
    id.push( 0|Math.random() * 10 )
  return id.join('');
};


var _alias = function( value ) {
  return _trim( value ).replace(/[^a-z0-9]/gi, '_').toLowerCase();
};


var _escape_regex = function( value ) {
  return ( value ? value : '' )
    .toString()
    .replace( /[\-\[\]\{\}\(\)\*\+\?\.\,\\\^\$\|\#\s]/g, '\\$&' );
};

var _compare = function( a, b ) {
  if ( a instanceof String || typeof a == 'string' )
    return new RegExp( '^'+_escape_regex( a )+'$', 'i').test( b );
  else 
    return a == b;
};

// generates a sequence of numbers
var _generate_id = function( count ) {
  var id = [ ];
  count = count || 4;

  // generate the string
  for (var i = 0; i < count; i++ )
    id.push( 0|Math.random() * 10 )
  return id.join('');
};


// performs a loop
var _each = function( collection, each ) {
  if ( collection instanceof Array || collection instanceof Object )
    for (var i in collection )
      if ( each( i, collection[ i ] ) == false ) return;
};


// like each, but with manual control
var _every = function( collection, each, done ) {
  var index = -1;

  // only use done if a function
  done = done instanceof Function ? done : null;
  
  // setup loop controls
  each.next = function() {

    // make sure still in range
    if ( ++index >= collection.length ) {
      each.next = function() { };
      return done && done();
    }
    
    // perform the work
    if ( each( index, collection[ index ]) == false )
      index = collection.length;

  };

  // start right away
  each.next();
};


// quick trim start and end of string
var _trim = function( value ) {
  return ( value == null ? '' : value ).toString().trim();
};


// compute a md5 hash from a string
var _md5 = function( value ) {
  var crypto = require('crypto')
    , sha = crypto.createHash('md5');
    sha.update( value );
    return sha.digest('hex');
};

// compute a hash from a string
var _hash = function( value ) {
  var crypto = require('crypto')
    , sha = crypto.createHash('sha1');
    sha.update( value );
    return sha.digest('hex');
};


// keeps all values that match
var _select = function( collection, match ) {
  var keep = [ ];
  _each( collection, function( i, value ) { 
    if ( match(value) ) keep.push( value );
  })
  return keep;
};

// grabs the first record
var _first = function( collection, match ) {
  return _select( collection, match )[0];
};

// creates a basic matching function
var _all = function( params ) {
  return function( compare ) {
    if ( compare == null ) return false;

    // check each property
    for (var p in params )
      if (params[p] !== compare[p])
        return false;
    
    // return if anything was even found
    return !!p;
  };
};

// creates a basic matching function
var _any = function( params ) {
  return function( compare ) {
    if ( compare == null ) return false;

    // check each argument
    for (var p in params )
      if (params[p] === compare[p])
        return true;

    // no matches were found
    return false;
  };
};

// nothing should match
var _none = function( params ) {
  return function( compare ) {
    if ( compare == null ) return true;

    // check each argument
    for (var p in params )
      if (params[p] === compare[p])
        return false;

    // no matches were found
    return true;
  };
};

// merges two objects together
var _merge = function() {
  var merges = [].slice.call( arguments )
    , to = merges[0];
  if ( to == null ) return null;

  // start merging each value
  for ( var i = 1; i < merges.length; i++ )
    (function(obj) {
      for ( var p in obj )
        to[p] = obj[p];
    })( merges[i] );

  // send back the final object
  return to;
};

// leaves only numbers behind
var _numbers = function( val ) {
  return ( val || '' ).toString().replace(/[^0-9]/g, '');
};

// simple JSON response
var _json = function( response, obj ) {
  var content = JSON.stringify( obj || { } );
  response.writeHead( 200, { 'Content-Type': 'application/json' });
  response.write( content );
  response.end();
};


var _generate = function( count ) {
  return ( new Array( (count || 50) + 1 ) ).join( 'a' );
};


__define( module.exports, {
  generate_id: _generate_id,
  select: _select,
  first: _first,
  every: _every,
  each: _each,
  trim: _trim,
  hash: _hash,
  md5: _md5,
  alias: _alias,
  all: _all,
  any: _any,
  none: _none,
  merge: _merge,
  compare: _compare,
  generate: _generate,
  json: _json,
  numbers: _numbers
});