<h6 >
	<a href="https://github.com/NicholasJWheeler">↩ Back To Nicholas Wheeler's Profile</a>
</h6>

<h1 align="center">📈 Stock Ticker Application</h1><br>
<table align="center">
	<tr>
		<th>
			Directory
		</th>
	</tr>
	<tr>
		<td>
			<a href="#-about-the-class">🎓  About The Class</a><br><br>
			<a href="#%E2%84%B9-about-the-application">ℹ About The Application</a><br><br>
			<a href="#-stock-ticker-features">💰 Stock Ticker Features</a>
			<ul>
        <li><a href="#-html-bootstrap-and-css">🚀 HTML, Bootstrap, and CSS</a></li>
        <li><a href="#-php-and-sqlite">💱 PHP and SQLite</a></li>
        <li><a href="#-javascript-jquery-and-ajax">💸 JavaScript, JQuery, and AJAX</a></li>
				<li><a href="#-polygon-api">💎 Polygon API</a></li>
			</ul>
			<a href="#-the-full-application">📊 The Full Application</a><br><br>
		</td>
  	</tr>
	<tr>
		<td align="center">
			<a href="https://vscode.dev/github.com/NicholasJWheeler/Stock-Ticker">🔍 Check out the code that made this project possible!</a>
		</td>
	</tr>
</table><br>

## 🎓 About The Class
#### CSE383 - Web Application Programming
I took this during my sophomore year of college in the spring of 2021. This 15-week course covered different aspects of the website development process as well as the methodology behind it. The course allowed me to learn and develop skills with HTML5, CSS, Bootstrap, JavaScript, JQuery, AJAX, PHP, and SQL-Lite. Each week of the class focused on creating a project around a new concept we learned that week and the final project of the class was to combine all of the concepts we learned in the previous weeks, which resulted in this stock ticker application. 
<br><br><br>

## ℹ About The Application
The stock ticker application is a web application that utilizes the Polygon.io API for requesting stock information from various stock exchanges and presents said information to the user in an efficient and aesthetically pleasing manner. All information that is gathered from GET calls to the Polygon.io API is stored on an SQL-Lite database that uses PHP to communicate information back and forth. Users have the ability to query the API for the latest 7 days of closing information on a specific stock within an exchange, as well as the 5 most recent news articles pertaining to the associated stock ticker. Users can also check to see the history of calls made with the Stock Ticker Application on the "Call History" page, where a date and maximum amount of results are selected, and results from the database are returned.
<br><br><br>

## 💰 Stock Ticker Features
### 🚀 HTML, Bootstrap, and CSS
Nearly all websites now are built using some form of HTML5 and CSS3 to create a functional and visually appealing experience for an end user. This web application is no different, but I also utilized the Bootstrap framework to further build on my CSS ability to style my application. Bootstrap allows users to create forms and buttons in an aesthetically pleasing and standardized manner but also allows for responsive development that can account for any screen size. One prime example of this in my application is the navigation bar at the top becoming a "hamburger" collapsable menu when the screen size becomes small enough. The following screenshots display the different forms that my navigation bar can take depending on a user's screen size.<br><br>

![](https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/Bootstrap1.png?raw=true)
<br><br>

![](https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/Bootstrap2.png?raw=true)
<br><br>

When clicked, the "hamburger" menu button will reveal the navigation bar choices on smaller displays.
<br><br>

![](https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/Bootstrap3.png?raw=true)
<br><br>

### 💱 PHP and SQLite
Before taking this class I had never used PHP before when creating websites, but I now know that it is a great tool for making dynamic content on websites as well as gathering data from a database. The stock ticker website uses PHP to communicate with an SQLite database that is run on phpLiteAdmin. While a skeleton of PHP code was provided to students by the instructor of the course, we were tasked with writing PHP functions that would gather the correct information to query the SQLite database. The screenshots below display some PHP functions I wrote that queried the database, as well as what the backend database looks like and what it is storing.
<br><br>

![](https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/setStock.png?raw=true)
<br><br>

![](https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/getStock.png?raw=true)
<br><br>

![](https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/PHPLiteAdmin.png?raw=true)
<br><br>

As you can see, the information is stored in JSON format in the database, which makes it easier to process the returned data. Further details are explained in the following section.
<br><br>

### 💸 JavaScript, JQuery, and AJAX
JQuery and AJAX are part of JavaScript and both are used extensively throughout this project to manage all of the data that needs to be displayed on the Stock Ticker website. JQuery is used in the JavaScript files to monitor any state changes of elements such as buttons being pressed on the website, while AJAX is used to communicate information to and from the relevant PHP files within this project. This allows for information to be sent to and brought back from the phpLiteAdmin database, and then displayed in real-time on the front-end side of the application for a user to see, without needing a page reload. AJAX is used to parse through the returned JSON data from the database and append the new information to the current website page of the application. Example JQuery and AJAX code chunks can be seen in the following pictures.
<br><br>

![](https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/jquery.png?raw=true)
<br><br>

![](https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/ajax.png?raw=true)
<br><br>

### 💎 Polygon API
<b>API Used:</b>
<ul>
	<li><a href="https://polygon.io/" target="_blank">Polygon.io's Stock API</a></li>
</ul>
For the final project of CSE 383, the instructor required that we used Polygon.io's API to gather the information from different exchanges. Polygon.io's API is one of the best to use for people looking to make projects that involve current stock market data without needing to pay for API calls. There is a vast selection of different calls that can be made to the API, but my project focused on gathering closing price data as well as recent news articles. Polygon also allows people to search through their catalog of exchanges and what stocks are featured on each exchange. Once an exchange and stock are chosen, the user can click the "Details" button and then extensive data such as opening and closing prices can be gathered. The code snippet below displays the JavaScript function that is used to gather all the displayed data from one stock on one exchange.<br><br>

![](https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/exchangeStock.png?raw=true)
<br><br>

Whenever the user clicks the "News" button, another call is also used to see recent news articles associated with a given stock. The code snippet for this call to the API can be seen below.<br><br>

![](https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/newsCall.png?raw=true)
<br><br>

Since Polygon hosts such an intricate API, this project could be expanded to utilize more features of the API to provide more information on a particular stock to the end user. At the moment, my application keeps the information simple with an easy-to-understand UI and two buttons pertaining to each option available to query the API with. The stocks page looks like the following image.<br><br>

![](https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/stockSelection.png?raw=true)
<br><br>

<br><br><br><br>

- - - -

<br>

<h3 align="center">
  💵 You are ready to start buying! 💵
</h3>

<br>

- - - -


<br><br><br><br>

## 📊 The Full Application

<p align="center">
	<img src="https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/Final1.png?raw=true">
	<br><br>
	<img src="https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/Final2.png?raw=true">
	<br><br>
	<img src="https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/Final3.png?raw=true">
	<br><br>
	<img src="https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/Final4.png?raw=true">
  <br><br>
  <img src="https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/Final5.png?raw=true">
  <br><br>
  <img src="https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/Final6.png?raw=true">
  <br><br>
  <img src="https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/Final7.png?raw=true">
  <br><br>
  <img src="https://github.com/NicholasJWheeler/Stock-Ticker/blob/main/Images/Final8.png?raw=true">
  <br><br>
</p>

<br><br><br>

- - - -
<h6 align="center">
	<a align="center" href="#-back-to-nicholas-wheelers-profile">⬆ Back To The Top </a>
</h6>

- - - -

<h6 align="center">
	<a href="https://github.com/NicholasJWheeler">↩ Back To Nicholas Wheeler's Profile</a>
</h6>

- - - -

<h6 align="center">
  Copyright © Nicholas Wheeler 2023
</h6>


