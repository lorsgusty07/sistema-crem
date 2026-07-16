<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ColegioController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/colegios/search', [ColegioController::class, 'search']);
Route::put('/colegios/{codigo}', [ColegioController::class, 'update']);
Route::get('/inscripciones/check', [App\Http\Controllers\Api\InscripcionController::class, 'check']);
Route::post('/inscripciones', [App\Http\Controllers\Api\InscripcionController::class, 'store']);

Route::get('/asesores/search', [App\Http\Controllers\Api\AsesorController::class, 'search']);
Route::post('/asesores', [App\Http\Controllers\Api\AsesorController::class, 'store']);

Route::get('/estudiantes/search', [App\Http\Controllers\Api\EstudianteController::class, 'search']);
Route::post('/estudiantes', [App\Http\Controllers\Api\EstudianteController::class, 'store']);
Route::delete('/estudiantes/{id}', [App\Http\Controllers\Api\EstudianteController::class, 'destroy']);

Route::get('/inscripciones/detalle', [App\Http\Controllers\Api\InscripcionDetalleController::class, 'getDetalle']);
Route::post('/inscripciones/detalle', [App\Http\Controllers\Api\InscripcionDetalleController::class, 'store']);
