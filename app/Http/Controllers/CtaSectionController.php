<?php

namespace App\Http\Controllers;

use App\Mail\BookingConfirmation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CtaSectionController extends Controller
{
    public function sendEmail(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
        ]);

        Mail::to($data['email'])->send(new BookingConfirmation($data['email']));

        return response()->json(['message' => 'Email sent successfully']);
    }
}
