<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\DataTableService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function __construct(private DataTableService $dataTableService)
    {
        $this->middleware('auth:api');
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get the ID of the currently authenticated user
        $currentUser = Auth::user();
        
        // Build the query excluding the current user
        $users = User::where('id', '!=', $currentUser->id)
                    ->select('id', 'fullname', 'username', 'email', 'phone', 'gender', 'birthday', 'address', 'photo_profile as photo', 'created_at as registered_at', 'roles.name as direct_role_name')
                    ->with('roles')
                    ->get();
        foreach ($users as $user) {
            $user->age = isset($user->birthday) ? calculateAge($user->birthday) : null;
        }

        return response()->json($users, 200);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function list(Request $request)
    {
        // Get the ID of the currently authenticated user
        $currentUser = Auth::user();

        // Build the query excluding the current user
        $query = User::where('email', '<>', $currentUser->email)
            ->with('roles');
        // Use the DataTableService or any other logic as needed
        $response = $this->dataTableService->getJsonResponse($query, $request);
        
        return response()->json($response, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    { }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'gender' => 'required',
            'roleId' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'fullname' => $request->fullname,
            'username' => explode('@', $request->email)[0],
            'email' => $request->email,
            'gender' => $request->gender,
            'password' => Hash::make('random123'),
        ]);
        
        $user->roles()->attach($request->roleId);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    { }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    { 
        $user = User::where('id', $id)->with('roles')->first();

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'gender' => 'required',
            'roleId' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $user = User::update([
            'fullname' => $request->fullname,
            'username' => $request->username,
            'email' => $request->email,
            'gender' => $request->gender
        ]);
        
        $user->roles()->sync([$request->roleId]);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        try 
        {
            // User::whereIn('id', $request->id)->delete(); // $request->id MUST be an array
            User::findOrFail($request->id)->delete();
            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully'
            ]);
        }

        catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
}
