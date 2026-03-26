"use client";

import {
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { AIAnalysisResult, ScoredCategory } from "@/types/audit";

interface RadarChartProps {
  aiResult: AIAnalysisResult;
}

const LABELS: Record<string, string> = {
  first_screen: "1й экран",
  offer_clarity: "Оффер",
  cta_analysis: "CTA",
  trust_elements: "Доверие",
  content_quality: "Контент",
  mobile_friendliness: "Mobile",
  page_speed_assessment: "Скорость",
  conversion_funnel: "Воронка",
  traffic_leaks: "Утечки",
  analytics_tracking: "Аналитика",
};

export function RadarChart({ aiResult }: RadarChartProps) {
  const data = Object.entries(LABELS).map(([key, name]) => ({
    subject: name,
    score:
      (aiResult[key as ScoredCategory] as { score: number } | undefined)
        ?.score ?? 0,
    fullMark: 10,
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar
          data={data}
          cx="50%"
          cy="50%"
          outerRadius="65%"
        >
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 10, fill: "#6b7280" }}
            tickLine={false}
          />
          <Radar
            name="Оценка"
            dataKey="score"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.18}
            strokeWidth={2}
            dot={{ r: 3, fill: "#3b82f6" }}
          />
          <Tooltip
            formatter={(value: number) => [`${value}/10`, "Оценка"]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
            }}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
