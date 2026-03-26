export type AuditStatus = "pending" | "processing" | "completed" | "failed";

export interface CategoryResult {
  score: number;
  verdict: string;
  findings: string[];
  recommendations: string[];
  critical_issues: string[];
}

export interface CTAButton {
  text: string;
  assessment: string;
  rewrite?: string;
}

export interface OfferClarity extends CategoryResult {
  main_offer_detected: string;
  offer_problems?: string[];
  offer_rewrite?: string;
}

export interface FirstScreen extends CategoryResult {
  headline_quote?: string;
  headline_assessment?: string;
  headline_rewrite?: string;
}

export interface CTAAnalysis extends CategoryResult {
  cta_buttons_found: CTAButton[];
}

export interface TrustElements extends CategoryResult {
  found_elements: string[];
  missing_elements: string[];
}

export interface ContentQuality extends CategoryResult {
  weak_phrases_found?: string[];
  strong_phrases_found?: string[];
}

export interface ConversionFunnel extends CategoryResult {
  funnel_type_detected: string;
  friction_points: string[];
}

export interface TrafficLeaks extends CategoryResult {
  leaks_found: string[];
}

export interface AnalyticsTracking extends CategoryResult {
  trackers_found: string[];
  missing_recommended: string[];
}

export interface PriorityItem {
  action: string;
  expected_effect: string;
  complexity?: string;
}

export interface OverallSummary {
  strengths: string[];
  weaknesses: string[];
  top_3_priorities: (PriorityItem | string)[];
  missing_sections?: string[];
  estimated_conversion_impact: string;
  conversion_score?: number;
  main_conclusion?: string;
}

export interface PageBlockAnalysis {
  block_name: string;
  block_order: number;
  heading_quote: string;
  content_assessment: string;
  problems?: (string | { id?: string; problem: string; why_critical?: string; severity?: string })[];
  rewrite_suggestion: string;
  current_content?: { headline?: string; subtitle?: string; cta_text?: string; visual_description?: string };
  problem_items?: { id?: string; problem: string; why_critical?: string; severity?: string }[];
  recommendation_items?: { action: string; rewrite_example?: string; expected_impact?: string }[];
  recommendations?: { action: string; rewrite_example?: string; expected_impact?: string }[];
  score?: number;
}

export interface StrategicDiagnosis {
  headline: string;
  description: string;
  conversion_impact: string;
}

export interface BusinessContext {
  business_type: string;
  target_audience: string;
  core_offer: string;
  business_model: string;
  traffic_intent: string;
  product_description?: string;
  target_action?: string;
  main_offer?: string;
}

export interface MissingElementItem {
  element: string;
  why_needed?: string;
  priority?: string;
}

export interface MissingElements {
  critical?: MissingElementItem[];
  important?: MissingElementItem[];
  nice_to_have?: MissingElementItem[];
}

export interface AIAnalysisResult {
  business_context?: BusinessContext;
  strategic_diagnosis?: StrategicDiagnosis;
  block_analysis?: PageBlockAnalysis[];
  missing_elements?: MissingElements;
  page_blocks_analysis?: PageBlockAnalysis[];
  first_screen: FirstScreen;
  offer_clarity: OfferClarity;
  cta_analysis: CTAAnalysis;
  trust_elements: TrustElements;
  content_quality: ContentQuality;
  mobile_friendliness: CategoryResult;
  page_speed_assessment: CategoryResult;
  conversion_funnel: ConversionFunnel;
  traffic_leaks: TrafficLeaks;
  analytics_tracking: AnalyticsTracking;
  overall_summary: OverallSummary;
}

export interface SpeedMetrics {
  performance_score: number;
  fcp: number;
  lcp: number;
  cls: number;
  tbt: number;
  speed_index: number;
  tti: number;
}

export interface SpeedData {
  mobile: SpeedMetrics;
  desktop: SpeedMetrics;
  core_web_vitals_passed: boolean;
  speed_data_available: boolean;
  error_reason?: string;
}

export interface AuditStatusResponse {
  id: string;
  status: AuditStatus;
  url: string;
  readiness_index: number | null;
  readiness_category: string | null;
  created_at: string;
  processing_time_seconds: number | null;
  error_message: string | null;
  current_step?: string | null;
}

export interface AuditFullResponse extends AuditStatusResponse {
  critical_issues_count: number;
  has_blockers: boolean;
  ai_result: AIAnalysisResult | null;
  parsed_data: Record<string, unknown> | null;
  speed_data: SpeedData | null;
  screenshots: Record<string, unknown> | null;
}

export interface AuditListItem {
  id: string;
  url: string;
  status: AuditStatus;
  readiness_index: number | null;
  readiness_category: string | null;
  critical_issues_count: number;
  has_blockers: boolean;
  created_at: string;
}

export type ScoredCategory =
  | "first_screen"
  | "offer_clarity"
  | "cta_analysis"
  | "trust_elements"
  | "content_quality"
  | "mobile_friendliness"
  | "page_speed_assessment"
  | "conversion_funnel"
  | "traffic_leaks"
  | "analytics_tracking";

// Категории с мета-информацией для отображения
export const CATEGORY_META: Record<
  ScoredCategory,
  { title: string; weight: number; icon: string }
> = {
  first_screen:         { title: "Первый экран",        weight: 15, icon: "Monitor" },
  offer_clarity:        { title: "Ясность оффера",      weight: 15, icon: "Target" },
  cta_analysis:         { title: "Анализ CTA",          weight: 15, icon: "MousePointerClick" },
  trust_elements:       { title: "Элементы доверия",    weight: 10, icon: "ShieldCheck" },
  content_quality:      { title: "Качество контента",   weight: 8,  icon: "FileText" },
  mobile_friendliness:  { title: "Мобильная версия",    weight: 10, icon: "Smartphone" },
  page_speed_assessment:{ title: "Скорость загрузки",   weight: 10, icon: "Zap" },
  conversion_funnel:    { title: "Воронка конверсии",   weight: 7,  icon: "TrendingUp" },
  traffic_leaks:        { title: "Утечки трафика",      weight: 5,  icon: "AlertTriangle" },
  analytics_tracking:   { title: "Аналитика и трекинг", weight: 5,  icon: "BarChart2" },
};

// Категории для дополнительного анализа (не дублируют поблочный разбор)
export const MARKETING_CATEGORIES = [
  'trust_elements',
  'conversion_funnel',
  'traffic_leaks',
] as const;

export const TECHNICAL_CATEGORIES = [
  'page_speed_assessment',
  'mobile_friendliness',
  'analytics_tracking',
] as const;
