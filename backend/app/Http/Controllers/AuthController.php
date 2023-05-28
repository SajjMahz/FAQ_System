<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // $user = Auth::user();
            $user = $request->user();
            $token = $user->createToken($user->id)->plainTextToken;

            return response()->json([
                'status' => 1,
                'token' => $token
            ]);
        } else {
            return response()->json([
                'message' => 'Invalid login credentials'
            ], 401);
        }
    }

    public function getLoggedUser(Request $request)
    {
        try {
            if (Auth::check()) {
                $user = User::findOrFail(Auth::id())->only(['id', 'name', 'email']);
                return response()->json([
                    'getLoggedUserInfo' => $user
                ]);
            }
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
