<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InscripcionDetalleController extends Controller
{
    public function getDetalle(Request $request)
    {
        $request->validate([
            'inscripcion_cabecera_id' => 'required|integer',
            'anio_id' => 'required|integer',
        ]);

        $detalles = DB::table('inscripcion_detalle')
            ->where('inscripcion_cabecera_id', $request->inscripcion_cabecera_id)
            ->where('anio_id', $request->anio_id)
            ->get();

        if ($detalles->isEmpty()) {
            return response()->json(['exists' => false]);
        }

        // Asumimos que todos los detalles para el mismo año y la misma inscripción comparten el mismo asesor
        $asesor_id = $detalles->first()->asesor_id;
        
        $asesor = null;
        if ($asesor_id) {
            $asesor = DB::table('asesores')->where('id', $asesor_id)->first();
        }

        $estudiantes_ids = $detalles->pluck('estudiante_id')->toArray();
        
        $estudiantes = DB::table('estudiantes')
            ->whereIn('id', $estudiantes_ids)
            ->get();

        return response()->json([
            'exists' => true,
            'asesor' => $asesor ? [
                'id' => $asesor->id,
                'documento' => $asesor->numIdentificacion,
                'nombres' => $asesor->nombres,
                'apellidos' => $asesor->apellido,
                'telefono' => $asesor->telAsesor,
                'correo' => $asesor->correoAsesor,
            ] : null,
            'estudiantes' => $estudiantes->map(function($est) {
                return [
                    'id' => $est->id,
                    'documento' => $est->numIdentificacion,
                    'nombres' => $est->nombres,
                    'apellidos' => $est->apellidos,
                    'fechaNacimiento' => $est->fechaNacimiento,
                ];
            })
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'inscripcion_cabecera_id' => 'required|integer',
            'anio_id' => 'required|integer',
            'asesor_id' => 'required|integer',
            'estudiantes_ids' => 'required|array',
            'estudiantes_ids.*' => 'integer',
        ]);

        DB::beginTransaction();
        try {
            // Eliminar registros previos para esta inscripción y año
            DB::table('inscripcion_detalle')
                ->where('inscripcion_cabecera_id', $request->inscripcion_cabecera_id)
                ->where('anio_id', $request->anio_id)
                ->delete();

            // Insertar los nuevos registros
            $insertData = [];
            foreach ($request->estudiantes_ids as $estudiante_id) {
                $insertData[] = [
                    'inscripcion_cabecera_id' => $request->inscripcion_cabecera_id,
                    'estudiante_id' => $estudiante_id,
                    'anio_id' => $request->anio_id,
                    'asesor_id' => $request->asesor_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            DB::table('inscripcion_detalle')->insert($insertData);

            DB::commit();

            return response()->json(['message' => 'Detalles de inscripción guardados exitosamente'], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al guardar los detalles: ' . $e->getMessage()], 500);
        }
    }
}
