<?php
require_once 'doctrine.php'; // Your Doctrine setup

try {
    $categories = $entityManager->getRepository('App\Entity\Category')->findAll();
    foreach ($categories as $category) {
        echo $category->getId() . ': ' . $category->getName() . "\n";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage();
}
