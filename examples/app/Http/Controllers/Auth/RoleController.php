<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class RoleController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of roles from current logged user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke()
    {
        return auth()->user()->getRoleNames();
    }
}
