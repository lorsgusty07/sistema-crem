<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoberturaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cobertura = [
            [
                'sede_id' => 1,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'YURA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 2,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'CERRO COLORADO',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 3,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'CAYMA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 4,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'YANAHUARA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 5,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'AREQUIPA', // Cercado
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 6,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'ALTO SELVA ALEGRE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 7,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'MIRAFLORES',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 8,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'MARIANO MELGAR',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 9,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'CHIGUATA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 10,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'PAUCARPATA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 11,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'JOSE LUIS BUSTAMANTE Y RIVERO',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 12,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'SOCABAYA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 13,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'SABANDIA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 14,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'CHARACATO',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 15,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'YARABAMBA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 16,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'POLOBAYA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 17,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'QUEQUEÑA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 18,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'MOLLEBAYA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 19,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'POCSI',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 20,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'SAN JUAN DE TARUCANI',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 21,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'JACOBO HUNTER',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 22,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'TIABAYA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 23,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'UCHUMAYO',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 24,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'SACHACA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 25,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'LA JOYA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 25,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'VITOR',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 25,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'SANTA ISABEL DE SIGUAS',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 25,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'SAN JUAN DE SIGUAS',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 25,
                'departamento' => 'AREQUIPA',
                'provincia' => 'AREQUIPA',
                'distrito' => 'SANTA RITA DE SIGUAS',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 26,
                'departamento' => 'AREQUIPA',
                'provincia' => 'CAYLLOMA',
                'distrito' => 'MAJES', // Pedregal es la capital de Majes
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ==========================================
            // NIVEL 2: AREQUIPA - POR PROVINCIA (Sedes 27 al 33)
            // Aquí dejamos 'distrito' => null para que cubra toda la provincia
            // ==========================================
            [
                'sede_id' => 27,
                'departamento' => 'AREQUIPA',
                'provincia' => 'CAMANA',
                'distrito' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 28,
                'departamento' => 'AREQUIPA',
                'provincia' => 'CAYLLOMA', // Cubrirá los distritos de Caylloma que no sean Majes/Pedregal
                'distrito' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 29,
                'departamento' => 'AREQUIPA',
                'provincia' => 'CARAVELI',
                'distrito' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 30,
                'departamento' => 'AREQUIPA',
                'provincia' => 'CASTILLA',
                'distrito' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 31,
                'departamento' => 'AREQUIPA',
                'provincia' => 'CONDESUYOS',
                'distrito' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 32,
                'departamento' => 'AREQUIPA',
                'provincia' => 'ISLAY',
                'distrito' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 33,
                'departamento' => 'AREQUIPA',
                'provincia' => 'LA UNION',
                'distrito' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ==========================================
            // NIVEL 3: OTRAS REGIONES - POR DEPARTAMENTO / PROVINCIA (Sedes 34 al 40)
            // Dejamos provincia y distrito en null para cobertura total del departamento,
            // salvo en Puno donde dividimos entre San Román (Juliaca) y Puno.
            // ==========================================
            [
                'sede_id' => 34,
                'departamento' => 'MOQUEGUA',
                'provincia' => null,
                'distrito' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 35,
                'departamento' => 'TACNA',
                'provincia' => null,
                'distrito' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 36,
                'departamento' => 'PUNO',
                'provincia' => null, // O puedes dejar null si quieres que sea el default de la región
                'distrito' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 37,
                'departamento' => 'PUNO',
                'provincia' => 'SAN ROMAN', // Juliaca pertenece a la provincia de San Román
                'distrito' => 'JULIACA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 38,
                'departamento' => 'CUSCO',
                'provincia' => null,
                'distrito' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 39,
                'departamento' => 'MADRE DE DIOS',
                'provincia' => null,
                'distrito' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sede_id' => 40,
                'departamento' => 'ICA',
                'provincia' => null,
                'distrito' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('sedes_cobertura')->insert($cobertura);
    }
}
