<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#3B7303">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    {{-- <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' https://cdn.jsdelivr.net; img-src 'self' data:; connect-src 'self'"> --}}
    {{-- <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' https://cdn.jsdelivr.net; img-src 'self' data:; connect-src 'self' http://localhost:5173 ws://localhost:5173"> --}}
    {{-- <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.ngrok-free.dev; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' https://cdn.jsdelivr.net; img-src 'self' data:; connect-src 'self' https://*.ngrok-free.dev wss://*.ngrok-free.dev"> --}}
    <link rel="shortcut icon" href="{{ asset('assets/RelateColor.png') }}" type="image/x-icon">
    <link rel="canonical" href="{{ url()->current() }}">
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link rel="preload" href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css"></noscript>

    <script type="application/ld+json">
    {
        "@@context": "https://schema.org",
        "@@type": "Organization",
        "name": "Relate House",
        "url": "{{ url('/') }}",
        "logo": "{{ asset('assets/Logo Relate5.png') }}",
        "contactPoint": {
            "@@type": "ContactPoint",
            "telephone": "+62-xxx-xxxx-xxxx",
            "contactType": "customer service"
        }
    }
    </script>

    <title>Relate House</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>

<body>
    {{-- <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
        Langsung ke konten utama
    </a> --}}

    @inertia
</body>

</html>

</html>
