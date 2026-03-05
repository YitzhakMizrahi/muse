type LogLevel = "info" | "error";

type LogPayload = {
  event: string;
  [key: string]: unknown;
};

export function log(level: LogLevel, payload: LogPayload) {
  const message = JSON.stringify(payload);

  if (level === "error") {
    console.error(message);
    return;
  }

  console.info(message);
}
