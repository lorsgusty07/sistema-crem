<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AniosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $anios = [
            [
                'grado_id' => 1,
                'nombre' => "5 AÑOS",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grado_id' => 2,
                'nombre' => "1er GRADO",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grado_id' => 2,
                'nombre' => "2do GRADO",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grado_id' => 2,
                'nombre' => "3er GRADO",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grado_id' => 2,
                'nombre' => "4to GRADO",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grado_id' => 2,
                'nombre' => "5to GRADO",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grado_id' => 2,
                'nombre' => "6to GRADO",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grado_id' => 3,
                'nombre' => "1er GRADO",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grado_id' => 3,
                'nombre' => "2do GRADO",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grado_id' => 3,
                'nombre' => "3er GRADO",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grado_id' => 3,
                'nombre' => "4to GRADO",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'grado_id' => 3,
                'nombre' => "5to GRADO",
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        DB::table('anios')->insert($anios);
    }
}
