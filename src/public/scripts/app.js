if (!('console' in window)) window.console = { log: function() { } };

$(function() {
  var $this = this
    , $pending_request = null

    // configuration
    , $poll_interval = 3000
    , $states = 'slide test rankings'

    // slides/test values
    , $slide = null
    , $test = null

    // the current state of the presentation
    , $state = 'setup'
    , $stopped = false
    , $busy = false
    , $progress = -1

    // urls used for presentation requests
    , $trailing_slash = !/\/$/.test( window.location.pathname )
    , $root = window.location.pathname + ($trailing_slash ? '/' : '')

    // compiled templates for views
    , $templates = { }

    // common ui areas
    , $ui = {
      slide: $('#slide'),
      test: $('#test'),
      results: $('#results'),
      rankings: $('#rankings'),
      preview: $('#preview'),
    }
    , 

    // convenience methods
    _state = function( state ) { $(document.body).removeClass($states).addClass( $state = state ); },
    _delay = function( time, action ) { if (!action) action = time, time = 1; if ( time == 0 ) action(); else window.setTimeout( action, time ); },
    _markdown = function( str ) { return (new Markdown.Converter()).makeHtml( str ); },
    _syntax = function( key ) { return({ 'html': 'htmlembedded' })[key] || key; },
    _busy = function( on ) { $(document.body)[ ($busy = on) ? 'addClass' : 'removeClass' ]('busy'); },
    
    // wires up all templates on the page
    _find_templates = function() {
      $("script[type='text/template']").each(
        function(i, v) {
          var content = v.innerHTML
            , partial = v.className === 'partial'
            , key = v.id.replace(/^template_/,'');
          
          // create the template
          if ( partial ) Handlebars.registerPartial( key , content );
          else $templates[key] = Handlebars.compile( content );
        });
    },

    // selects a new tab to view
    _set_editor_tab = function( tab ) {

      // get the requested tab or default
      if ( tab && tab.target ) tab = $( tab.target );
      if ( !tab || !tab.length ) tab = $ui.test.find('.tabs :first-child');

      // reset the views
      $ui.test.find('.tabs li').removeClass('selected');
      $ui.test.find('.editors > div').addClass('hide');

      // set the tab
      tab.addClass('selected');

      // show the new zone
      var target = tab.attr('for')
        , zone = '.editors > [for='+target+']';
      $ui.test.find(zone).removeClass('hide');
      $test.zones[ target ].editor.focus();

    },

    // grab the correct view
    _set_results_view = function( view ) {

      // get tab or default
      if ( view && view.target ) view = $( view.target );
      view = view || $ui.results.find('h3:first');

      // reset the views
      $ui.results.find('h3').removeClass('selected');
      $ui.results.find('.view').addClass('hide');

      // set the tab
      view.addClass('selected');
      $(':focus').blur();

      // show the new zone
      var target = '.'+view.text().toLowerCase();
      $ui.results.find(target).removeClass('hide');

    },

    // finds the value for a editor area
    _get_editor_value_for = function( target ) {
      if (!($test || $test.zones || test.zones[ target ])) return;
      var editor = $test.zones[ target ].editor;
      return editor.getValue ? editor.getValue() : '';
    },

    // unhandled exceptions (silent repair efforts)
    _unhandled_error = function( e ) { console.log(e); },

    // makes requests for presentation 
    _request = function( type, params, actions, override ) {
      if ($stopped) return;

      // cancel an existing
      if ($pending_request) 
        if (override) $pending_request.abort();
        else return;

      // activity in progress
      _busy( true );
      actions = actions || { };

      // send the request
      var request = { url: $root + type, type: 'post', data: params, dataType: 'JSON' };
      $pending_request = $.ajax( request )
        // when finished
        .fail( actions.fail || _unhandled_error )
        .done( actions.success )
        .always(function() {
          $pending_request = _busy( false );
          if ( actions.done ) actions.done();
        });

    },

    // prepare the ui to handle events
    _setup_events = function( ) {
      $(document).on( 'click', '.submit', _submit_test )
        .on( 'click', '.preview', _preview_test )
        .on( 'click', '.tabs > li', _set_editor_tab )
        .on( 'click', '#results .dialog h3', _set_results_view );

      // also link up the keyboard
      Mousetrap.bind( 'esc', _hide_dialog );
      Mousetrap.bind( [ 'command+enter', 'ctrl+enter' ], _submit_test );
      Mousetrap.bind( [ 'command+?', 'ctrl+?' ], _preview_test );
      Mousetrap.bind( [ 'command+shift+.', 'ctrl+shift+.' ], _tab_editor_right );
      Mousetrap.bind( [ 'command+shift+,', 'ctrl+shift+,' ], _tab_editor_left );
      Mousetrap.bind( 'down', _set_results_next );
      Mousetrap.bind( 'up', _set_results_previous );
    },

    // allow CodeMirror to respond to mousetrap shortcuts
    _check_global_shortcut_keys = function( editor, event ) {
      event.invoke = true;
      Mousetrap.handleKeyEvent( event );
    },

    // checks for a presentation status
    _poll = function( immediate ) {
      if ( $busy ) return;
      _delay( immediate ? 0 : $poll_interval, function() {
        _request( 'status', { at: $progress }, { success: _identify, done: _poll });
      })
    },

    // determine what to do with a response
    _identify = function( result ) {
      if ( result == null ) return;
      $progress = result.at != null ? result.at : $progress;
      $state = result.state || $state;

      // always resume
      _busy();

      // choose the view
      if ( result.type == 'slide' )
        _handle_slide( result );
      else if ( result.type == 'test' )
        _handle_test( result );
      else if ( result.type == 'results' )
        _handle_results( result );
      else if ( result.type == 'ranking' )
        _handle_rankings( result );
      else if ( result.type == 'preview' )
        _handle_preview( result );
    },

    _handle_preview = function( preview ) {
      _state('preview');

      var markup = $templates.preview( preview );
      $ui.preview.html( markup );
    },

    // displays a content slide
    _handle_slide = function( slide ) {
      _state('slide');

      slide.content = _markdown( slide.content );
      var markup = $templates.slide( slide );
      $ui.slide.html( markup );
    },

    // displays a content slide
    _handle_test = function( test ) {
      _state('test');
      $test = test;

      // populate 
      test.explanation = _markdown( test.explanation );
      var markup = $templates.test( test );
      $ui.test.html( markup );

      // setup each editor
      $ui.test.find('.editor')
        .each( function( i, element ) {
          var area = $( element )
            , target = area.attr('for')
            , detail = $test.zones[ target ]
            , syntax = _syntax( area.attr('syntax') )
            , params = { value: detail.content, mode: syntax, onKeyEvent: _check_global_shortcut_keys }
            , editor = CodeMirror( element, params );

          // update the code mirror syntax
          $test.zones[ target ].editor = editor;
          CodeMirror.autoLoadMode( editor, syntax );
        });

      // update the editors
      _set_editor_tab();
    },

    // displays a content slide
    _handle_results = function( results ) {

      // figure out all passses
      for (var t in results.tests)
        for (var r in results.tests[t].tests) {
          var pass = results.tests[t].pass = results.tests[t].tests[r].pass;
          if ( !pass ) break;
        }

      // join the message list
      if ( results.messages ) results.messages = results.messages.join('\n');
      else if ( results.messages.length == 0 ) results.messages = null;
      else results.messages = null;

      // update template
      var markup = $templates.results( results );
      $ui.results.append( markup ).show();

      // update the default view
      _set_results_view();
    },

    // displays a content slide
    _handle_rankings = function( rankings ) {
      _state('rankings');

      var markup = $templates.rankings( rankings );
      $ui.rankings.html( markup );
    },

    // handles saving/preview
    _submit_test = function() { _send_update( _identify ); },
    _preview_test = function() { _send_update( _identify, true ); },

    // handles updating user content
    _send_update = function( callback, preview ) {

      // grab the zones
      var submit = { at: $progress, preview: preview, zones: { } };
      $ui.test.find('.editors > div')
        .each( function(i, v ) {
          var area = $(v)
            , target = area.attr('for')
            , value = _get_editor_value_for( target );
          submit.zones[ target ] = value;
        });

      // send the test immediately
      _request( 'test', submit, { success: callback }, true );
    },


    // changing code tabs
    _tab_editor_right = function() { _tab_editor_by('next', 'first'); },
    _tab_editor_left = function() { _tab_editor_by('prev', 'last'); },
    _tab_editor_by = function( direction, fallback ) {
      var change = $ui.test.find('.tabs .selected')[ direction ]();
      if ( change.length == 0 ) change = $ui.test.find('.tabs li:'+fallback);
      _set_editor_tab( change );
    }

    // changes the test results view
    _set_results_next = function() { _set_results_view_by( 1, 'first' ); },
    _set_results_previous = function() { _set_results_view_by( -1, 'last' ); },
    _set_results_view_by = function( direction, fallback ) {
      
      // don't bother if hidden
      if ( !$ui.results.is(':visible') ) return;

      // determine the next view
      var change = $ui.results.find('h3')
        , selected = null;
      $.each( change, function(i,v) { if ($(v).hasClass('selected')) selected = i; });
      change = $( change[ selected + direction ] );

      // nothing found, grab the first
      if ( change.length == 0 ) change = $ui.results.find('h3:'+fallback);
      _set_results_view( change );
    },

    // hides the results dialog
    _hide_dialog = function() {
      $ui.results.empty().hide();

      // restore the editor (if any)
      var tab = $ui.test.find('.tabs .selected');
      _set_editor_tab( tab );
    };


  // initialize
  _find_templates();
  _setup_events();

  // start the polling
  _poll( true );

});
