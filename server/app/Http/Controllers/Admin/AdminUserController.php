<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function registered_users(){
        // $users = User::where('access_type','!=','admin')->get();
        $users = User::get();
        foreach($users as $user){
            $data[] = ['user_id' => $user->id,'auth_type' => $user->auth_type,'name' => $user->first_name." ".$user->last_name,'email' => $user->email,'profile_image' => $user->profile_image,'privacy' => $user->privacy];
        }
        return response()->json(['status' => 200,'data' => ['users' => $data]]);
    }
}
