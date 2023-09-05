<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('admin/login',[AdminAuthController::class,'login']);

Route::middleware('auth:api')->group(function(){
    Route::get('/admin/user',function(Request $request){return $request->user();});
    Route::delete('admin/logout',[AdminAuthController::class,'logout']);
    Route::controller(AdminUserController::class)->group(function(){
        Route::get('registered_users','registered_users');
    });
});
