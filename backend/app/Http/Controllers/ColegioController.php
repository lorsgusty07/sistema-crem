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
}
