<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Auth\Access\AuthorizationException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Http\JsonResponse;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Render an exception into an HTTP response.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Throwable $exception
     * @return \Symfony\Component\HttpFoundation\Response|\Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        // Handle AuthorizationException
        if ($exception instanceof AuthorizationException) {
            return response()->json(['error' => 'Not authorized to perform this action'], 403);
        }

        // Handle JWTException
        if ($exception instanceof JWTException) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if ($exception instanceof ModelNotFoundException) {
            return response()->json([
                'error' => 'Entry for '.str_replace('App', '', $exception->getModel()).' not found'], 404);
        }
    
        return parent::render($request, $exception);

        // Handle other exceptions
        if ($exception instanceof HttpException) {
            return $this->renderHttpException($exception);
        } else {
            return parent::render($request, $exception);
        }
    }

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
