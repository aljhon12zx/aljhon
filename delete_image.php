<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

$filePath = isset($_POST['file']) ? $_POST['file'] : '';

// Security: only allow deletion within img/uploads/ folder
$uploadDir = 'img/uploads/';
$realUploadDir = realpath($uploadDir);

if (empty($filePath)) {
    echo json_encode(['success' => false, 'message' => 'No file specified.']);
    exit;
}

// Strip any path traversal attempts
$basename = basename($filePath);
$fullPath = $uploadDir . $basename;
$realPath = realpath($fullPath);

// Make sure the file is inside the uploads directory
if ($realPath === false || strpos($realPath, $realUploadDir) !== 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid file path.']);
    exit;
}

// Check file belongs to a project (extra safety)
if (!preg_match('/^project_\d+_/', $basename)) {
    echo json_encode(['success' => false, 'message' => 'Not a project image file.']);
    exit;
}

if (file_exists($fullPath) && unlink($fullPath)) {
    echo json_encode(['success' => true, 'message' => 'File deleted successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete file.']);
}
?>
