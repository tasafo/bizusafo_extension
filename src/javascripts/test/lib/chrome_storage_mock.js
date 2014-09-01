if (!window.chrome)               { window.chrome = {}; }
if (!window.chrome.storage)       { window.chrome.storage = {}; }
if (!window.chrome.storage.local) { 
  window.chrome.storage.local = { };

  window.chrome.storage.local.get = function(key, callback) {
    data = {};
    data[key] = window.chrome.storage.local[key];
    callback(data);
  }

  window.chrome.storage.local.set = function(data, callback) {
    for (var key in data) {
      window.chrome.storage.local[key] = data[key];
    }
    if (callback) { callback(); }
  }

  window.chrome.storage.local.remove = function(key) {
    return delete window.chrome.storage.local[key];
  }
}

