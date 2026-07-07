<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#3B7303">

    <!-- Meta Tag SEO Dasar -->
    <meta name="description"
        content="Relate House adalah Event Organizer (EO) profesional di Makassar. Kami melayani perencanaan Wedding, Corporate Event, Gathering, dan Creative Brand Activation.">
    <meta name="keywords"
        content="event organizer makassar, eo makassar, wedding organizer makassar, corporate event makassar, relate house">
    <meta name="robots" content="index, follow">

    <!-- Open Graph / Facebook (Agar saat link dibagikan ke WA/FB muncul gambar & deskripsi keren) -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="Relate House - Event Organizer Profesional di Makassar">
    <meta property="og:description"
        content="Wujudkan event impian Anda bersama Relate House. EO berpengalaman untuk korporat, pernikahan, dan pameran di Makassar.">
    <meta property="og:image" content="{{ asset('assets/Logo Relate5.png') }}">

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{{ url()->current() }}">
    <meta name="twitter:title" content="Relate House - Event Organizer Profesional di Makassar">
    <meta name="twitter:description"
        content="Wujudkan event impian Anda bersama Relate House. EO berpengalaman untuk korporat, pernikahan, dan pameran di Makassar.">
    <meta name="twitter:image" content="{{ asset('assets/Logo Relate5.png') }}">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    {{-- <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' https://cdn.jsdelivr.net; img-src 'self' data:; connect-src 'self'"> --}}
    {{-- <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' https://cdn.jsdelivr.net; img-src 'self' data:; connect-src 'self' http://localhost:5173 ws://localhost:5173"> --}}
    {{-- <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.ngrok-free.dev; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' https://cdn.jsdelivr.net; img-src 'self' data:; connect-src 'self' https://*.ngrok-free.dev wss://*.ngrok-free.dev"> --}}
    <link rel="shortcut icon" href="{{ asset('assets/RelateColor.png') }}" type="image/x-icon">
    <link rel="canonical" href="{{ url()->current() }}">
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link rel="preload" href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">
    <noscript>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css">
    </noscript>

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "image": "{{ asset('assets/Logo Relate5.png') }}",
        "name": "Relate House",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Makassar",
            "addressRegion": "Sulawesi Selatan",
            "addressCountry": "ID"
        },
        "url": "{{ url('/') }}",
        "logo": "{{ asset('assets/Logo Relate5.png') }}",
        "telephone": "+6282192404308",
        "priceRange": "$$",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+62-821-9240-4308",
            "contactType": "customer service"
        }
    }
    </script>

    <title>Relate House - Event Organizer & Wedding Organizer Makassar</title>
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