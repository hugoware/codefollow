var express = require('express')
  , http = require('http')
  , app = express()
  , server = http.createServer( app );


// load in all app modules
require( './bootstrap' );

// don't go completely down
process.addListener('uncaughtException', function ( err ) {
  console.log('ex:', err );
  console.trace();
});


// load the app configuration
var source = $$path.join( __dirname, '../config.json' );
$$config.load( source );


// all environments
app.set('port', $$config.port );
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use( express.favicon() );
app.use( express.logger('dev') );
app.use( express.bodyParser() );
app.use( express.methodOverride() );


// session and cookies
app.use( express.cookieParser( $$config.secret ) );
app.use( express.session() );


// routing
app.use( app.router );
app.use( express.static( $$path.join(__dirname, 'public' ) ) );


// setup the routes for the application
require('./routes').each(
  function with_route( route ) {
    app[ route.method ]( route.path, route.request.run );
  });


// development only
if ('development' == app.get('env'))
  app.use(express.errorHandler());

// start listening
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// load the application
require('./startup');