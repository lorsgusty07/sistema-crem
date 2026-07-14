<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\InscripcionCabecera;
use App\Models\Colegio;
use Illuminate\Support\Str;

class InscripcionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'idColegio' => 'required', // This comes as codLocal from frontend
            'modalidad' => 'required|in:Libre,Delegacion',
            'edicion' => 'required|string',
        ]);

        // Find the Colegio by codLocal to get its real database ID
        $colegio = Colegio::where('codLocal', $request->idColegio)->first();

        if (!$colegio) {
            return response()->json(['error' => 'Colegio no encontrado'], 404);
        }

        // Generate unique clave (6 alphanumeric uppercase characters)
        do {
            $clave = strtoupper(Str::random(6));
        } while (InscripcionCabecera::where('clave', $clave)->exists());

        // Lógica de asignación de sede
        $sede_id = null;

        // 1. Buscamos por distrito exacto en el mismo departamento y provincia
        $coberturaDistrito = \Illuminate\Support\Facades\DB::table('sedes_cobertura')
            ->where('departamento', $colegio->departamento)
            ->where('provincia', $colegio->provincia)
            ->where('distrito', $colegio->distrito)
            ->first();

        if ($coberturaDistrito) {
            $sede_id = $coberturaDistrito->sede_id;
        } else {
            // 2. Buscamos por provincia (donde distrito es nulo)
            $coberturaProvincia = \Illuminate\Support\Facades\DB::table('sedes_cobertura')
                ->where('departamento', $colegio->departamento)
                ->where('provincia', $colegio->provincia)
                ->whereNull('distrito')
                ->first();

            if ($coberturaProvincia) {
                $sede_id = $coberturaProvincia->sede_id;
            } else {
                // 3. Buscamos por departamento (donde provincia y distrito son nulos)
                $coberturaDepartamento = \Illuminate\Support\Facades\DB::table('sedes_cobertura')
                    ->where('departamento', $colegio->departamento)
                    ->whereNull('provincia')
                    ->whereNull('distrito')
                    ->first();

                if ($coberturaDepartamento) {
                    $sede_id = $coberturaDepartamento->sede_id;
                }
            }
        }

        if (!$sede_id) {
            return response()->json([
                'error' => 'No se puede asignar una sede porque el colegio está fuera de los departamentos, provincias o distritos que pueden participar.'
            ], 400);
        }

        // Create the inscripcion
        $inscripcion = InscripcionCabecera::create([
            'colegio_id' => $colegio->id,
            'sede_id' => $sede_id, 
            'modalidad' => $request->modalidad,
            'edicion' => $request->edicion,
            'monto' => 0,
            'estPago' => 'no',
            'clave' => $clave
        ]);

        return response()->json([
            'message' => 'Inscripción creada exitosamente',
            'idInscripcion' => $inscripcion->id,
            'clave' => $clave
        ], 201);
    }
}
