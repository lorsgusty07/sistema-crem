<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SedesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sedes = [
            /** Sede 1 */
            [
                'nombre' => 'SEDE YURA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            /** Sede 2 */
            [
                'nombre' => 'SEDE CERRO COLORADO',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            /** Sede 3 */
            [
                'nombre' => 'SEDE CAYMA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            /** Sede 4 */
            [
                'nombre' => 'SEDE YANAHUARA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            /** Sede 5 */
            [
                'nombre' => 'SEDE AREQUIPA CERCADO',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            /** Sede 6 */
            [
                'nombre' => 'SEDE ALTO SELVA ALEGRE',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            /** Sede 7 */
            [
                'nombre' => 'SEDE MIRAFLORES',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE MARIANO MELGAR',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE CHIGUATA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE PAUCARPATA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE JOSE LUIS BUSTAMANTE Y RIVERO',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE SOCABAYA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE SABANDIA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE CHARACATO',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE YARABAMBA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE POLOBAYA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE QUEQUEÑA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE MOLLEBAYA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE POCSI',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE SAN JUAN DE TARUCANI',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE JACOBO HUNTER',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE TIABAYA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE UCHUMAYO',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE SACHACA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE LA JOYA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE PEDREGAL',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE CAMANA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE CAYLLOMA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE CARAVELI',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE CASTILLA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE CONDESUYOS',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE ISLAY',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE LA UNION',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE MOQUEGUA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE TACNA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE PUNO',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE JULIACA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE CUSCO',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE MADRE DE DIOS',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SEDE ICA',
                'direccion' => '-',
                'latitud' => null,
                'longitud' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]
            ];
            DB::table('sedes')->insert($sedes);
        
    }
}
