<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class PermissionController extends Controller
{
    /**
     * Display a listing of permissions from current logged user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke()
    {
        return auth()->user()->getAllPermissions()->pluck('name');
    }
}
