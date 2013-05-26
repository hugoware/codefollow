var $$subject = 'Your Remote for {1}';
var $$message = 'Use the remote url below to manage {1}\n\nhttp://codefollow.net{2}';

var $$class = module.exports = function RemoteUrlMessage( params ) {
  var $this = this
    , $params = params
    ,

    // prepares the outbound message
    _message = function() {
      return {
        from : $$config.smtp_username, 
        to : params.to,
        subject : $$subject.assign( $params.presentation.title ),
        text : $$message.assign( $params.presentation.title, $params.presentation.remote_url ), 
      };
    },

    // builds an sends a message
    _send = function() {
      var message = _message();

      // no messages while developing
      if ( $$config.dev )
        return console.log('Send RemoteUrl:', message );

      // connect and send
      var server = $$email.server.connect( $$email.defaults );
      server.send( message, params.error );
    };


  __define( $this, {
    send: _send
  });
};