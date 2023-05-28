<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        try {
            $users = User::get(['id', 'name', 'email']);
            return response()->json([
                'status' => 1,
                'users' => $users
            ]);    
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function store(Request $request) {
        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->save();

            return response()->json([
                'message' => 'User Successfully Created',
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
