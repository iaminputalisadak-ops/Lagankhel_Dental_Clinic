<?php
/**
 * Database Setup - Run this once via browser to create the database
 * Open: http://localhost:8000/setup_database.php (when PHP server is running)
 * Or put in XAMPP htdocs and open: http://localhost/Lagankhel/backend/setup_database.php
 */

header('Content-Type: text/html; charset=utf-8');

$host = '127.0.0.1';
$port = '3306';
$user = 'root';
$pass = '';
$dbname = 'lagankhel_dental';

echo "<h1>Lagankhel Dental Clinic - Database Setup</h1>";

try {
    $pdo = new PDO("mysql:host=$host;port=$port;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    die("<p style='color:red'><strong>MySQL connection failed:</strong> " . $e->getMessage() . 
        "<br><br>Please start MySQL (XAMPP Control Panel → Start MySQL) and refresh this page.</p>");
}

$sql = file_get_contents(__DIR__ . '/../database/schema.sql');

// Remove USE statement for initial connection, we'll select DB after creating
$sql = preg_replace('/^USE\s+\w+;\s*/m', '', $sql);

try {
    $pdo->exec("CREATE DATABASE IF NOT EXISTS $dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $pdo->exec("USE $dbname");
    
    $statements = array_filter(array_map('trim', explode(';', $sql)));
    foreach ($statements as $stmt) {
        if (!empty($stmt) && !preg_match('/^--/', $stmt)) {
            $pdo->exec($stmt);
        }
    }
    
    echo "<p style='color:green'><strong>Database setup complete!</strong></p>";
    echo "<p>Database <code>$dbname</code> created with all tables and default data.</p>";
    echo "<p>You can now <a href='/admin'>log in to the admin dashboard</a> with: <strong>admin</strong> / <strong>admin123</strong></p>";
    
} catch (PDOException $e) {
    echo "<p style='color:red'><strong>Error:</strong> " . $e->getMessage() . "</p>";
}
