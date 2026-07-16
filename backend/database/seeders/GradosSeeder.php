<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GradosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grados = [
            [
                'nombre' => 'INICIAL',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'PRIMARIA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'SECUNDARIA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('grados')->insert($grados);
    }
}
