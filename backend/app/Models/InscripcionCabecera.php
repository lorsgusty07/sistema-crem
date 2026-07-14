<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InscripcionCabecera extends Model
{
    protected $table = 'inscripcion_cabecera';

    protected $fillable = [
        'colegio_id',
        'sede_id',
        'modalidad',
        'edicion',
        'monto',
        'estPago',
        'clave'
    ];

    public function colegio()
    {
        return $this->belongsTo(Colegio::class, 'colegio_id');
    }
}
