// Type definitions for the YouTube to Infographic Blog Generator

export interface BlogContent {
    title: string;
    metaTitle: string;
    metaDescription: string;
    heroImage: string;
    sections: Section[];
    metrics: Metric[];
    quotes: Quote[];
    faqs: FAQ[];
    timeline: TimelineEvent[];
    cta: CallToAction;
    videoUrl: string;
    videoId: string;
}

export interface Section {
    id: string;
    heading: string;
    level: 1 | 2 | 3;
    content: string;
    icon?: string;
}

export interface Metric {
    label: string;
    value: string;
    description: string;
    icon?: string;
}

export interface Quote {
    text: string;
    author?: string;
    role?: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface TimelineEvent {
    title: string;
    description: string;
    phase: string;
}

export interface CallToAction {
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

export interface TranscriptResponse {
    transcript: string;
    timestamps?: Array<{ time: string; text: string }>;
}

export interface GenerationStatus {
    stage: 'idle' | 'extracting' | 'analyzing' | 'structuring' | 'generating' | 'complete' | 'error';
    message: string;
    progress: number; // 0-100
}

// Supported Gemini models (as of December 27, 2025)
export type SupportedModel =
    | 'gemini-3-flash-preview'
    | 'gemini-3-pro-preview'
    | 'gemini-2.5-pro'
    | 'gemini-2.5-flash'
    | 'gemini-2.5-flash-lite'
    | 'gemini-1.5-pro';

export interface ModelInfo {
    id: SupportedModel;
    name: string;
    description: string;
    capabilities: string[];
    speed: 'Very Fast' | 'Fast' | 'Medium' | 'Slow';
    quality: 'Excellent' | 'Very Good' | 'Good' | 'Basic';
    recommended?: boolean;
}

export const AVAILABLE_MODELS: ModelInfo[] = [
    {
        id: 'gemini-3-flash-preview',
        name: 'Gemini 3 Flash (Preview)',
        description: 'Latest fast model - significantly smarter than 2.5 Flash, released Dec 2025',
        capabilities: ['YouTube URL processing', 'Low latency', 'Latest intelligence'],
        speed: 'Very Fast',
        quality: 'Excellent',
        recommended: true,
    },
    {
        id: 'gemini-3-pro-preview',
        name: 'Gemini 3 Pro (Preview)',
        description: 'New SOTA model for complex reasoning, released Nov 2025',
        capabilities: ['YouTube URL processing', 'Complex reasoning', 'Highest capability'],
        speed: 'Medium',
        quality: 'Excellent',
    },
    {
        id: 'gemini-2.5-pro',
        name: 'Gemini 2.5 Pro (Stable)',
        description: 'Stable general intelligence model, reliable for production',
        capabilities: ['YouTube URL processing', 'Advanced reasoning', 'Production-ready'],
        speed: 'Medium',
        quality: 'Excellent',
    },
    {
        id: 'gemini-2.5-flash',
        name: 'Gemini 2.5 Flash (Stable)',
        description: 'Production standard for low-latency applications',
        capabilities: ['YouTube URL processing', 'Fast processing', 'Stable'],
        speed: 'Fast',
        quality: 'Very Good',
    },
    {
        id: 'gemini-2.5-flash-lite',
        name: 'Gemini 2.5 Flash Lite',
        description: 'Ultra-low cost, extremely fast for simple tasks',
        capabilities: ['Basic processing', 'Cost effective', 'Very fast'],
        speed: 'Very Fast',
        quality: 'Good',
    },
    {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro (Legacy)',
        description: 'Older model, maintained for compatibility',
        capabilities: ['YouTube URL processing', 'Stable', 'Legacy support'],
        speed: 'Medium',
        quality: 'Very Good',
    },
];


