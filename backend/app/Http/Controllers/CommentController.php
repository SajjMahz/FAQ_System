<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $comments = Comment::get(['id', 'comment', 'created_by']);
            return response()->json([
                'status' => 1,
                'data' => $comments
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $comment = new Comment();
            $comment->question_id = $request->get('question_id');
            $comment->comment = $request->get('comment');
            $comment->created_by = $request->get('created_by');
            $comment->save();
            return response()->json([
                'status' => 1,
                'message' => 'Comment added'
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $comment = Comment::where('question_id', $id)->get(['id', 'comment', 'created_by']);
            return response()->json([
                'status' => 1,
                'data' => $comment
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
