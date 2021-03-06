<?php

namespace App\Http\Controllers\Api;

use App\User;
use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{

    public function __construct(User $user)
    {
       $this->middleware('guest')->except('logout');
    }

    public function login(Request $request, User $user)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        
        $inputs = ['email' => $request->get('email'), 'password' => $request->get('password')];
        if(!Auth::attempt($inputs, $request->has('remember'))){
            return response()->json(['message' => "Incorect Login or Password"],401);
        }

        $user = $user->where('email', $request->get('email'))->first();
        \Auth::login($user);
        return response()->json(['user' => Auth::user()],200);
    }

    public function logout(){
        Auth::logout();
        return response()->json(['message' => "403"], 200);
    }

    public function register(RegisterRequest $request) {

    	
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request -> input('password')),
            'confirm_token' => md5(time().str_random(2)),
        ]);
        Auth::login($user);
        return response()->json(['user' => Auth::user()], 200);
    }
    
   
}
