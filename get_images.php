<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$uploadDir = 'img/uploads/';

// Create directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
    echo json_encode(['success' => true, 'projects' => [0 => [], 1 => [], 2 => []]]);
    exit;
}

// Get all images grouped by project ID
$projects = [0 => [], 1 => [], 2 => []];

$files = glob($uploadDir . 'project_*.*');

if ($files) {
    foreach ($files as $file) {
        $basename = basename($file);
        // Extract project ID from filename pattern: project_{id}_{uniqid}.{ext}
        if (preg_match('/^project_(\d+)_/', $basename, $matches)) {
            $projectId = intval($matches[1]);
            if (isset($projects[$projectId])) {
                $projects[$projectId][] = $file;
            }
        }
    }
}

echo json_encode([
    'success'  => true,
    'projects' => $projects
]);
?>
