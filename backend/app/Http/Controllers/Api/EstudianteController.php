<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Estudiante;
use Illuminate\Http\Request;

class EstudianteController extends Controller
{
    public function search(Request $request)
    {
        $request->validate([
            'documento' => 'required|string'
        ]);

        $estudiante = Estudiante::where('numIdentificacion', $request->documento)->first();

        if ($estudiante) {
            return response()->json([
                'exists' => true,
                'estudiante' => [
                    'id' => $estudiante->id,
                    'documento' => $estudiante->numIdentificacion,
                    'nombres' => $estudiante->nombres,
                    'apellidos' => $estudiante->apellidos,
                    'fechaNacimiento' => $estudiante->fechaNacimiento
                ]
            ]);
        }

        return response()->json(['exists' => false]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'documento' => 'required|string',
            'nombres' => 'required|string',
            'apellidos' => 'required|string',
            'fechaNacimiento' => 'required|date',
        ]);

        $estudiante = Estudiante::updateOrCreate(
            ['numIdentificacion' => $request->documento],
            [
                'nombres' => $request->nombres,
                'apellidos' => $request->apellidos,
                'fechaNacimiento' => $request->fechaNacimiento,
            ]
        );

        return response()->json([
            'message' => 'Estudiante guardado exitosamente',
            'estudiante' => [
                'id' => $estudiante->id,
                'documento' => $estudiante->numIdentificacion,
                'nombres' => $estudiante->nombres,
                'apellidos' => $estudiante->apellidos,
                'fechaNacimiento' => $estudiante->fechaNacimiento,
            ]
        ], 201);
    }

    public function destroy($id)
    {
        $estudiante = Estudiante::find($id);

        if (!$estudiante) {
            return response()->json(['message' => 'Estudiante no encontrado'], 404);
        }

        $estudiante->delete();

        return response()->json(['message' => 'Estudiante eliminado exitosamente'], 200);
    }
}
