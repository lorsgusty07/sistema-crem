<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('puntaje_fase', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inscripcion_detalle_id')->constrained('inscripcion_detalle')->onDelete('cascade');
            $table->integer('numFase');
            $table->integer('buenas');
            $table->integer('blanco');
            $table->integer('malas');
            $table->integer('puntaje');
            $table->enum('estado', ['Clasificado', 'Eliminado', 'Ausente']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('puntaje_fase');
    }
};
