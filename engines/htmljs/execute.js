var page = require('webpage').create()
  , system = require('system')
  , address = system.args[1]
  , timeout = system.args[2] || 5000

  // amount of time to wait
  , handle_timeout= setTimeout( function() { exit('TIMEOUT'); }, timeout )
  ,

  // sets up the page
  init= function() {

    // handle events
    phantom.onError = error;
    page.onConsoleMessage = message;

    // start the request
    page.open( address );
  },


  // used to forward console messages
  message= function( msg ) { 
    console.log(msg); 
    if (/== END ==/.test(msg)) exit();
  },


  // ends this attempt
  exit= function( reason ) {
    clearTimeout( handle_timeout );
    if ( reason ) console.log('== ' + reason + ' ==');
    phantom.exit();
  },


  // dunno yet...
  error= function( msg, trace ) {
    var msgStack = ['== ERROR ==: ' + msg];
    if (trace) {
      msgStack.push('TRACE:');
      trace.forEach(function(t) {
        msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function + ')' : ''));
      });
    }
    console.error(msgStack.join('\n'));
  };


// start the test
init();
