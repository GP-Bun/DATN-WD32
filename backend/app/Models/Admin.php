<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // dùng Authenticatable để auth
use Laravel\Sanctum\HasApiTokens; // dùng Sanctum tạo token

class Admin extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password', // không trả về password
    ];
}
