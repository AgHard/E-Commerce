<?php
// doctrine.php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require_once 'vendor/autoload.php';

// Load database configuration from config/database.php
$dbConfig = require __DIR__ . '/config/database.php';

// Error handling for database config loading
if (!$dbConfig || !isset($dbConfig['dbname'])) {
    file_put_contents('error_log.log', "Failed to load or decode database configuration\n", FILE_APPEND);
    die('Error: Failed to load database configuration.');
}

$paths = [__DIR__ . '/src/Entity'];
$isDevMode = true; // Use true for development

try {
    // Create Doctrine ORM configuration with $useSimpleAnnotationReader set to false
    $config = Setup::createAnnotationMetadataConfiguration($paths, $isDevMode, null, null, false);

    // Database connection options (loaded from the config file)
    $connectionOptions = [
        'driver' => $dbConfig['driver'],
        'host' => $dbConfig['host'],
        'port' => $dbConfig['port'],
        'dbname' => $dbConfig['dbname'],
        'user' => $dbConfig['user'],
        'password' => $dbConfig['password'],
    ];

    // Create EntityManager
    $entityManager = EntityManager::create($connectionOptions, $config);
} catch (\Exception $e) {
    // Log any errors that occur during Doctrine setup or connection
    file_put_contents('error_log.log', 'Doctrine setup error: ' . $e->getMessage() . "\n", FILE_APPEND);
    die('Error: Doctrine setup failed.');
}
