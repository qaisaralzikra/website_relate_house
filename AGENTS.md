# AGENTS.md — api-relate-organizer

## Stack
- Laravel 13 + Inertia.js 3 + React 19 (SPA, no Blade pages except `sitemap.xml`)
- Tailwind CSS v4 (`@import 'tailwindcss'`, no `tailwind.config.js`), Vite 8
- PHP 8.3+, SQLite (local `.env.example` default) / MySQL (intended prod)
- Database-driven session, queue, cache (defaults in config/*.php)
- `.npmrc` has `ignore-scripts=true` — `npm install --ignore-scripts` is implicit
- Laravel 13 uses `bootstrap/app.php` for middleware registration (no `Http/Kernel.php`)

## Architecture quirks
- **Admin auth IS enforced**: routes use `middleware('auth')` (standard web guard). `AdminAuth` middleware exists with `admin.auth` alias but is unused in routes — both do the same check. `AuthContext.jsx` in React is an empty provider (does nothing client-side).
- **`composer setup` does NOT seed the admin user**: `migrate --force` runs but `db:seed` is not in the setup script. Admin login (`Auth::attempt` with `ADMIN_NAME`/`ADMIN_PASSWORD` from `.env`) will fail until `php artisan db:seed --class=AdminUserSeeder` is run.
- **Two data paths coexist**: Public site reads Inertia props from `HomeController` (server DB). `DataContext` (`resources/js/context/DataContext.jsx`) stores defaults in localStorage but is **unused** by admin and the public `Home` page — DB props win.
- **Admin edits DO persist**: `AdminSectionController::update` writes to DB using `updateOrCreate`/`truncate`+`insert` per section. `Dashboard.jsx` receives real `visitorStats` from the `Visitor` model.
- **13 routes** in `routes/web.php` — no API routes. GETs for `/`, `/login`, `/admin`, `/sitemap.xml`, `/detail/service/{id}`, `/detail/portfolio/{id}`. POSTs for `/login`, `/logout`, `/cta/send-email`, `/admin/section/{section}`, `/admin/gallery/store`, `/admin/gallery/update/{id}`, `/admin/gallery/delete/{id}`.
- **5 real controllers** (`HomeController`, `AdminController`, `AdminSectionController`, `CtaSectionController`, `SitemapController`) — 13 resource controller stubs exist with no routes wired.
- **Model naming is inconsistent**: lowercase (`project`, `categori`, `footer`, `statistik`, `partner`, `workflow`, `testimoni`, `chooseUs`), PascalCase (`Banom`, `Galery`, `GalleryImage`, `CtaSection`, `HeroSection`, `AboutSection`, `ServiceSection`), plus standard `User` and `Visitor`. Check the actual class name before importing.
- **`chooseUs` model requires `$table`**: The class name `chooseUs` resolves to table `choose_uses` via Laravel convention, but the migration creates `choose_us`. The model has `protected $table = 'choose_us'` — if this is ever removed, queries will fail with "table not found."
- **`CtaSection::find(1)` returns null** after admin saves CTA buttons (because `AdminSectionController::saveCta` uses `truncate` + `insert`, resetting IDs). The `HomeController` handles this with null coalescing (`$cta->from_color ?? null`), so it degrades gracefully.
- **Visitor tracking**: `TrackVisitor` middleware is registered as global web middleware in `bootstrap/app.php`. Logs unique IPs (once per hour) to `visitors` table; skips admin, login, sitemap, and `/up` paths.
- **2 tests exist** (1 Feature hitting `/`, 1 Unit asserting true) — both Laravel defaults.
- **MySQL dump** at `database/relate_organizer.sql` for production DB reference.

## Developer commands
| Command | What it does |
|---|---|
| `composer setup` | Full project setup (composer install, copy `.env`, `key:generate`, `migrate`, `npm install --ignore-scripts`, `npm run build`) |
| `composer dev` | Runs 4 parallel processes via `concurrently`: `php artisan serve`, `queue:listen`, `pail` (logs), `vite` |
| `composer test` | `php artisan config:clear` then `php artisan test` |
| `php artisan test` | Run PHPUnit (Feature + Unit suites) on SQLite `:memory:` |
| `php artisan test tests/Feature/ExampleTest.php` | Run a single test |
| `php artisan db:seed --class=AdminUserSeeder` | Create the admin user from `ADMIN_NAME`/`ADMIN_PASSWORD` env vars |
| `npm run build` | Vite production build |
| `npm run dev` | Vite dev server only |
| `node optimize-images.mjs` | Optimize PNG/JPG in `public/assets/` via sharp |
| `./vendor/bin/pint` | Laravel Pint (StyleCI uses `laravel` preset) |

## Testing
- `phpunit.xml` uses SQLite `:memory:` — no external DB, no migrate needed.
- CI in `.github/workflows/tests.yml`: `cp .env.example .env`, `php artisan key:generate`, `php artisan test` on PHP 8.3/8.4/8.5 with `pdo_sqlite`.
- No JS tests exist.

## Tooling
- `.env` is gitignored; copy from `.env.example`, run `php artisan key:generate`.
- Static images used by React components live in `public/assets/` (imported in `resources/js/data/defaults.js`).
- Charting: `recharts` available for React chart components.
- Admin component helpers in `resources/js/Pages/admin/components/`: `GradientPicker`, `ImageInput`, `ListEditor`.
- Custom hooks in `resources/js/hooks/`: `useCountUp`, `useOnScreen`.
