if (!window.chrome)      { window.chrome = {}; }
if (!window.chrome.tabs) {
  window.chrome.tabs = { };

  window.chrome.tabs.tabs = []

  window.chrome.tabs.create = function(properties, callback) {
    var tab = this.tabs.push(properties);
    if (callback) { callback(tab); }
  }

  window.chrome.tabs.query = function(query, callback) {
    var tabs = this.tabs.filter(function(tab) {
      var select = true;
      for (q in query) {
        select = tab[q] !== query[q] ? false : true
      }
      return select
    });
    callback(tabs)
  }

  window.chrome.tabs.custom = {}

  window.chrome.tabs.custom.removeAll = function() {
    window.chrome.tabs.tabs = []
  };
}

