<?php
$csvFile = fopen('/home/lorsgusty07/Documents/Trabajo/Gutyca/ADI/sistema-crem/backend/database/data/Padron.csv', 'r');
$encabezados = [];
$primeraFila = true;
$count = 0;
$nivelesPermitidos = ['A2', 'A3', 'A5', 'B0', 'F0'];

while (($datos = fgetcsv($csvFile)) !== FALSE) {
    if ($primeraFila) {
        $encabezados = array_map(function($header) {
            return explode(',', $header)[0];
        }, $datos); 
        $primeraFila = false;
        continue;
    }
    $fila = array_combine($encabezados, $datos);
    $nivMod = $fila['NIV_MOD'];
    if (in_array($nivMod, $nivelesPermitidos)) {
        $count++;
    }
}
fclose($csvFile);
echo "Count matched: $count\n";
