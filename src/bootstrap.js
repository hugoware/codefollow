require('./global')
require('sugar')

var includes = {

  '_': './util',

  // node modules
  '$$path': 'path',
  '$$fs': 'fs',

  // general
  '$$config': './config',
  '$$validation': './validation',


  // handling requests
  'IndexRequest': './requests/index',
  'DisplayPresentationRequest': './requests/display_presentation',
  'DisplayRemoteRequest': './requests/display_remote',
  'StartPresentationRequest': './requests/start_presentation',
  'JoinPresentationRequest': './requests/join_presentation',
  'NavigatePresentationRequest': './requests/navigate_presentation',
  'StatusRequest': './requests/status',


  // models
  'Slide': './models/slide',
  'Ranking': './models/ranking',
  'Test': './models/test',
  'Reader': './models/reader',
  'SectionReader': './models/section_reader',
  'PresentationReader': './models/presentation_reader',
  'PresentationLocator': './models/presentation_locator',
  'PresentationRepository': './models/presentation_repository',
  'Presentation': './models/presentation',
  'User': './models/User',
  'UserRepository': './models/user_repository'

};


// includes everything in global
for (var i in includes )
  global[ i ] = require( includes[ i ] );