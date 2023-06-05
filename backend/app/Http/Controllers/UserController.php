<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;

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
            $user->sendEmailVerificationNotification();
            return response()->json([
                'message' => 'User Successfully Created',
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function verify(Request $request)
    {
        $user = User::findOrFail($request->id);

        if ($user->hasVerifiedEmail()) {
            // return response()->json(['message' => 'Email already verified.'], 400);
            return view('verified', ['message' => 'Email already verified.' ]);
        }
    
        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }
    
        // return response()->json(['message' => 'Email verified successfully.'], 200);
        return view('verified', ['message' => 'Email verified successfully.' ]);
    }
}
