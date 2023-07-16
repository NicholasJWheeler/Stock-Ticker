var numValue = "";

// jQuery to monitor the selected Date and Number fields
$(document).ready(function() {

    // Listen for a click on the call search button
    $('#searchBtn').click(function() {
        // Get the values of the date and number inputs
        var dateValue = $('#dateInput').val();
        numValue = $('#numInput').val();

        if (numValue != "" && numValue <= 100 && numValue >= 1) {
            callHandler(dateValue, numValue);
        } else {
            alert("Enter valid number data")
        }
    });


});

function callHandler(cDate, cMax) {
    getCallInfo(cDate, cMax);
}

function getCallInfo(dateVal, max) {
    a = $.ajax({
        url: 'final.php',
        method: "POST",
        data: { method: "getStock", date: dateVal}
    }).done(function (data) {
        lenJson = data.result.length;
        var actualResults = (lenJson - 1);
        var loopAmount;
        // Set the correct amount of calls to be shown
        if (lenJson >= max) {
            loopAmount = (Number(max)); // simulate like it is the json length by adding 1
        } else {
            loopAmount = lenJson;
        }
        // clear out old data
        $("#callList").html("");
        $("#expandedCallDisplay").html("");
        // Create the call area template
        $("#callList").html(
            '<div id="callBox" class="container white-border">' +
                '<div class="row">' +
                    '<h1 class="center-text">Calls made on: ' + dateVal + '</h1>' +
                '</div>' +
                '<div class="row">' +
                    '<h3 class="center-text">A maximum of ' + max + ' call(s) are displayed here: </h3>' +
                '</div><hr>' +
                '<div class="row">' +
                    '<div class="col-lg-3"><h5 class="center-text-call">Date & Time</h5></div>' +
                    '<div class="col-lg-3"><h5 class="center-text-call">Call Type</h5></div>' +
                    '<div class="col-lg-3"><h5 class="center-text-call">Stock Ticker</h5></div>' +
                    '<div class="col-lg-3"><h5 class="center-text-call">Full Call Button</h5></div>' +
                '</div><hr>' +
            '</div><br>');

        // If there are no calls to show, display a special message
        if (lenJson == 0) {
            $("#callBox").append('' +
            '<div class="row">' +
                '<div class="col-lg-12"><h5 class="center-noResults">No calls were made on the selected date</h5></div>' +
            '</div>' +
            '<hr>');
        } else {
            // Loop through the max amount of results, or what is available
            var counter = 0;
            for (i= [loopAmount - 1]; i >= 0; i--) {
                var formattedJson = data.result[actualResults - counter].jsonData.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
                $("#callBox").append('' +
                '<div class="row">' +
                    '<div class="col-lg-3"><h6 class="sDateTime center-article">' + data.result[actualResults - counter].dateTime + '</h6></div>' +
                    '<div class="col-lg-3"><h6 class="sCallType center-article">' + data.result[actualResults - counter].queryType + '</h6></div>' +
                    '<div class="col-lg-3"><h6 class="sTicker center-article">' + data.result[actualResults - counter].stockTicker + '</h6></div>' +
                    '<div class="col-lg-3 flexCenter"><button type="button" onclick="expandCallDisplay(' + formattedJson + ')" class="btn btn-blue expandBtn">Expand</button></div>' +
                '</div>' +
                '<hr>');
                counter++;
            }
        }
    }).fail(function(error) {
        console.log("Error in stock storage: ", error.statusText);
    });

    // Listen for a click on the expand call button
    $('.expandBtn').click(function() {
        // Get the json object from the button value
        var jsonData = $(this).val();

        console.log(jsonData);
    });
}

// Display a menu showing more information about a specific call using JSON
function expandCallDisplay(json) {
    var type = json.callType;

    // Different menus for different data stored
    if (type === "detail") { // The call was closing prices
        // Get calling dates
        var pastDates = json.callDates;
        var len = pastDates.length;
        // Get company name
        var name = json.stockName;
        // Get length of JSON results response
        lenJson = json.stockData.results.length;
        // Gather most recent 2 close values to indicate color displayed
        var mostRecentClose = json.stockData.results[lenJson - 1].c;
        var secondRecentClose = json.stockData.results[lenJson - 2].c;
        // See if the stock gained or lost value
        var closeChange = (mostRecentClose - secondRecentClose);
        // clear out old data
        $("#expandedCallDisplay").html("");
        if (closeChange >= 0) {
            // Create the stock area template
            $("#expandedCallDisplay").html(
                '<div id="stockBox" class="container white-border">' +
                    '<div class="row">' +
                        '<h1 class="center-text">' + name + '</h1>' +
                    '</div>' +
                    '<div class="row">' +
                        '<h3 class="center-text">Latest close value: <span id="gainText">$' + json.stockData.results[lenJson - 1].c.toFixed(2) + ' (' + closeChange.toFixed(2) + ')</span></h3>' +
                    '</div><hr>' +
                '</div><br>');
        } else {
            // Create the stock area template
            $("#expandedCallDisplay").html(
                '<div id="stockBox" class="container white-border">' +
                    '<div class="row">' +
                        '<h1 class="center-text">' + name + '</h1>' +
                    '</div>' +
                    '<div class="row">' +
                        '<h3 class="center-text">Latest close value: <span id="lossText">$' + json.stockData.results[lenJson - 1].c.toFixed(2) + ' (' + closeChange.toFixed(2) + ')</span></h3>' +
                    '</div><hr>' +
                '</div><br>');
        }
        for (i= [lenJson - 1]; i >= 0; i--) { // Loop through what should be 7 responses
            $("#stockBox").append('' +
            '<div class="row">' +
                '<div class="col-lg-3"><p class="sInfo center-text">Date: ' + pastDates[len + (-1 - i)] + '</p></div>' +
                '<div class="col-lg-3"><p class="sInfo center-text">Transactions Made: ' + json.stockData.results[i].n + '</p></div>' +
                '<div class="col-lg-3"><p class="sInfo center-text">Opening Price: $' + json.stockData.results[i].o.toFixed(2) + '</p></div>' +
                '<div class="col-lg-3"><p class="sInfo center-text">Closing Price: $' + json.stockData.results[i].c.toFixed(2) + '</p></div>' +
            '</div>' +
            '<hr>');
        }
    } else { // The call was ticker news

        // Get length of JSON results
        lenJson = json.stockData.results.length;
        // Get company name
        var name = json.stockName;

        // clear out old data
        $("#expandedCallDisplay").html("");
        // Create the stock area template
        $("#expandedCallDisplay").html(
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
                '<div class="col-lg-7"><h5 class="center-article"><a class="sNewsArticle" target="_blank" href=\"' + json.stockData.results[i].article_url +'\">' + json.stockData.results[i].title + '</a></h5></div>' +
                '<div class="col-lg-2"><h6 class="sNewsDate center-article">' + json.stockData.results[i].published_utc.slice(0, 10) + '</h6></div>' +
                '<div class="col-lg-3"><h6 class="sNewsAuthor center-article">' + json.stockData.results[i].author + '</h6></div>' +
            '</div>' +
            '<hr>');
        }
    }
}