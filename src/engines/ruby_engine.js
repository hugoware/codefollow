
var $$class = module.exports = function RubyEngine( params ) {
  var $this = this
    , $params = params || { }
    , $presentation = $params.presentation || { }
    , $user = $params.user || { }
    , $test = $params.test || { }
    , $on_complete
    , $process
    , $abort
    , $kill_signal = 'SIGTERM'

    // the location to browse to 
    , $id = Object.generate_id( 16 )
    , $file = "{1}.rb".assign( $id )
    , $directory = "{1}/{2}".assign( $presentation.directory, $test.location )
    , $path = "{1}/{2}".assign( $directory, $file )
    , $command = 'ruby {1}'.assign( $file )

    // process execution defaults
    , $defaults = {
        cwd: $directory,
        timeout: $$config.test_execution_time_limit,
        maxBuffer: $$config.test_execution_max_buffer,
        killSignal: $kill_signal }
    ,

    // save the template for later use
    _cache_template = function( callback ) {
      $$fs.readFile( $$config.ruby_execution_script, function( err, content ) {
        RubyEngine.template = content.toString();

        // callback if needed
        if ( callback ) callback( RubyEngine.template );
      });
    }

    // loads a template to use
    _with_template = function( callback ) {
      if ( RubyEngine.template ) callback( RubyEngine.template );
      else _cache_template( callback );
    },

    // kicks off the process
    _execute = function() {

      // load the template
      _with_template( function( template ) {
        var identity = Object.generate_id( 16 );

        // replace required content
        var instance = "TestHelper__{1}".assign( identity );
        template = template.replace(/TestHelper\_\_999999/g, instance );

        // include each zone
        var zones = $presentation.view.zones_for( $user )
          , content = [ ];

        // get each part of content
        _.each( zones, function( key, value ) {
          content.push( 
            "eval((<<{2}\n\n{3}\n\n{2}\n), proc.binding )".assign(
              key, identity, value.content ));
        });

        // set what to execute
        template = template.replace('##{ USER_INPUT }##', content.join('\n') );
        template = template.replace('##{ EXECUTE }##', "eval( File.read('./{1}'), proc.binding, './{1}')".assign( $test.execute ) );

        // generate each of the tests to require
        var tests = $test.tests.map( function( file ) {
          return "eval( File.read('./{1}'), proc.binding, './{1}')".assign( file );
        });

        // update the test area
        template = template.replace('##{ TESTS }##', tests.join('\n') );

        // save the file
        $$fs.writeFile( $path, template, function( err ) {
          $process = $$process.exec( $command, $defaults, _resume );
        });

      });

    },

    // clear the created file
    _remove = function() {
      $$fs.unlink( $path );
    },

    // handles recovering from a test attempt
    _resume = function( error, output, err ) {
      setTimeout( _remove, 1000 );

      // display the results
      var result = new TestResult( $test, output, error );
      if ( $on_complete )
        $on_complete.call( $this, result );
    },

    // handles executing the test
    _run = function( callback ) {
      $on_complete = callback;
      _execute();
    };


  __define( $this, {
    run: _run
  });
};