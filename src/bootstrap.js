require('./global')
require('sugar')

var includes = {

  '_': './util',

  // node modules
  '$$path': 'path',
  '$$fs': 'fs',
  '$$process': 'child_process',
  '$$email': 'emailjs',

  // general
  '$$config': './config',
  '$$validation': './validation',

  // handling requests
  'IndexRequest': './requests/index',
  'DisplayPresentationRequest': './requests/display_presentation',
  'DisplayRemoteRequest': './requests/display_remote',
  'ResetPresentationRequest': './requests/reset_presentation',
  'StartPresentationRequest': './requests/start_presentation',
  'JoinPresentationRequest': './requests/join_presentation',
  'NavigatePresentationRequest': './requests/navigate_presentation',
  'StatusRequest': './requests/status',
  'RunTestRequest': './requests/run_test',
  'ServeTestRequest': './requests/serve_test',
  'ServeDirectoryRequest': './requests/serve_directory',
  'MissingRequest': './requests/missing',
  'EchoRequest': './requests/echo',

  // engines
  'HtmlJsEngine': './engines/htmljs_engine',
  'RubyEngine': './engines/ruby_engine',

  // models
  'Slide': './models/slide',
  'Ranking': './models/ranking',
  'UserRanking': './models/user_ranking',
  'AllRanking': './models/all_ranking',
  'Test': './models/test',
  'TestResult': './models/test_result',
  'Reader': './models/reader',
  'SectionReader': './models/section_reader',
  'PresentationReader': './models/presentation_reader',
  'PresentationLocator': './models/presentation_locator',
  'PresentationRepository': './models/presentation_repository',
  'Presentation': './models/presentation',
  'Summary': './models/summary',
  'Preview': './models/preview',
  'User': './models/user',
  'Score': './models/score',

  // messages
  'RemoteUrlMessage': './messages/remote_url'

};


// includes everything in global
for (var i in includes )
  global[ i ] = require( includes[ i ] );