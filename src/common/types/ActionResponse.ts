export type ActionResponse<T> =
  | {
      result: "success";
      ok: true;
      data: T;
    }
  | {
      result: "error";
      ok: false;
      code: number;
      message: string;
    };

export const ActionResponseSuccess = <T = undefined>(
  data?: T
): ActionResponse<T> => ({
  result: "success",
  ok: true,
  data: data as T,
});

export const ActionResponseError = <T = undefined>(
  message: Error | string | unknown,
  code: number = 500
): ActionResponse<T> => ({
  result: "error",
  ok: false,
  code: code ?? 500,
  message: message instanceof Error ? message.message : String(message),
});
