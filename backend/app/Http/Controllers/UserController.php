<?php

namespace App\Http\Controllers;
Use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request) 
    {
        $user = new User();
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->password = $request->get('password');
        $user->save();
        return response()->json([
            'status' => 1,
            'data' => $user
        ]);
    }
}
