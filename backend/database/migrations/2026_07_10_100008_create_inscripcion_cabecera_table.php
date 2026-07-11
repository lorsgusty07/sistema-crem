<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inscripcion_cabecera', function (Blueprint $table) {
            $table->id();
            $table->foreignId('colegio_id')->constrained('colegios')->onDelete('cascade');
            $table->foreignId('asesor_id')->nullable()->constrained('asesores')->onDelete('set null');
            $table->foreignId('sede_id')->constrained('sedes')->onDelete('cascade');
            $table->enum('modalidad', ['Libre', 'Delegacion']);
            $table->string('edicion');
            $table->integer('monto');
            $table->enum('estPago', ['si', 'no']);
            $table->string('clave');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inscripcion_cabecera');
    }
};
