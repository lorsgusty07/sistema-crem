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
        $csvFile = fopen(database_path('data/Padron.csv'), 'r');
        
        $encabezados = []; // Aquí guardaremos los nombres de las columnas
        $primeraFila = true;
        $procesados = []; // Para evitar duplicados de código local y nombre
        
        while (($datos = fgetcsv($csvFile)) !== FALSE) {
            
            // Si es la primera fila, limpiamos los nombres (ej. de "CODLOCAL,C,6" a "CODLOCAL")
            if ($primeraFila) {
                $encabezados = array_map(function($header) {
                    return explode(',', $header)[0]; // Toma solo la primera parte antes de la coma
                }, $datos); 
                $primeraFila = false;
                continue;
            }

            $fila = array_combine($encabezados, $datos);

            $clave = $fila['CODLOCAL'] . '-' . $fila['CEN_EDU'];
            if (isset($procesados[$clave])) {
                continue;
            }
            $procesados[$clave] = true;

            DB::table('colegios')->insert([
                'codLocal'     => $fila['CODLOCAL'],
                'nombre'       => $fila['CEN_EDU'],
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
            ]);
        }
        fclose($csvFile);
    }
}
