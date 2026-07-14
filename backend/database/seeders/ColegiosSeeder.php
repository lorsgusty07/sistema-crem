<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ColegiosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvPath = database_path('data/Padron.csv');
        $nivelesPermitidos = ['A2', 'A3', 'A5', 'B0', 'F0'];
        $nivelesPorColegio = [];

        // PASADA 1: Recopilar todos los niveles únicos por cada colegio para ahorrar memoria
        $csvFile = fopen($csvPath, 'r');
        
        // Limpiamos la primera línea de posibles BOM y sacamos los encabezados
        $primeraLinea = fgets($csvFile);
        $primeraLinea = preg_replace('/^[\xef\xbb\xbf]+/', '', $primeraLinea);
        $encabezados = str_getcsv($primeraLinea);
        $encabezados = array_map(function($header) {
            return explode(',', $header)[0];
        }, $encabezados);

        while (($datos = fgetcsv($csvFile)) !== FALSE) {
            if (count($encabezados) !== count($datos)) {
                continue; // Saltamos filas con formato roto para evitar crash
            }

            $fila = array_combine($encabezados, $datos);
            $nivMod = trim($fila['NIV_MOD']);

            if (!in_array($nivMod, $nivelesPermitidos)) {
                continue;
            }

            $clave = $fila['CODLOCAL'] . '-' . $fila['CEN_EDU'];

            if (!isset($nivelesPorColegio[$clave])) {
                $nivelesPorColegio[$clave] = [];
            }
            if (!in_array($nivMod, $nivelesPorColegio[$clave])) {
                $nivelesPorColegio[$clave][] = $nivMod;
            }
        }
        fclose($csvFile);

        // PASADA 2: Insertar en lotes a la base de datos
        $csvFile = fopen($csvPath, 'r');
        fgets($csvFile); // Saltar encabezados

        $lote = [];
        $procesados = [];

        while (($datos = fgetcsv($csvFile)) !== FALSE) {
            if (count($encabezados) !== count($datos)) {
                continue;
            }

            $fila = array_combine($encabezados, $datos);
            $nivMod = trim($fila['NIV_MOD']);

            if (!in_array($nivMod, $nivelesPermitidos)) {
                continue;
            }

            $clave = $fila['CODLOCAL'] . '-' . $fila['CEN_EDU'];

            // Si ya procesamos este colegio, lo saltamos
            if (isset($procesados[$clave])) {
                continue;
            }
            $procesados[$clave] = true;

            $nivelConcatenado = implode(',', $nivelesPorColegio[$clave]);

            $lote[] = [
                'codLocal'     => $fila['CODLOCAL'],
                'nombre'       => $fila['CEN_EDU'],
                'nivel'        => $nivelConcatenado,
                'tipGestion'   => $fila['D_GESTION'],
                'nomDirector'  => $fila['DIRECTOR'],
                'telefono'     => $fila['TELEFONO'],
                'correo'       => $fila['EMAIL'],
                'direccion'    => $fila['DIR_CEN'],
                'departamento' => $fila['D_DPTO'],
                'provincia'    => $fila['D_PROV'],
                'distrito'     => $fila['D_DIST'],
                'dre_ugel'     => $fila['D_DREUGEL'],
                'telDirector'  => null,
                'correoDirector'=> null,
                'created_at'   => now(),
                'updated_at'   => now(),
            ];

            // Insertar por lotes de 1000
            if (count($lote) >= 1000) {
                DB::table('colegios')->insert($lote);
                $lote = []; // Liberar memoria
            }
        }
        fclose($csvFile);

        // Insertar registros restantes
        if (count($lote) > 0) {
            DB::table('colegios')->insert($lote);
        }
    }
}
