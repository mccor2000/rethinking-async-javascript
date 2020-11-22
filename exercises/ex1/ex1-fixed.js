function fakeAjax(url, cb) {
  var fake_responses = {
    file1: "The first text",
    file2: "The middle text",
    file3: "The last text",
  };
  var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;

  console.log("Requesting: " + url);

  setTimeout(function () {
    cb(fake_responses[url]);
  }, randomDelay);
}

function output(text) {
  console.log(text);
}

// **************************************
// The old-n-busted callback way

function getFileInOrder() {
  let queue = ["file1", "file2", "file3"];
  return function (file) {
    fakeAjax(file, function (text) {
      while (file !== queue[0]) {}
      queue.shift();
      output(text);
    });
  };
}

// request all files at once in "parallel"
const getFile = getFileInOrder();
getFile("file1");
getFile("file2");
getFile("file3");
