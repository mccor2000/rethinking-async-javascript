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

function getFile(file) {
  let text;
  let fn;

  fakeAjax(file, function (response) {
    if (!fn) text = response;
    else fn(response);
  });

  return function (cb) {
    if (text) cb(text);
    else fn = cb;
  };
}

// request all files at once in "parallel"
const th1 = getFile("file1");
const th2 = getFile("file2");
const th3 = getFile("file3");

th1(function ready(text) {
  output(text);
  th2(function ready(text) {
    output(text);
    th3(function ready(text) {
      output(text);
      output("Complete!");
    });
  });
});
