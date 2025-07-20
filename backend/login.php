<?php
session_start();
header('Content-Type: application/json');
$dsn = 'mysql:host=localhost;dbname=your_dbname;charset=utf8';
$user = 'your_dbuser';
$pass = 'your_dbpass';

try {
    $pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'DB Connection failed']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';

if ($action === 'register') {
    $username = $data['username'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    try {
        $stmt->execute([$username, $password]);
        echo json_encode(['success' => true, 'message' => '✅ User registered']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => '❌ Username already exists']);
    }
} elseif ($action === 'login') {
    $username = $data['username'];
    $password = $data['password'];
    $stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['username'] = $username;
        echo json_encode(['success' => true, 'username' => $username]);
    } else {
        echo json_encode(['success' => false, 'message' => '❌ Invalid credentials']);
    }
} elseif ($action === 'logout') {
    session_destroy();
    echo json_encode(['success' => true, 'message' => '👋 Logged out']);
} else {
    echo json_encode(['success' => false, 'message' => '❌ Invalid action']);
}
?>