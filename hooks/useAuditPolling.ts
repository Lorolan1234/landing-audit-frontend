"use client";

import { useState, useEffect, useCallback } from "react";
import { pollAuditStatus, getAudit } from "@/lib/api";
import type { AuditStatusResponse, AuditFullResponse } from "@/types/audit";

interface UseAuditPollingResult {
  status: AuditStatusResponse | null;
  fullResult: AuditFullResponse | null;
  isPolling: boolean;
  error: string | null;
}

/**
 * Хук для polling статуса аудита.
 * При завершении загружает полный результат.
 */
export function useAuditPolling(auditId: string | null): UseAuditPollingResult {
  const [status, setStatus] = useState<AuditStatusResponse | null>(null);
  const [fullResult, setFullResult] = useState<AuditFullResponse | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startPolling = useCallback(async (id: string) => {
    setIsPolling(true);
    setError(null);

    try {
      const finalStatus = await pollAuditStatus(
        id,
        (s) => setStatus(s),
        3000,
        150,
      );

      setStatus(finalStatus);

      if (finalStatus.status === "completed") {
        const full = await getAudit(id);
        setFullResult(full);
      } else if (finalStatus.status === "failed") {
        setError(finalStatus.error_message ?? "Ошибка анализа");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Неизвестная ошибка");
    } finally {
      setIsPolling(false);
    }
  }, []);

  useEffect(() => {
    if (!auditId) return;
    startPolling(auditId);
  }, [auditId, startPolling]);

  return { status, fullResult, isPolling, error };
}
