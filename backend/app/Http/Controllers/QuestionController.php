<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $questions = Question::orderBy('id', 'DESC')->get(['id', 'questions', 'created_by']);
            return response()->json([
                'status' => 1,
                'data' => $questions
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
            $question = new Question();
            $question->questions = $request->get('questions');
            $question->created_by = $request->get('created_by');
            $question->save();
            return response()->json([
                'status' => 1,
                'message' => 'Question created successfully.'
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
            $question = Question::where('id', $id)->get(['id', 'questions', 'vote', 'vote_type', 'created_by']);
            return response()->json([
                'status' => 1,
                'data' => $question
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function vote(Request $request, $id) {
        try {
            $question = Question::find($id);
            $vote_param = $request->get('vote');
            $vote = $question->vote;

            if($vote_param == "U") {
                if($question->vote_type == "U") {
                    $question->vote = $vote - 1;
                    $question->vote_type = "N";      
                } else if($question->vote_type == "D") {
                    $question->vote = $vote + 2;
                    $question->vote_type = "U";
                } else {
                    $question->vote = $vote + 1;
                    $question->vote_type = "U";
                }
            } else if($vote_param == "D") {
                if($question->vote_type == "D") {
                    $question->vote = $vote + 1;
                    $question->vote_type = "N";
                } else if($question->vote_type == "U") {
                    $question->vote = $vote - 2;
                    $question->vote_type = "D";
                } else {
                    $question->vote = $vote - 1;
                    $question->vote_type = "D";
                }
            }

            $question->save();
            return response()->json([
                'message' => $vote_param == "U" ? 'Upvoted' : 'Downvoted'
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        //
    }
}
