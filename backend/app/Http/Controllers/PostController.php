<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller implements HasMiddleware
{
    // Implements middleware in every function except index() and show()
    public static function middleware()
    {
        return [new Middleware('auth:sanctum', except:['index', 'show'])];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $post = Post::with('user')->latest()->get();
        return response()->json($post, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'content' => 'required|max:100',
        ]);
        $post = $request->user()->posts()->create($fields);
        return response()->json($post, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $user = User::findOrFail($post->user_id);
        return response()->json([
            'id' => $post->id,
            'user_id' => $post->user_id,
            'content' => $post->content,
            'created_at' => $post->created_at,
            'name' => $user->name
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {   
        // check if the user own this post
        Gate::authorize('modify', $post);

        $fields = $request->validate([
            'content' => 'required|max:100',
        ]);
        $post->update($fields);
        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        // check if the user own this post
        Gate::authorize('modify', $post);
        $post->delete();
        return ['message' => 'The post successfully deleted'];
    }
}
