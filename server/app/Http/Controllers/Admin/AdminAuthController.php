<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    public function login(Request $request){
        $request->validate(['email' => 'required','password' => 'required']);
        $user = User::where('email', $request->email)->first();
        if($user){
            if(Hash::check($request->password, $user->password)){
                $token = $user->createToken($request->email)->accessToken;
                return response()->json(['status'=>200,'data' => ['user'=>$user,'token'=>$token],'message' => 'Admin Login Successfully']);
            }else{throw ValidationException::withMessages(['password' => 'Invalid Password']);}
        }else{throw ValidationException::withMessages(['email' => 'The provided credentials are incorrect.']);}
    }

    public function logout(Request $request){
        $request->user()->tokens->each(function ($token) {$token->delete();});
        return response()->json(['status' => 200,'message' => 'Logout Successfully']);
    }
}
