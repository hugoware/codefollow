// routes used by the site
module.exports = [
  
  [ 'all', '/', IndexRequest ],
  [ 'all', '/start', StartPresentationRequest ],
  [ 'all', '/join', JoinPresentationRequest ],
  [ 'all', '/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})', DisplayPresentationRequest ],
  [ 'all', '/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})/:remote(\\d+)/remote', DisplayRemoteRequest ],
  [ 'all', '/join/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})', JoinPresentationRequest ],
  [ 'all', '/:presentation_id(\\d{3}\\-?\\d{3}\\-?\\d{3})/status', StatusRequest ]
  




// return the route info
].map( function( route ) {
  return {
    method: route[0],
    path: route[1],
    request: route[2]
  };
});