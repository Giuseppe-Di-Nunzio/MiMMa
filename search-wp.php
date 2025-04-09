<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once("../../../wp-load.php"); // Carica WordPress

$searchQuery = isset($_GET['q']) ? sanitize_text_field($_GET['q']) : '';
$results = [];

if (empty($searchQuery)) {
    echo json_encode(["error" => "Nessuna query di ricerca specificata"]);
    exit;
}

// Suddivide la query in parole chiave
$keywords = explode(' ', $searchQuery);

// Creazione della query con più termini
$args = [
    'post_type'      => ['post', 'page'], // Cerca solo nei post e nelle pagine
    'posts_per_page' => 10, // Aumenta il numero massimo di risultati
    'post_status'    => 'publish', // Cerca solo nei post pubblicati
    's'             => $searchQuery, // Usa la ricerca globale di WP_Query
    'tax_query'      => [], // Evitiamo tassonomie
    'meta_query'     => [], // Nessun meta-query per evitare errori
];

// WP_Query con filtro per garantire che tutte le parole siano presenti
$query = new WP_Query($args);

if ($query->have_posts()) {
    while ($query->have_posts()) {
        $query->the_post();

        // Controlliamo se tutte le parole chiave sono presenti nel titolo o nel contenuto
        $post_content = strtolower(get_the_title() . ' ' . get_the_content());
        $contains_all_keywords = true;

        foreach ($keywords as $word) {
            if (!str_contains($post_content, strtolower($word))) {
                $contains_all_keywords = false;
                break;
            }
        }

        // Aggiunge solo i post che contengono tutte le parole chiave
        if ($contains_all_keywords) {
            $results[] = [
                "title"   => get_the_title(),
                "url"     => get_permalink(),
                "content" => wp_trim_words(get_the_content(), 100, '...') // Riassunto
            ];
        }
    }
}

wp_reset_postdata();

echo json_encode($results);
?>
