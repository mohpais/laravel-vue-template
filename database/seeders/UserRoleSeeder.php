<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\UserRole;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       // Attach superadmin to users
       $superadminuser = User::where('username', 'superadmin')->first();
       $superadminrole = Role::where('slug', 'super-admin')->first();

       $superadminuser->roles()->attach($superadminrole->id);

       // Attach admin content to users
       $admincontentuser = User::where('username', 'riyanii19')->first();
       $admincontentrole = Role::where('slug', 'admin-content')->first();

       $admincontentuser->roles()->attach($admincontentrole->id);

       // Attach admin content to users
       $premiumuser = User::where('username', 'liusipin')->first();
       $premiumrole = Role::where('slug', 'premium-user')->first();

       $premiumuser->roles()->attach($premiumrole->id);

       // Attach admin content to users 
       $ordinaryuser = User::where('username', 'julian.valen')->first();
       $ordinaryrole = Role::where('slug', 'ordinary-user')->first();

       $ordinaryuser->roles()->attach($ordinaryrole->id);
    }
}
