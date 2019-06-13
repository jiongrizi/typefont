$(function() {
  var searchBtn = $(".search-btn");
  var searchText = $(".search-text");
  var resultText = $(".result-text");
  var typefont = $(".typefont-lemon");
  var onlineBtn = $(".view-online-btn");
  var localBtn = $(".view-local-btn");
  var insertBtn = $(".insert-btn");
  var fontText = $(".view-font-box");
  var commonText = "";
  var tmpText = "";

  $.ajax({
    type: "GET",
    url: "./src/online-font.txt",
    dataType: "text",
    success: function(data) {
      commonText = data;
    }
  });
  
  searchBtn.on("click", function(event) {
    var text = searchText.val();
    var re = /[\[\]"'‘’:=*{#}°!￥\n× \\_$@;@?\-,<>()./&|%^+Jj1234567890abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ]/g;
    var myText = text.replace(re, "");
    var myArray = myText.split("");
    var flag = false;
    var resultHtml = "";
    searchBtn.attr("disabled", true);

    for (var i = 0; i < myArray.length; i++) {
      var item = myArray[i];
      if (commonText.indexOf(item) == -1) {
        tmpText = tmpText + item;
        item = "<span class='miss'>" + item + "</span>";
        flag = true;
      }
      resultHtml = resultHtml + item;
    }

    if (flag) {
      typefont.removeClass("success").addClass("error");
    } else {
      typefont.removeClass("error").addClass("success");
      resultHtml = "";
    }
    resultText.html(resultHtml);
    searchBtn.attr("disabled", false);
  });
  onlineBtn.on("click", function(event) {
    fontText.html("").html(commonText);
  });
  insertBtn.on("click", function(event) {
    var insertText = "";
    var localText = "";
    var myArray = tmpText.split("");
    $.ajax({
      type: "GET",
      url: "./src/local-font.txt",
      dataType: "text",
      success: function(data) {
        localText = data;
        for (var i = 0; i < myArray.length; i++) {
          var item = myArray[i];
          if (localText.indexOf(item) == -1) {
            insertText = insertText + item;
          }
        }
        $.ajax({
          type: "POST",
          url: "./data",
          data: insertText,
          dataType: "text",
          success: function(data) {
            fontText.html("").html(insertText + localText);
          }
        });
      }
    });

    tmpText = "";
  });
  localBtn.on("click", function(event) {
    $.ajax({
      type: "GET",
      url: "./src/local-font.txt",
      dataType: "text",
      success: function(data) {
        fontText.html("").html(data);
      }
    });
  });
});
