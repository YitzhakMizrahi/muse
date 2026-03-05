import { NextResponse } from "next/server";

export type ApiSuccess<T> = {
  ok: true;
  result: T;
};

export type ApiError = {
  ok: false;
  error: {
    code: string;
    message: string;
  };
};

export function apiSuccess<T>(result: T, init?: ResponseInit) {
  return NextResponse.json<ApiSuccess<T>>({ ok: true, result }, init);
}

export function apiError(
  code: string,
  message: string,
  init?: ResponseInit,
) {
  return NextResponse.json<ApiError>(
    {
      ok: false,
      error: {
        code,
        message,
      },
    },
    init,
  );
}
