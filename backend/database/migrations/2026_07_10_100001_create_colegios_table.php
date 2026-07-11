<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('colegios', function (Blueprint $table) {
            $table->id();
            $table->string('codLocal');
            $table->string('nombre');
            $table->string('tipGestion');
            $table->string('nomDirector');
            $table->string('telefono');
            $table->string('correo');
            $table->string('direccion');
            $table->string('departamento');
            $table->string('provincia');
            $table->string('distrito');
            $table->string('dre_ugel');
            $table->string('telDirector')->nullable();
            $table->string('correoDirector')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('colegios');
    }
};
