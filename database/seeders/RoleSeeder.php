<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

use Cviebrock\EloquentSluggable\Services\SlugService;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roleData = [
            [
                'name' => 'Super Admin',
                // 'slug' => 'super-admin',
                'created_by' => 'System',
                'updated_by' => 'System'
            ],
            [
                'name' => 'Admin Content',
                // 'slug' => 'admin-content',
                'created_by' => 'System',
                'updated_by' => 'System'
            ],
            [
                'name' => 'Admin User',
                // 'slug' => 'admin-user',
                'created_by' => 'System',
                'updated_by' => 'System'
            ],
            [
                'name' => 'Premium User',
                // 'slug' => 'premium-user',
                'created_by' => 'System',
                'updated_by' => 'System'
            ],
            [
                'name' => 'Ordinary User',
                // 'slug' => 'ordinary-user',
                'created_by' => 'System',
                'updated_by' => 'System'
            ]
        ];

        foreach ($roleData as $role) {
            Role::create($role);
        }
    }
}
