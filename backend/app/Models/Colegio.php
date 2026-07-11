<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Colegio extends Model
{
    protected $table = 'colegios';

    protected $fillable = [
        'codLocal',
        'nombre',
        'tipGestion',
        'nomDirector',
        'telefono',
        'correo',
        'direccion',
        'departamento',
        'provincia',
        'distrito',
        'dre_ugel',
        'telDirector',
        'correoDirector'
    ];
}
