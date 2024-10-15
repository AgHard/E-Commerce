<?php

use GraphQL\GraphQL;
use App\GraphQL\SchemaBuilder;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

require 'vendor/autoload.php';
require 'doctrine.php';

$entityManager = $entityManager; // Assuming you have set up Doctrine here
$schema = SchemaBuilder::build($entityManager);

$request = Request::createFromGlobals();
$rawInput = $request->getContent();
$input = json_decode($rawInput, true);

$query = $input['query'] ?? '';
$variables = $input['variables'] ?? null;

try {
    $result = GraphQL::executeQuery($schema, $query, null, null, $variables);
    $output = $result->toArray();
} catch (\Exception $e) {
    $output = ['errors' => [['message' => $e->getMessage()]]];
}

header('Content-Type: application/json');
echo json_encode($output);
