<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('asesores', function (Blueprint $table) {
            $table->id();
            $table->string('numIdentificacion');
            $table->string('nombres');
            $table->string('apellido');
            $table->string('telAsesor');
            $table->string('correoAsesor');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('asesores');
    }
};
