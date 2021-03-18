<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['prefix' => 'auth'], function(){
    Route::post('login',  [AuthController::class, 'login'])->name('login');
    Route::post('signup', [AuthController::class, 'signup'])->name('signup');
});

Route::group(['middleware' => 'auth:api'], function () {

	Route::group(['middleware' => 'admin'], function () {
    	Route::get('user', [AuthController::class, 'userInfo']);
        Route::get('users', [AuthController::class, 'userAll']);
        Route::get('edit/{id}', [AuthController::class, 'edit']);
    	Route::post('update', [AuthController::class, 'update']);
    	Route::post('create', [AuthController::class, 'store']);
    	Route::get('delete/{id}', [AuthController::class, 'delete']);
	});

    Route::get('logout', [AuthController::class, 'logout']);
});

Route::fallback(function(){
    return response()->json([
        'message' => 'Page Not Found. If error persists, contact Us'], 404);
});