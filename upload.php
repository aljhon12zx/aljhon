<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Configuration
$uploadDir = 'img/uploads/';
$maxFileSize = 5 * 1024 * 1024; // 5MB per file
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

// Create upload directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Validate request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// Validate project ID
$projectId = isset($_POST['project_id']) ? intval($_POST['project_id']) : -1;
if ($projectId < 0 || $projectId > 2) {
    echo json_encode(['success' => false, 'message' => 'Invalid project ID.']);
    exit;
}

// Check if files were uploaded
if (empty($_FILES['images'])) {
    echo json_encode(['success' => false, 'message' => 'No files uploaded.']);
    exit;
}

$uploadedFiles = [];
$errors = [];

// Handle multiple file uploads
$files = $_FILES['images'];
$fileCount = is_array($files['name']) ? count($files['name']) : 1;

for ($i = 0; $i < $fileCount; $i++) {
    $fileName   = is_array($files['name'])     ? $files['name'][$i]     : $files['name'];
    $fileTmp    = is_array($files['tmp_name']) ? $files['tmp_name'][$i] : $files['tmp_name'];
    $fileSize   = is_array($files['size'])     ? $files['size'][$i]     : $files['size'];
    $fileError  = is_array($files['error'])    ? $files['error'][$i]    : $files['error'];
    $fileType   = is_array($files['type'])     ? $files['type'][$i]     : $files['type'];

    // Skip if upload error
    if ($fileError !== UPLOAD_ERR_OK) {
        $errors[] = "Error uploading file: $fileName";
        continue;
    }

    // Validate file size
    if ($fileSize > $maxFileSize) {
        $errors[] = "$fileName exceeds 5MB limit.";
        continue;
    }

    // Validate MIME type (use finfo for security)
    $finfo    = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $fileTmp);
    finfo_close($finfo);

    if (!in_array($mimeType, $allowedTypes)) {
        $errors[] = "$fileName is not an allowed image type.";
        continue;
    }

    // Generate a unique, safe filename
    $ext         = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $safeExt     = in_array($ext, ['jpg','jpeg','png','gif','webp']) ? $ext : 'jpg';
    $newFileName = 'project_' . $projectId . '_' . uniqid() . '.' . $safeExt;
    $destination = $uploadDir . $newFileName;

    if (move_uploaded_file($fileTmp, $destination)) {
        $uploadedFiles[] = $destination;
    } else {
        $errors[] = "Failed to save file: $fileName";
    }
}

// Return result
if (!empty($uploadedFiles)) {
    echo json_encode([
        'success' => true,
        'files'   => $uploadedFiles,
        'errors'  => $errors,
        'message' => count($uploadedFiles) . ' file(s) uploaded successfully.'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'errors'  => $errors,
        'message' => 'No files were uploaded successfully.'
    ]);
}
?>
