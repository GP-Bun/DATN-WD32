<?php

/// app/Models/Category.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Dòng này là bắt buộc nếu dùng SoftDeletes

class Category extends Model
{
    use HasFactory, SoftDeletes; // Phải có SoftDeletes nếu migration có deleted_at
    
    // DÒNG QUAN TRỌNG NHẤT: Cho phép gán hàng loạt các trường này
    protected $fillable = [
        'name', 
        'description',
    ]; 

    // Quan hệ
    public function products() 
    { 
        return $this->hasMany(Product::class); 
    }
}