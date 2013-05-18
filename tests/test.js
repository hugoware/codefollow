require('../src/bootstrap');

// load testing configuration values
var path = $$path.join( __dirname, '../config.json' );
$$config.load( path );

// sets up a testing attempt
module.exports = $$class = function TestAttempt( mod, tests ) {
  var $this = this
    , $mocks = { }
    , $module = mod
    , $tests = tests || { }
    ,

    // quick checks
    _is_ignored_test = function( str ) { return /^_/.test( str ); },
    _is_before_test = function( str ) { return /^before$/.test( str ); },
    _is_after_test = function( str ) { return /^after$/.test( str ); },


    // mocks an object when instantiated
    _mock = function( type, obj ) {
      $mocks[ type ] = $mocks[ type ] || global[ type ];

      // assigns each of the stubs to an object
      var assign = function( target ) { for (var o in obj) target[o] = obj[o]; }

        // this acts as a class definition so the mock can be instantiated
        , definition = function() { 

          // add methods
          assign(this); 

          // call the constructor ( if any )
          if ( Object.isFunction( obj.ctor ) )
            obj.ctor.apply( this, arguments );
        };
      
      // setup as all methods off the object itself
      assign( definition );

      // save the type
      global[ type ] = definition;
    },


    // unmocks a class type
    _unmock = function( type ) {
      delete global[ type ];
      if ( $mocks[ type ] ) global[ type ] = $mocks[ type ];
      delete $mocks[ type ];
    },


    // removes all mocked objects
    _reset = function() {
      for( var k in $mocks ) _unmock( k );
    },

    // waits a time limit before ending a test
    _wait = function( time, end ) {
      var test = this;

      // test is now delayed
      test.delay = true;

      // will give up after timelimit    
      test.__wait = setTimeout(function() {
        
        // if it gives up, set as an error
        if ( Object.isFunction( end ) )
          end.call( test );

        // anything else, present as a fail
        else {
          test.ok( false, end );
          test.end();
        }

      }, 0|time );

    },

    // called when stopping a test
    _end = function() {
      clearTimeout( this.__wait );
      this.done();
      _reset();
    },

    // includes any extra testing functions
    _extend_test = function( test ) {
      return Object.merge( test, {
        mock: _mock,
        unmock: _unmock,
        reset: _reset,
        wait: _wait,
        end: _end
      });
    },


    // wire up each test
    _setup = function( to, name, action ) {
      if (_is_ignored_test( name ))
        return;
      else if ( _is_before_test( name ) )
        _setup_non_test( to, 'setUp', action );
      else if ( _is_after_test( name ) )
        _setup_non_test( to, 'tearDown', action );
      else
        _setup_test( to, 'test_'+name, action );
    },


    // add a setup/teardown action
    _setup_non_test = function( to, name, action ) {
      to[ name ] = function( ready ) {
        var test = _extend_test({ });
        action.call( test, test );
        ready();
      };
    },


    // adds an actual test to execute
    _setup_test = function( to, name, action ) {
      to[ name ] = function( test ) {

        // perform the test
        _extend_test( test );
        action.call( test, test );

        // finish and reset
        if ( !test.delay ) test.end();
      };
    },


    // finds all tests and groups recursively
    _locate = function( to, obj ) {
      for( var k in obj )
        (function( key, value ) {

          // assign the new test
          if ( Object.isFunction( value ) )
            _setup( to, key, value );

          // start a new group
          else
            to[ key ] = _locate({ }, value)

        })( k, obj[k] );
        
      return to;
    };


  // initialize
  _locate( $module.exports, $tests );

};



// used for testing web requests
global.WebRequest = function( params ) {
  params = params || { };
  var $context = { 
    result: { },

    // incoming request 
    request: {
      session: params.session || { },
      method: params.method || 'get',
      body: params.body || { },
      route: {
        params: params.route || { }
      }
    },

    // handling user responses
    response: {
      send: function( status ) {
        $context.result.status = status;
      },
      json: function( obj ) {
        // convert just to be sure it looks like the actual result
        $context.result.json = JSON.parse( JSON.stringify( obj ) );
      },
      sendfile: function( path ) {
        $context.result.sendfile = path;
      },
      render: function( view, params ) {
        $context.result.view = view;
        $context.result.params = params;
      },
      redirect: function( url ) {
        $context.result.redirect = url;
      }
    }
  };

  __define( this, $context );
};


// helper to run requests
global.WebRequest.run = function( type, params ) {
  var web = new WebRequest( params );
  web.instance = type.run( web.request, web.response );
  return web;
};


// helper to run requests
global.WebRequest.get = function( type, params ) { return WebRequest.run( type, params); };
global.WebRequest.post = function( type, params ) {
  params = params || { };
  params.method = 'post';
  return WebRequest.run( type, params );
};
