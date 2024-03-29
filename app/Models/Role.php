<?php

namespace App\Models;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    // protected $guarded = [];
    protected $fillable = ['name', 'slug', 'description', 'created_by', 'updated_by'];


    public function users()
    {
        return $this->belongsToMany(User::class, 'user_roles');
    }

    /**
     * Boot the model.
     */
     protected static function boot()
     {
         parent::boot();
         static::created(function ($role) {
            $role->slug = $role->generateSlug($role->name);
            $role->save();
        });
     }
 
     /** 
      * Write code on Method
      *
      * @return response()
      */
     private function generateSlug($name)
     {
         if (static::whereSlug($slug = Str::slug($name))->exists()) {
 
             $max = static::whereName($name)->latest('id')->skip(1)->value('slug');
 
             if (isset($max[-1]) && is_numeric($max[-1])) {
 
                 return preg_replace_callback('/(\d+)$/', function ($mathces) {
 
                     return $mathces[1] + 1;
                 }, $max);
             }
             return "{$slug}-2";
         }
         return $slug;
     }
}
