
var $$class = module.exports = function HtmlJsEngine( params ) {
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
    , $url = 'http://localhost:{1}/{2}/{3}/{4}/{5}/{6}'.assign(
        $$config.port,
        $presentation.id,
        $presentation.test_key,
        $user.id,
        $test.location,
        $test.execute )

    // process execution defaults
    , $defaults = {
        timeout: $$config.test_execution_time_limit,
        maxBuffer: $$config.test_execution_max_buffer,
        killSignal: $kill_signal }

    // the command line value to send
    , $command = 'phantomjs {1} {2}'.assign( $$config.browser_execution_script, $url )    
    ,

    // kicks off the process
    _execute = function() {
      $process = $$process.exec( $command, $defaults, _resume );
    },

    // handles recovering from a test attempt
    _resume = function( error, output, err ) {

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