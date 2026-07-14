<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Colegio;

class ColegioController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');
        
        if (!$query || strlen($query) < 2) {
            return response()->json([]);
        }

        $colegios = Colegio::where('codLocal', 'LIKE', $query . '%')->limit(5)->get();
        return response()->json($colegios);
    }

    public function update(Request $request, $codigo)
    {
        $colegio = Colegio::where('codLocal', $codigo)->first();
        
        if ($colegio) {
            $data = $request->all();
            
            // Map frontend fields to DB fields if they differ
            if (isset($data['director'])) {
                $data['nomDirector'] = $data['director'];
                unset($data['director']);
            }
            if (isset($data['celularDirector'])) {
                $data['telDirector'] = $data['celularDirector'];
                unset($data['celularDirector']);
            }
            
            $colegio->update($data);
            return response()->json(['message' => 'Colegio actualizado con éxito', 'data' => $colegio]);
        }
        
        return response()->json(['error' => 'Colegio no encontrado'], 404);
    }
}
