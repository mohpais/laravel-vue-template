<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userData = [
            [
                'fullname' => 'Mohamad Pais',
                'username' => 'superadmin',
                'email' => 'super.admin@tnovelapp.com',
                'password' => Hash::make('TNovelApp@2024')
            ],
            [
                'fullname' => 'Ani Riyani',
                'username' => 'riyanii19',
                'email' => 'aniriyanii19@tnovelapp.com',
                'password' => Hash::make('test123')
            ],
            [
                'fullname' => 'Devin Liu',
                'username' => 'liusipin',
                'email' => 'devin@londonsumatra.com',
                'password' => Hash::make('test123')
            ],
            [
                'fullname' => 'Julian Valention',
                'username' => 'julian.valen',
                'email' => 'julian.valen@londonsumatra.com',
                'password' => Hash::make('test123')
            ]
        ];

        foreach ($userData as $user) {
            User::create($user);
        }
    }
}
