<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ColegioController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/colegios/search', [ColegioController::class, 'search']);
Route::put('/colegios/{codigo}', [ColegioController::class, 'update']);
Route::post('/inscripciones', [App\Http\Controllers\Api\InscripcionController::class, 'store']);
