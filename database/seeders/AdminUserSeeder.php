<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $name = env('ADMIN_NAME', 'admin');
        $password = env('ADMIN_PASSWORD', 'admin123');

        User::updateOrCreate(
            ['name' => $name],
            ['password' => Hash::make($password)]
        );
    }
}
