<?php
// Start session
session_start();

// Connect to the SQLite database
$DBSTRING = "sqlite:cse383.db";
include "sql.inc";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	// Step 3 (Process logout POST variable and set session)
	if(isset($_POST["logout"])) {
		$_SESSION["loggedin"] = 0;
		session_destroy;
		}

	// Step 1
	// Get the username and pasword from the $_POST variables

	$username = $_POST["username"];
	$password = $_POST["password"];


	// Prepare and execute the SQL query to validate the login credentials
	try {
		$DATA=GET_SQL("select * from auth where username=? and password=?",$username,$password);
		// Set session variable
		if (count($DATA) > 0) {
			// user and password worked - set session variables
			$_SESSION["username"] = $username;
			$_SESSION["loggedin"] = 1;
		}
		else {
			// No data retrieved - username/password not found
			// Set session variable to not logged in
			$_SESSION["loggedin"] = 0;
		}
	}
	catch  (Exception $e) {
		// Database Error
		// Set session variable to not logged in
		$_SESSION["loggedin"] = 0;
	}

}
Print "
<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<title>Login</title>
</head>
<body>";
if (!isset($_SESSION['loggedin']) || !$_SESSION['loggedin']) {
    //  Write the login form here  (2.a.i)
    print ("
	<h1>Login</h1>
	<form action='login.php' method='post'>
	<label for='username'>Username:</label>
	<input type='text' name='username' id='username' required>
	<br><br>
	<label for='password'>Password:</label>
	<input type='password' name='password' id='password' required>
	<br><br>
	<input type='submit' value='Login'>
	</form>
	");
}
else {
    //  Write the logged in secure data here (add a log out function) (2.b.i)
    print ("
	<h1>Welcome, ".$_SESSION['username']."!</h1>
	<h2>Available Options:</h2>
	<ul>
	<li>
		<a href='option1.php'>Secure Option 1</a>
	</li>
	<li>
		<a href='option2.php'>Secure Option 2</a>
	</li>
	<li>
		<a href='option3.php'>Secure Option 3</a>
	</li>
	</ul>
	<form action='login.php' method='post'>
		<input type='submit' name='logout' value='Logout'>
	</form>
	");
}
?>
</body>
</html>
