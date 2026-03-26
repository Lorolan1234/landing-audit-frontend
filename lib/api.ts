/**
 * API-клиент для взаимодействия с FastAPI бэкендом.
 * Все запросы идут через /api/v1/ (Next.js rewrites → бэкенд).
 */
import axios, { AxiosError } from "axios";
import type { AuditFullResponse, AuditListItem, AuditStatusResponse } from "@/types/audit";

const BASE_URL = "/api/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});

// Унифицированная обработка ошибок
export class ApiError extends Error {
  constructor(
    public status: number,
    public detail: string,
  ) {
    super(detail);
    this.name = "ApiError";
  }
}

function handleAxiosError(error: unknown): never {
  if (error instanceof AxiosError && error.response) {
    const detail =
      (error.response.data as { detail?: string })?.detail ??
      error.message;
    throw new ApiError(error.response.status, detail);
  }
  throw error;
}

// ── Аудиты ─────────────────────────────────────────────────────────

/** Создаёт новый аудит. Возвращает ID для дальнейшего polling. */
export async function createAudit(url: string): Promise<AuditStatusResponse> {
  try {
    const { data } = await apiClient.post<AuditStatusResponse>("/audit", { url });
    return data;
  } catch (e) {
    handleAxiosError(e);
  }
}

/** Получает полный результат аудита по ID. */
export async function getAudit(id: string): Promise<AuditFullResponse> {
  try {
    const { data } = await apiClient.get<AuditFullResponse>(`/audit/${id}`);
    return data;
  } catch (e) {
    handleAxiosError(e);
  }
}

/** Получает краткий статус аудита (для polling). */
export async function getAuditStatus(id: string): Promise<AuditStatusResponse> {
  try {
    const { data } = await apiClient.get<AuditStatusResponse>(`/audit/${id}/status`);
    return data;
  } catch (e) {
    handleAxiosError(e);
  }
}

/** Возвращает список аудитов. */
export async function listAudits(params?: {
  limit?: number;
  offset?: number;
}): Promise<AuditListItem[]> {
  try {
    const { data } = await apiClient.get<AuditListItem[]>("/audits", { params });
    return data;
  } catch (e) {
    handleAxiosError(e);
  }
}

// ── Polling helper ──────────────────────────────────────────────────

/**
 * Polling статуса аудита каждые `intervalMs` мс.
 * Останавливается при completed/failed или по достижении maxAttempts.
 */
export async function pollAuditStatus(
  id: string,
  onUpdate: (status: AuditStatusResponse) => void,
  intervalMs = 3000,
  maxAttempts = 80,
): Promise<AuditStatusResponse> {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const poll = async () => {
      try {
        attempts++;
        const status = await getAuditStatus(id);
        onUpdate(status);

        if (status.status === "completed" || status.status === "failed") {
          resolve(status);
          return;
        }

        if (attempts >= maxAttempts) {
          reject(new Error("Превышено время ожидания результата аудита"));
          return;
        }

        setTimeout(poll, intervalMs);
      } catch (e) {
        reject(e);
      }
    };

    poll();
  });
}
