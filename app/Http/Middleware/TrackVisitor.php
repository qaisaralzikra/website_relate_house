<?php

namespace App\Http\Middleware;

use App\Models\Visitor;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisitor
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (!$this->shouldTrack($request)) {
            return $response;
        }

        $ip = $request->ip();

        $recent = Visitor::where('ip_address', $ip)
            ->where('visited_at', '>=', now()->subHour())
            ->exists();

        if (!$recent) {
            Visitor::create([
                'ip_address' => $ip,
                'user_agent' => $request->userAgent(),
                'page_url' => $request->path(),
                'visited_at' => now(),
            ]);
        }

        return $response;
    }

    private function shouldTrack(Request $request): bool
    {
        $path = $request->path();

        if (str_starts_with($path, 'admin')) return false;
        if ($path === 'login') return false;
        if ($path === 'sitemap.xml') return false;
        if ($path === 'up') return false;

        return true;
    }
}
