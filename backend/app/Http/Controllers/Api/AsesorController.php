<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Asesor;
use Illuminate\Http\Request;

class AsesorController extends Controller
{
    public function search(Request $request)
    {
        $request->validate([
            'documento' => 'required|string'
        ]);

        $asesor = Asesor::where('numIdentificacion', $request->documento)->first();

        if ($asesor) {
            return response()->json([
                'exists' => true,
                'asesor' => [
                    'nombres' => $asesor->nombres,
                    'apellidos' => $asesor->apellido,
                    'telefono' => $asesor->telAsesor,
                    'correo' => $asesor->correoAsesor,
                    'documento' => $asesor->numIdentificacion
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
            'telefono' => 'required|string',
            'correo' => 'required|email',
        ]);

        $asesor = Asesor::updateOrCreate(
            ['numIdentificacion' => $request->documento],
            [
                'nombres' => $request->nombres,
                'apellido' => $request->apellidos,
                'telAsesor' => $request->telefono,
                'correoAsesor' => $request->correo
            ]
        );

        return response()->json([
            'message' => 'Asesor guardado/actualizado exitosamente',
            'asesor' => $asesor
        ], 201);
    }
}
