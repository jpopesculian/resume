window._onLoad = (function(window, document) {
  var svg = document.getElementById("face-svg");
  var paths = svg.getElementsByTagName("path");
  var PATH_NUM = paths.length;
  for (var i = 0; i < PATH_NUM; i++) {
    var path = paths[i];
    var pathLength = path.getTotalLength().toString();
    var initialClass = path.getAttribute("class");
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    path.setAttribute("class", initialClass + " will-load"); 
  }
  svg.className = "";

  var pathsLoaded = 0;
  var doneLoading = false;

  return {
    percent: function(percent) {
      var pathsNeeded = Math.round(percent * PATH_NUM - pathsLoaded) + 1;
      var i = pathsLoaded;
      pathsLoaded = Math.max(pathsLoaded + pathsNeeded, PATH_NUM);
      for (i; i < pathsLoaded; i++) {
        var setLoading = (function(path) {
          return function() { 
            if (path && !doneLoading) {
              var initialClass = path.getAttribute("class");
              path.setAttribute("class", initialClass + " loading"); 
            }
          };
        }(paths[i]));
        window.setTimeout(setLoading, Math.random() * 1500);
      }
    },

    all: function() {
      doneLoading = true;
      for (var i = 0; i < PATH_NUM; i++) {
        var setLoaded = (function(path) {
          return function() { 
            if (path) {
              var classes = path.getAttribute("class").split(' ');
              var j = classes.length;
              while(j--) {
                var className = classes[j];
                if 
                (
                  className === "will-load" 
                  || className === "loading" 
                  || className === "null"
                ) 
                {
                  classes.splice(j, 1);
                }
              }
              path.style.strokeDasharray = 0;
              path.style.strokeDashoffset = 0;
              path.setAttribute("class", classes.join(" ")); 
            }
          };
        }(paths[i]));
        window.setTimeout(setLoaded, Math.random() * 1000);
      }
    }
  }
}(window, document));

(function(window) {
  var translate = window.System.translate;
  var TOTAL_SIZE = 473242;
  var TOTAL_FILES = 92;
  var sizeDownloaded = 0;
  var filesDownloaded = 0;

  window.System.translate = function() {
    var args = arguments;

    window.setTimeout(function() {
      var size = args[0].source.length;
      sizeDownloaded += size;
      filesDownloaded += 1;
      // console.log(sizeDownloaded, filesDownloaded);

      percentageBytes = sizeDownloaded / TOTAL_SIZE;
      percentageRequests = filesDownloaded / TOTAL_FILES;
      percentage = (percentageRequests + percentageBytes) / 2;
      window._onLoad.percent(percentage);
    }, 0)

    return translate.apply(window.System, args);
  }
}(window))

System.import('app/index').then(function(module) {
  window._onLoad.all();
  var bootstrap = module.default;
  bootstrap("#app");
});
