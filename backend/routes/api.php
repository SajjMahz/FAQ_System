<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/error', function () {
    return 'unauthenticated';
})->name('error');
Route::post('/login', 'AuthController@login');
Route::get('/getLoggedUser', 'AuthController@getLoggedUser')->middleware('auth:api');

Route::group(['prefix' => 'user'], function () {
    Route::get('/', 'UserController@index')->middleware('auth:api');
    Route::post('/', 'UserController@store');
});

Route::group(['middleware' => ['auth:api'], 'prefix' => 'question'], function () {
    Route::get('/', 'QuestionController@index');
    Route::post('/', 'QuestionController@store');
    Route::get('/show/{id}', 'QuestionController@show');
    Route::post('/vote/{id}', 'QuestionController@vote');
});

Route::group(['middleware' => ['auth:api'], 'prefix' => 'comment'], function () {
    Route::get('/', 'CommentController@index');
    Route::post('/', 'CommentController@store');
    Route::get('/show/{id}', 'CommentController@show');
});
