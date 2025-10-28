<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::query()->select(['id','name','email','status','created_at'])->get()->map(function($u){
            return [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'status' => $u->status ?? 'active',
                'createdAt' => $u->created_at?->toDateString(),
            ];
        });
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string','max:255'],
            'email' => ['required','email','max:255','unique:users,email'],
            'password' => ['required','string','min:6'],
            'status' => ['nullable', Rule::in(['active','blocked'])],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'status' => $data['status'] ?? 'active',
        ]);

        return response()->json(['id' => $user->id], 201);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => ['sometimes','required','string','max:255'],
            'email' => ['sometimes','required','email','max:255', Rule::unique('users','email')->ignore($user->id)],
            'password' => ['nullable','string','min:6'],
            'status' => ['nullable', Rule::in(['active','blocked'])],
        ]);

        $payload = [
            'name' => $data['name'] ?? $user->name,
            'email' => $data['email'] ?? $user->email,
        ];
        if (!empty($data['password'])) {
            $payload['password'] = $data['password'];
        }
        if (!empty($data['status'])) {
            $payload['status'] = $data['status'];
        }
        $user->fill($payload)->save();

        return response()->json(['message' => 'updated']);
    }

    public function updateStatus(Request $request, User $user)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['active','blocked'])],
        ]);
        $user->status = $data['status'];
        $user->save();
        return response()->json(['message' => 'status updated']);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->noContent();
    }
}


