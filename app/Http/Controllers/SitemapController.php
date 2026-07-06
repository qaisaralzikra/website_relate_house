<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SitemapController extends Controller
{
    public function index()
    {
        $url = url('/');

        return response()->view('sitemap', [
            'url' => $url,
        ])->header('Content-Type', 'text/xml');
    }
}
