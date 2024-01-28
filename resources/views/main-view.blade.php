@php
    $config = [
        'appName' => config('app.name'),
        'locale' => $locale = app()->getLocale(),
        'locales' => config('app.locales'),
    ];
@endphp
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title><?php echo $config['appName'] ?></title>
    <script>
        window.config = @json($config);
    </script>

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/css/animate.css', 'resources/js/main.js'])
</head>
    <body id="app">
        <router-view></router-view>
    </body>
</html>
