<?php

$allowedFiles = [
    'css',
    'js'
];

$regex = '/\.(?:' . implode('|', $allowedFiles) . ')$/';

if (preg_match($regex, $_SERVER['REQUEST_URI'])) {
    return false;
} else {
    require __DIR__ . '/index.php';
}
