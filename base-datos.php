<?php
$server = 'localhost:mysql wampserver';
$username = 'root';
$password = 'root';
$database = 'php_login_database';
try {
  $conn = new PDO("mysql:host=$server;dbname=$database;", $username, $password);
} catch (PDOException $e) {
  die('Connection Failed: ' . $e->getMessage());
}
?>