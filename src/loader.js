window._onLoadPercent = function(percent) {
  console.log(percent);
};

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
      window._onLoadPercent(percentage);
    }, 0)

    return translate.apply(window.System, args);
  }
}(window))

System.import('app/index');
