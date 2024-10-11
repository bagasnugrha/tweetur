<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $field = $request->validate([
            'name' => 'required|max:50',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $user = User::create($field);
        $token = $user->createToken($user->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        /**
         * check if email and password is exist in db
         *  first() is to return only 1 record (bcs the condition may return multiple records)
         */
        $user = User::where('email', $request->email)->first();
        if (!($user && Hash::check($request->password, $user->password))) {
            return ['errors' => 
                        [
                            'email' => "The provided email or password doesn't match our records"
                        ] 
                    ];
                
        }
        
        // create new token
        $token = $user->createToken($user->name);
        
        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }
    
    public function logout(Request $request)
    {
        // delete user token
        $request->user()->tokens()->delete();

        return [
            'message' => 'You are logged out'
        ];
    }
}
