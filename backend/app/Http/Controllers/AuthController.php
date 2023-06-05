<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use App\Events\PasswordReset;
use Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // $user = Auth::user();
            $user = $request->user();
            if($user->email_verified_at == null) {
                return response()->json([
                    'message' => 'Please verify your email'
                ], 403);
            }

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

    public function forgotPassword(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|exists:users,email'
            ]);

            if($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors()->first()
                ], 403);
            }

            $status = Password::sendResetLink($request->only('email'));

            return $status === Password::RESET_LINK_SENT
                ? response()->json(['status' => __($status)])
                : response()->json(['email' => __($status)]);
            
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function showResetForm(Request $request, $token)
    {
        $email = $request->email;

        return view('resetPassword', [
            'token' => $token,
            'email' => $email
        ]);
    }

    public function resetPassword(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'token' => 'required',
                'email' => 'required|email',
                'password' => 'required|min:8|confirmed',
            ]);

            if($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors()
                ], 403);
            }

            $user = User::where('email', $request->get('email'))->first();
            if ($user->email_verified_at == null) {
                return response()->json([
                    'message' => 'Please verify your email'
                ], 403);
            }

            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function (User $user, string $password) {
                    $user->forceFill([
                        'password' => bcrypt($password)
                    ])->setRememberToken(Str::random(60));
         
                    $user->save();
                }
            );

            return $status === Password::PASSWORD_RESET
                ? response()->json(['status' => __($status)])
                : response()->json(['email' => __($status)]);
            
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
