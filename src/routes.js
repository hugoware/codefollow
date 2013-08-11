// routes used by the site
module.exports = [
  
  [ 'all', '/', IndexRequest ],
  [ 'all', '/join/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})/?', JoinPresentationRequest ],
  [ 'all', '/start', StartPresentationRequest ],
  [ 'all', '/join', JoinPresentationRequest ],
  [ 'all', '/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})/reset', ResetPresentationRequest ],
  [ 'all', '/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})', DisplayPresentationRequest ],
  [ 'get', '/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})/:remote(\\d+)/remote', DisplayRemoteRequest ],
  [ 'post', '/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})/:remote(\\d+)/remote', NavigatePresentationRequest ],
  [ 'all', '/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})/status', StatusRequest ],
  [ 'post', '/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})/test', RunTestRequest ],
  [ 'all', '/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})/:test_key(\\d+)/:user_id([a-z0-9]+)/?', ServeTestRequest ],
  [ 'all', '/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})/:test_key(\\d+)/:user_id([a-z0-9]+)/:serve([^$]*)', ServeTestRequest ],
  [ 'all', '/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})/:serve([^$]*)', ServeDirectoryRequest ],

  // 404 handling
  [ 'all', '*', MissingRequest ]



// return the route info
].map( function( route ) {
  return {
    method: route[0],
    path: route[1],
    request: route[2]
  };
});