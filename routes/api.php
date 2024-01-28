<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\RoleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group([
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'me']);    
});

Route::group([
    'prefix' => 'user'
], function ($router) {
    Route::get('/list', [UserController::class, 'index']);
    Route::post('/list-datatables', [UserController::class, 'list']);  
    Route::post('/create', [UserController::class, 'store'])->name('user.store');
    Route::get('/edit/{id}', [UserController::class, 'edit'])->name('user.edit');
    Route::post('/update/{id}', [UserController::class, 'update'])->name('user.update');
    Route::post('/delete', [UserController::class, 'destroy'])->name('user.destroy');
});

Route::group([
    'prefix' => 'role'
], function ($router) {
    Route::get('/list', [RoleController::class, 'index']);  
});

Route::fallback(function(){
    return response()->json([
        'message' => 'Page Not Found. If error persists, contact info@website.com'], 404);
});

