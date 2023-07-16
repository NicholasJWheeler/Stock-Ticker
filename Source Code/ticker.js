// Initalize Global Variables
var exchangeName;
var stockName;
var stockTicker = "";

// jQuery to monitor the selected Stock Exchange & Stock Ticker buttons
$(document).ready(function() {

    // Listen for a click on any of the exchange items
    $('.exchange-list').click(function() {
      // Get the text and value of the selected item
      var exchangeName = $(this).text();
      var exchangeMIC = $(this).attr('value');
      // Add the selected text and value as HTML to the "selectedExchange" div
      $('#selectedExchange').html("");
      $('#selectedExchange').append(exchangeName + " (" + exchangeMIC + ")");
      // Reset any already chosen stock
      $('#selectedStock').html("");
      stockTicker = "";
      getExchangeTickers(exchangeMIC)
      const pastDates = getWeekdays();
      console.log(pastDates);
    });

    // Create an event listener for the Stock Selection <select> DOM
    $("#ticker-listing").on("change", function() {
        stockName = $(this).find("option:selected").text();
        stockTicker = $(this).val();
        // Add the selected text and value as HTML to the "selectedExchange" div
        $('#selectedStock').html("");
        $('#selectedStock').append(stockName + " (" + stockTicker + ")");
      });
      
    // Create an event listener for the Details button
    $("#detailsBtn").click(function() {
        if (stockTicker == "") {
            alert("Please select a valid stock!");
        } else { // Valid info has been filled out, call the API
            getTickerInfo(stockName, stockTicker);
        }
    });

    // Create an event listener for the News button
    $("#newsBtn").click(function() {
        if (stockTicker == "") {
            alert("Please select a valid stock!");
        } else { // Valid info has been filled out, call the API
            getTickerNews(stockName, stockTicker);
        }
    });
});

// Use Ajax to get information from API calls, display it on the website
function getExchangeTickers(exchange) {

    a = $.ajax({
        url: 'https://api.polygon.io/v3/reference/tickers?exchange=' + exchange + '&active=true&limit=1000&apiKey=VPgUg5XKth0B0clSX4RRDAt2Q2LG2z0K',
        method: "GET"
    }).done(function(data) {
        //clear out old data
        $("#ticker-listing").html("");
        len = data.results.length;
        for (i=0; i<len; i++) { // Loop through the top 500 responses
            $("#ticker-listing").append('<option class=\"ticker-selection\" title=\"' + data.results[i].name + '\" value=\"' + data.results[i].ticker + '\">' + data.results[i].name + '</option>');
            //$("#ticker-listing").append('<a class=\"dropdown-item ticker-list\" value=\"' + data.results[i].ticker + '\">' + data.results[i].name + '</a>');
        }
    }).fail(function(error) {
        console.log("error", error.statusText);
    });
}

// Use Ajax to get information from ticker API calls, display it on the website
function getTickerInfo(name, ticker) {

    // Get recent date information for the ticker query (past 7 weekdays)
    var pastDates = getWeekdays();
    var len = pastDates.length;
    var oldestDay = pastDates[len - 1];
    var newestDay = pastDates[0];

    a = $.ajax({
        url: 'https://api.polygon.io/v2/aggs/ticker/' + ticker + '/range/1/day/' + oldestDay + '/' + newestDay + '?unadjusted=false&apiKey=VPgUg5XKth0B0clSX4RRDAt2Q2LG2z0K',
        method: "GET"
    }).done(function(data) {
        // Get length of JSON results response
        lenJson = data.results.length;
        // Gather most recent 2 close values to indicate color displayed
        var mostRecentClose = data.results[lenJson - 1].c;
        var secondRecentClose = data.results[lenJson - 2].c;
        // See if the stock gained or lost value
        var closeChange = (mostRecentClose - secondRecentClose);
        // clear out old data
        $("#currentStockInfo").html("");
        if (closeChange >= 0) {
            // Create the stock area template
            $("#currentStockInfo").html(
                '<div id="stockBox" class="container white-border">' +
                    '<div class="row">' +
                        '<h1 class="center-text">' + name + '</h1>' +
                    '</div>' +
                    '<div class="row">' +
                        '<h3 class="center-text">Latest close value: <span id="gainText">$' + data.results[lenJson - 1].c.toFixed(2) + ' (' + closeChange.toFixed(2) + ')</span></h3>' +
                    '</div><hr>' +
                '</div><br>');
        } else {
            // Create the stock area template
            $("#currentStockInfo").html(
                '<div id="stockBox" class="container white-border">' +
                    '<div class="row">' +
                        '<h1 class="center-text">' + name + '</h1>' +
                    '</div>' +
                    '<div class="row">' +
                        '<h3 class="center-text">Latest close value: <span id="lossText">$' + data.results[lenJson - 1].c.toFixed(2) + ' (' + closeChange.toFixed(2) + ')</span></h3>' +
                    '</div><hr>' +
                '</div><br>');
        }
        for (i= [lenJson - 1]; i >= 0; i--) { // Loop through what should be 7 responses
            $("#stockBox").append('' +
            '<div class="row">' +
                '<div class="col-lg-3"><p class="sInfo center-text">Date: ' + pastDates[len + (-1 - i)] + '</p></div>' +
                '<div class="col-lg-3"><p class="sInfo center-text">Transactions Made: ' + data.results[i].n + '</p></div>' +
                '<div class="col-lg-3"><p class="sInfo center-text">Opening Price: $' + data.results[i].o.toFixed(2) + '</p></div>' +
                '<div class="col-lg-3"><p class="sInfo center-text">Closing Price: $' + data.results[i].c.toFixed(2) + '</p></div>' +
            '</div>' +
            '<hr>');
        }

        // Create a JSON object that holds all stock detail call data
        const stockObject = {
            stockName: name,
            stockTicker: ticker,
            callType: "detail",
            stockData: data,
            callDates: pastDates
        };
        var objectString = JSON.stringify(stockObject);

        // Store the stock detail call data
        storeStockInfo(ticker, "detail", objectString);
    }).fail(function(error) {
        console.log("error", error.statusText);
    });
}

// Use Ajax to get information from ticker news API calls, display it on the website
function getTickerNews(name, ticker) {

    a = $.ajax({
        url: 'https://api.polygon.io/v2/reference/news?ticker=' + ticker + '&order=desc&limit=5&sort=published_utc&apiKey=VPgUg5XKth0B0clSX4RRDAt2Q2LG2z0K',
        method: "GET"
    }).done(function(data) {
        // Get length of JSON results response
        lenJson = data.results.length;
        // clear out old data
        $("#currentStockInfo").html("");
        // Create the stock area template
        $("#currentStockInfo").html(
            '<div id="stockBox" class="container white-border">' +
                '<div class="row">' +
                    '<h1 class="center-text">' + name + '</h1>' +
                '</div>' +
                '<div class="row">' +
                    '<h3 class="center-text">Latest news articles here:</h3>' +
                '</div><hr>' +
            '</div><br>');
        for (i=0; i < lenJson; i++) { // Loop through what should be 5 news articles
            $("#stockBox").append('' +
            '<div class="row">' +
                '<div class="col-lg-7"><h5 class="center-article"><a class="sNewsArticle" target="_blank" href=\"' + data.results[i].article_url +'\">' + data.results[i].title + '</a></h5></div>' +
                '<div class="col-lg-2"><h6 class="sNewsDate center-article">' + data.results[i].published_utc.slice(0, 10) + '</h6></div>' +
                '<div class="col-lg-3"><h6 class="sNewsAuthor center-article">' + data.results[i].author + '</h6></div>' +
            '</div>' +
            '<hr>');
        }

        // Create a JSON object that holds all stock news call data
        const stockObject = {
            stockName: name,
            stockTicker: ticker,
            callType: "news",
            stockData: data,
        };
        var objectString = JSON.stringify(stockObject);

        // Store the stock detail call data
        storeStockInfo(ticker, "news", objectString);
    }).fail(function(error) {
        console.log("error", error.statusText);
    });
}

// This function is used to check the past 14 days, including the current day,
// to properly get at least the last 8 weekdays for proper closing prices of a chosen stock
function getWeekdays() {
    var currentDate = new Date();
    var pastWeekdays = [];
    var daysCount = 0;
    
    while (pastWeekdays.length < 8 && daysCount < 14) {
      var pastDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - daysCount);
      if (pastDate.getDay() !== 0 && pastDate.getDay() !== 6) {
        var dateString = pastDate.toISOString().slice(0,10);
        pastWeekdays.push(dateString);
      }
      daysCount++;
    }
    
    return pastWeekdays;
  }

function storeStockInfo(ticker, type, json) {
    var request = $.ajax({
        method: "POST",
        url: 'final.php',
        data: { method: 'setStock', stockTicker: ticker, queryType: type, jsonData: json }
    });
    request.done(function (data) {
        console.log("Stock Stored Successfully: ", data);
    });
    request.fail(function(error) {
        console.log("Error in stock storage: ", error.statusText);
    });
}