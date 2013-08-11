if (!('console' in window)) window.console = { log: function() { } };

$(function() {
  var $this = this
    , $pending_request

    // style modes
    , $modes = { 
      'html': 'htmlmixed',
      'csharp': 'clike'
    }

    // configuration
    , $poll_interval = 1000
    , $last = 0
    , $states = 'slide test rankings'
    , $expressions = {
      code_block: /\|{2}code \w+\|{2}(.|\n)*\|{2}code\|{2}/gi
    }

    , $body = $(document.body)
    , $leader = $body.hasClass('leader')

    // slides/test values
    , $slide
    , $test
    , $time

    // the current state of the presentation
    , $state = 'setup'
    , $stopped = false
    , $polling
    , $sending = false
    , $progress = -1

    // urls used for presentation requests
    , $trailing_slash = !/\/$/.test( window.location.pathname )
    , $root = window.location.pathname + ( $trailing_slash ? '/' : '' )

    // compiled templates for views
    , $templates = { }

    // is this IE
    , $ie = $('#ie').length > 0

    // common ui areas
    , $ui = {
      slide: $('#slide'),
      test: $('#test'),
      editors: $('#editors'),
      results: $('#results'),
      rankings: $('#rankings'),
      preview: $('#preview'),
      time: $('#time')
    }
    , 

    // convenience methods
    _is = function ( state ) { return $body.hasClass( state ); },
    _state = function( state ) { _hide_dialog(); _stop_timer(); $body.removeClass($states).addClass( $state = state ); },
    _delay = function( time, action ) { if (!action) action = time, time = 1; if ( time == 0 ) action(); else window.setTimeout( action, time ); },
    _markdown = function( str ) { return (new Markdown.Converter()).makeHtml( str ); },
    _syntax = function( key ) { return( $modes )[key] || key; },
    _is_busy = function() { return $body.hasClass('busy'); },
    _busy = function( on ) { $body[ on ? 'addClass' : 'removeClass' ]('busy'); },
    _is_testing = function() { return $('.dialog:visible').length > 0; },
    _focus = function() {
      if ( !$ie ) return;
      window.setTimeout( function() { $( document.body ).focus(); }, 0 );
    },

    // handles a nice fade in
    _show = function( target ) {
      target.css({ marginLeft: '25px', opacity: 0 })
        .removeClass('hide')
        .animate({ opacity: 1, marginLeft: '0' }, 500 );
    },

    // slides in an editor
    _slide = function( target ) { },

    // helper for html escaping
    _escape_html = function( content ) {
      return content.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    },

    // helper for HTML unescaping
    _unescape_html = function( content ) {
      return content.replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&');
    },
    
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

    // grabs the first available tab
    _find_first_editor_tab = function() {
      return $ui.editors.find('.tabs :first-child');
    },

    // selects a new tab to view
    _set_editor_tab = function( tab ) {
      if ( !$test || !$test.zones ) return;
      var default_tab = !!!tab;

      // get the requested tab or default
      if ( tab && tab.target ) tab = $( tab.target );
      if ( !tab || !tab.length ) tab = _find_first_editor_tab();

      // reset the views
      $ui.editors.find('.tabs li').removeClass('selected');
      $ui.editors.find('.editors > div').addClass('hide');

      // set the tab
      tab.addClass('selected');

      // show the new zone
      var target = tab.attr('for')
        , zone = '.editors > [for='+target+']';
      $ui.editors.find(zone).removeClass('hide');
      
      // focus by default ( except the leader )
      if ( default_tab && $leader ) return;

      try { $test.zones[ target ].editor.focus(); }
      catch( e ) { /* shouldn't happen unless en error elsewhere... */ }
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

      // for IE
      _focus();

    },

    // finds the value for a editor area
    _get_editor_value_for = function( target ) {
      if (!($test || $test.zones || test.zones[ target ])) return;
      var editor = $test.zones[ target ].editor;
      return editor.getValue ? editor.getValue() : '';
    },

    // unhandled exceptions (silent repair efforts)
    _unhandled_error = function( e ) { 
      _busy( false );
      console.log( e ); 
    },

    // makes requests for presentation 
    _request = function( type, params, actions, override ) {
      if ( $stopped ) return;

      // cancel an existing
      if ( $pending_request ) {
        if ( override ) $pending_request.abort();
        else return;
      }

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

          $pending_request = null;
          $sending = false;
          _busy( false );

          if ( actions.done )
            actions.done();
        });

    },

    // prepare the ui to handle events
    _setup_events = function( ) {
      $(document).on( 'click', '.submit', _submit_test )
        .on( 'click', '.overlay', _hide_dialog )
        .on( 'click', '.preview', _preview_test )
        .on( 'click', '.tabs > li', _set_editor_tab )
        .on( 'click', '#results .dialog h3', _set_results_view )
        .on( 'focus', '#editor textarea', _show_editor )
        .on( 'blur', '#editor textarea', _hide_editor );


      // also link up the keyboard
      Mousetrap.bind( 'esc', _hide_dialog );
      Mousetrap.bind( [ 'command+enter', 'ctrl+enter' ], _submit_test );
      Mousetrap.bind( [ 'command+shift+.', 'ctrl+shift+.' ], _tab_editor_right );
      Mousetrap.bind( [ 'command+shift+,', 'ctrl+shift+,' ], _tab_editor_left );
      Mousetrap.bind( 'down', _set_results_next );
      Mousetrap.bind( 'up', _set_results_previous );
      Mousetrap.bind( [ 'command+shift+enter', 'ctrl+shift+enter' ], _preview_test );
      
    },

    // allow CodeMirror to respond to mousetrap shortcuts
    _check_global_shortcut_keys = function( editor, event ) {
      event.invoke = true;
      Mousetrap.handleKeyEvent( event );
    },

    // updates the clock
    _set_timer = function ( time ) {
      $time = time * 60;
      window.setTimeout( function() { 
        $ui.time.hide().fadeIn();
      }, 1000 );
    },

    // ends any timers in progress
    _stop_timer = function() {
      $ui.time.fadeOut();
      $time = null;
    },

    // sets the countdown timer
    _countdown = function() {
      if ( !$time ) return;

      // get the updated time
      var minutes = 0|( $time / 60 )
        , seconds = $time % 60;

      // prepend a leading zero if needed
      if ( seconds < 10 ) seconds = '0'+seconds;
      var display = minutes + ':' + seconds;

      // update
      $ui.time.text( display );
      if ( --$time <= 0 ) _stop_timer();
    },

    // handles auto polling
    _set_polling_interval = function() {
      window.clearInterval( $polling );
      $polling = window.setInterval( _poll, $poll_interval );
    },

    // checks for a presentation status
    _poll = function( force ) {
      if ( force ) _set_polling_interval();
      _request( 'status', { at: $progress }, { success: _identify }, force );
    },

    // determine what to do with a response
    _identify = function( result ) {
      if ( result == null ) return;
      $progress = result.at != null ? result.at : $progress;
      $state = result.state || $state;

      // reset the view
      $pending_request = null;

      // always resume
      _busy( false );

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
      var markup = $templates.preview( preview );
      $ui.preview.html( markup ).show();
    },

    // displays a content slide
    _handle_slide = function( slide ) {
      _state('slide');

      // escape 'pre' content
      slide.content = slide.content.replace( $expressions.code_block, function( match ) {
        
        // basic HTML entities removed
        match = _escape_html( match )

          // convert to a PRE block
          .replace(/\t/g, '  ')
          .replace(/\|{2}code\|{2}$/, '</pre>')
          .replace(/^\|{2}code/, '<pre class="code ')
          .replace(/^(.*)\|{2}/, '$1">');

        return match;
      });

      // generate html content
      slide.content = _markdown( slide.content );
      var markup = $templates.slide( slide );

      // update the slide view
      $ui.slide.html( markup )
        .addClass('hide');

      // apply any syntax highlighting
      _show( $ui.slide );
      window.setTimeout( _apply_code_highlighting, 0 );
    },

    // styles all code samples
    _apply_code_highlighting = function() {

      $('.code').each(function() {
        var block = $(this)
          , style = $.trim( block.removeClass('code').attr('class') )
          , code = $.trim( block.html() )
          , container = $('<pre/>')
              .addClass('code cm-s-default');

        // unescape the mess
        code = _unescape_html( code );

        // lookup the style
        style = $modes[ style ] || style;

        // add styling
        container.insertBefore( block );
        CodeMirror.runMode( code, style, container[0] );
        block.remove();
      });

    },

    // handles displaying the editor window for leaders
    _show_editor = function() {
      if ( !$leader ) return;
      $('#editor').addClass('focused');
    },

    // handles displaying the editor window for leaders
    _hide_editor = function() {
      if ( !$leader ) return;
      $('#editor').removeClass('focused');
    },

    // displays a content slide
    _handle_test = function( test ) {
      _state('test');
      $test = test;

      // set the time view
      if ( $leader )
        _set_timer( test.time );

      // populate 
      test.explanation = _markdown( test.explanation );
      var markup = $templates.test( test );
      $ui.test.html( markup );
      _show( $ui.test );

      // toggle preview visiblity
      $('.preview')[ test.preview ? 'show' : 'hide' ]();

      // shuffle
      $ui.editors.empty();
      $ui.test.find('#editor').appendTo( $ui.editors );

      // setup each editor
      $ui.editors.find('.editor')
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


      // slide in the editor if needed
      if ( !$leader ) _slide( $('#editor') );
      else _apply_code_highlighting();

      // update the editors
      _set_editor_tab();
    },

    // displays a content slide
    _handle_results = function( results ) {
      _busy( false );

      // figure out all passses
      results.no_tests = !results.tests || results.tests.length == 0;
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

      // hiding
      $ui.results.find('.overlay').click( _hide_dialog );

      // update the default view
      _set_results_view();
    },

    // displays a content slide
    _handle_rankings = function( rankings ) {
      _state('rankings');

      var markup = $templates.rankings( rankings );
      $ui.rankings.html( markup );
      _show( $ui.rankings );
      
      // make sure to alternate
      $ui.rankings.find('.test-entry:nth-child(3n+1)')
        .addClass('alt');

      // add scoring
      $ui.rankings.find('.leaders .ranking').each( function( i, v ) {
        var element = $( this )
          , number = ( i + 1 )
          , style = [ 'first' ][ i ]
          , place = [ 'st', 'nd', 'rd' ][ i ] || 'th'
          , display = $('<div class="place" >' + number + '<span>' + place + '</span></div>')
          , after = element.find('.detail');
        display.insertAfter( after );
        element.addClass( style );
      });
    },

    // handles saving/preview
    _submit_test = function() { _send_update( _identify ); },
    _preview_test = function() { _send_update( _identify, true ); },

    // handles updating user content
    _send_update = function( callback, preview ) {
      if ( !_is('test') || _is_testing() || $sending ) return;
      $sending = true;

      // grab the zones
      var submit = { at: $progress, preview: preview, zones: { } };
      $ui.editors.find('.editors > div')
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
      var change = $ui.editors.find('.tabs .selected')[ direction ]();
      if ( change.length == 0 ) change = $ui.editors.find('.tabs li:'+fallback);
      _set_editor_tab( change );
    },

    // changes the test results view
    _set_results_next = function() { _set_results_view_by( 1, 'first' ); },
    _set_results_previous = function() { _set_results_view_by( -1, 'last' ); },
    _set_results_view_by = function( direction, fallback ) {
      _focus();
      
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

      // hide the prevew area if needed
      if ( $ui.preview.is(':visible') )
        $ui.preview.hide();

      $testing = false;
      $ui.results.empty().hide();

      // restore the editor (if any)
      var tab = $ui.results.find('.tabs .selected');
      _set_editor_tab( tab );

      // blur stuff for the leader
      if ( $leader && _is('test') )
        $('input,textarea').blur();
    };

  // start countind down
  window.setInterval( _countdown, 1000 );

  // initialize
  _find_templates();
  _setup_events();

  // start the polling
  _poll( true );


});


