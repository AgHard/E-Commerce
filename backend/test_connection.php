<?php
$servername = "d6q8diwwdmy5c9k9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
$username = "zil54mv9z12ig4q0";
$password = "zhf3sn4nznlrdvi4";
$dbname = "xxdzvthbex638vsu";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
