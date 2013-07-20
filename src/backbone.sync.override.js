/*!
 * backbone sync override
 */
 ;(function(window) {

  // Local copy of global variables
  var _ = window._;

  // Store a copy of the original Backbone.sync
  var originalSync = Backbone.sync;

  // Override Backbone.sync for all future requests.
  // If a token is present, set the Basic Auth header
  // before the sync is performed.
  Backbone.sync = function(method, model, options) {
      options.headers = options.headers || {};

      _.extend(options.headers, { 'Digifid-context': window.location.hostname });

    return originalSync.call(model, method, model, options);
  };


})(this);