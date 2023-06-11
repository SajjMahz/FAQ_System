<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;

class QuestionController extends Controller
{
    public function index()
    {
        try {
            $questions = Question::orderBy('id', 'DESC')->get(['id', 'questions', 'created_by']);
            return response()->json([
                'status' => 1,
                'data' => $questions
            ]);
        } catch (Throwable $th) {
            return $th;
        }
    }

    public function store(Request $request)
    {
        try {
            $question = new Question();
            $question->questions = $request->get('questions');
            $question->created_by = Auth::id();
            $question->save();
            return response()->json([
                'status' => 1,
                'message' => 'Question created successfully.'
            ]);
        } catch (Throwable $th) {
            return $th;
        }
    }

    public function show($id)
    {
        try {
            $question = Question::where('id', $id)->get(['id', 'questions', 'vote', 'created_by']);
            $vote = Vote::where([
                ['qid', $id],
                ['user_id', Auth::id()],
            ])->get()->first();
            return response()->json([
                'status' => 1,
                'data' => $question,
                'vote_status' => $vote->vote_type
            ]);
        } catch (Throwable $th) {
            return $th;
        }
    }

    public function vote(Request $request, $id) {
        try {
            $question = Question::find($id);
            $vote_param = $request->get('vote');

            $q_vote = Vote::where([
                ['qid', $id],
                ['user_id', Auth::id()],
            ])->get()->first();

            if($q_vote == null) {
                $this->saveVote($vote_param, $question);
            } else {
                $this->updateVote($vote_param, $question, $q_vote);
            }

            return response()->json([
                'message' => $vote_param == "U" ? 'Upvoted' : 'Downvoted'
            ]);
        } catch (Throwable $th) {
            return $th;
        }
    }

    public function saveVote($vote_type, Question $question) {
        if($vote_type == 'U') {
            $question->vote = $question->vote + 1;
            $vote = new Vote();
            $vote->vote_type = $vote_type;
            $vote->qid = $question->id;
            $vote->user_id = Auth::id();
            $vote->save();
        } elseif ($vote_type == 'D') {
            $question->vote = $question->vote - 1;
            $vote = new Vote();
            $vote->vote_type = $vote_type;
            $vote->qid = $question->id;
            $vote->user_id = Auth::id();
            $vote->save();
        }
        $question->save();
    }

    public function updateVote($vote_type, Question $question,Vote $q_vote) {
        if($vote_type == 'U') {
            if($q_vote->vote_type == 'D') {
                $question->vote = $question->vote + 2;
                $q_vote->vote_type = 'U';
            } elseif ($q_vote->vote_type == 'U') {
                $question->vote = $question->vote - 1;
                $q_vote->vote_type = 'N';
            } else {
                $question->vote = $question->vote + 1;
                $q_vote->vote_type = 'U';
            }
        } elseif ($vote_type == 'D') {
            if($q_vote->vote_type == 'U') {
                $question->vote = $question->vote -2;
                $q_vote->vote_type = 'D';
            } elseif ($q_vote->vote_type == 'D') {
                $question->vote = $question->vote + 1;
                $q_vote->vote_type = 'N';
            } else {
                $question->vote = $question->vote - 1;
                $q_vote->vote_type = 'D';
            }
        }
        $q_vote->save();
        $question->save();
    }
}
