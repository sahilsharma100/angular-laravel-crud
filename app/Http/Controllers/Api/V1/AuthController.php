<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
 
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
   public function signup(Request $request)
    {
         $validator = Validator::make($request->all(), [
	      'name' => 'required|string|max:255',
	      'email' => 'required|string|email|max:255|unique:users',
	      'password' => 'required|string|min:6',
	     ]);

	    if($validator->fails()){
	        return response()->json(['status' => 'error','message' => $validator->errors()->toJson()], 400);
	    }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]); 
  
        $token = $user->createToken('AuthToken')->accessToken;
  
        return response()->json(['status' => 'success', 'message' => null ,'token' => $token, 'role' => 'user'], 200);
    }
  
    public function login(Request $request)
    {
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];
  
        if (Auth::attempt($data)) {
            $token = Auth::user()->createToken('AuthToken')->accessToken;
            return response()->json(['status' => 'success' , 'message' => null, 'token' => $token, 'role' =>  Auth::user()->role], 200);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Unauthorised'], 401);
        }
    }
 
    public function userInfo() 
    {
     $user =  Auth::user();
     return response()->json(['status' => 'success', 'message' => null, 'data' => $user], 200);
    }

    public function edit($id) 
    {
     $user = User::whereId($id)->first();
     if ($user) {
     	return response()->json(['status' => 'success', 'message' => null, 'data' => $user], 200);
     }
     return response()->json(['status' => 'error', 'message' => 'user Not Found'], 400);
    }
  	public function userAll() 
    {
     $user = User::all();
     if($user){
     	return response()->json(['status' => 'success', 'message' => null, 'data' => $user], 200);
     }
     return response()->json(['status' => 'error', 'message' => 'Something went Wrong', 'data' => $user], 400);
    }

    public function store(Request $request)
	{
		$input = $request->all();
		$validator = Validator::make($input, [
			'name' => 'required',
			'email' => 'required|unique:users',
			'password' => 'required|string|min:6',
			]);

		if($validator->fails()){
			 return response()->json(['status' => 'error','message' => $validator->errors()->toJson()], 400);   
		}

		$user = User::create($input);
		if ($user) {
			return response()->json([
				"status" => 'success',
				"message" => "User created successfully.",
				], 200);
		}
		return response()->json([
			"status" => 'error',
			"message" => "Something Went Wrong",
			], 400);
	} 

	public function update(Request $request)
	{
		$input = $request->all();
		$validator = Validator::make($input, [
			'name' => 'required',
			'email' => 'required',
			]);

		if($validator->fails()){
			 return response()->json(['status' => 'error', 'message' => $validator->errors()->toJson()], 400);      
		}

		$update = User::whereId($input['id'])->update($request->except('id'));

		if ($update) {
			return response()->json([
				"status" => 'success',
				"message" => "User updated successfully."
				], 200);
		}

		return response()->json([
				"status" => 'error',
				"message" => "User Not Found"
				], 500);
	}

	public function delete($id)
	{
		$user = User::find($id);

        if(is_null($user)){
            return response()->json([
                'status' => 'error',
                'message'  => "Record with id # " .$id." not found",
            ], 404);
        }

        $user->delete();

        return response()->json([
            'status' => 'success',
            'message'  => "User record successfully deleted id # ". $id,
        ], 200);
	}
}
