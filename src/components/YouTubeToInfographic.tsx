'use client';

import React, { useState, useEffect } from 'react';
import { GeminiService } from '@/services/gemini-service';
import { BlogContent, GenerationStatus, SupportedModel, AVAILABLE_MODELS } from '@/types/types';
import InfographicPreview from '@/components/InfographicPreview';
import HTMLExporter from '@/components/HTMLExporter';

export default function YouTubeToInfographic() {
    const [apiKey, setApiKey] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [showApiKey, setShowApiKey] = useState(false);
    const [selectedModel, setSelectedModel] = useState<SupportedModel>('gemini-3-flash-preview');
    const [status, setStatus] = useState<GenerationStatus>({
        stage: 'idle',
        message: '',
        progress: 0,
    });
    const [blogContent, setBlogContent] = useState<BlogContent | null>(null);
    const [error, setError] = useState('');

    // Load saved model selection from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('selectedModel');
        if (saved && AVAILABLE_MODELS.find(m => m.id === saved)) {
            setSelectedModel(saved as SupportedModel);
        }
    }, []);

    // Save model selection to localStorage
    useEffect(() => {
        localStorage.setItem('selectedModel', selectedModel);
    }, [selectedModel]);

    const isValidYouTubeUrl = (url: string): boolean => {
        const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
        return pattern.test(url);
    };

    const handleGenerate = async () => {
        // Validation
        if (!apiKey.trim()) {
            setError('Please enter your Gemini API key');
            return;
        }

        if (!youtubeUrl.trim()) {
            setError('Please enter a YouTube URL');
            return;
        }

        if (!isValidYouTubeUrl(youtubeUrl)) {
            setError('Please enter a valid YouTube URL');
            return;
        }

        setError('');
        setBlogContent(null);

        try {
            const service = new GeminiService(apiKey, selectedModel);

            // Stage 1: Extracting transcript
            setStatus({
                stage: 'extracting',
                message: 'Extracting transcript from YouTube video...',
                progress: 20,
            });

            // Stage 2: Analyzing content
            setTimeout(() => {
                setStatus({
                    stage: 'analyzing',
                    message: 'Analyzing video content and identifying key insights...',
                    progress: 40,
                });
            }, 2000);

            // Stage 3: Structuring
            setTimeout(() => {
                setStatus({
                    stage: 'structuring',
                    message: 'Organizing content into SEO-optimized structure...',
                    progress: 60,
                });
            }, 4000);

            // Stage 4: Generating
            setTimeout(() => {
                setStatus({
                    stage: 'generating',
                    message: 'Generating infographic blog layout...',
                    progress: 80,
                });
            }, 6000);

            const content = await service.processYouTubeVideo(youtubeUrl, (stage, progress) => {
                setStatus({
                    stage: stage as any,
                    message: getStageMessage(stage),
                    progress,
                });
            });

            setBlogContent(content);
            setStatus({
                stage: 'complete',
                message: 'Blog generated successfully!',
                progress: 100,
            });
        } catch (err: any) {
            console.error('Generation error:', err);
            setError(err.message || 'Failed to generate blog. Please check your API key and YouTube URL.');
            setStatus({
                stage: 'error',
                message: 'Generation failed',
                progress: 0,
            });
        }
    };

    const getStageMessage = (stage: string): string => {
        switch (stage) {
            case 'extracting':
                return 'Extracting transcript from YouTube video...';
            case 'analyzing':
                return 'Analyzing video content...';
            case 'structuring':
                return 'Structuring content...';
            case 'generating':
                return 'Generating blog layout...';
            case 'complete':
                return 'Blog generated successfully!';
            default:
                return '';
        }
    };

    return (
        <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
            <div className="container">
                {/* Header */}
                <div className="text-center mb-5">
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
                        YouTube → Infographic Blog Generator
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto' }}>
                        Transform any YouTube video into a stunning, SEO-optimized infographic blog post
                        using Gemini 2.5/3 AI models with advanced multimodal capabilities
                    </p>
                </div>

                {/* Input Section */}
                <div className="card" style={{ maxWidth: '700px', margin: '0 auto 3rem' }}>
                    <div className="input-group">
                        <label className="input-label">Gemini API Key</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showApiKey ? 'text' : 'password'}
                                className="input-field"
                                placeholder="Enter your Gemini API key"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                style={{ paddingRight: '3.5rem' }}
                            />
                            <button
                                onClick={() => setShowApiKey(!showApiKey)}
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    fontSize: '1.25rem',
                                }}
                            >
                                {showApiKey ? '🙈' : '👁️'}
                            </button>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>
                            Get your API key from{' '}
                            <a
                                href="https://makersuite.google.com/app/apikey"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--primary-500)', textDecoration: 'underline' }}
                            >
                                Google AI Studio
                            </a>
                        </p>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Gemini Model</label>
                        <select
                            className="input-field"
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value as SupportedModel)}
                            style={{ cursor: 'pointer' }}
                        >
                            {AVAILABLE_MODELS.map((model) => (
                                <option key={model.id} value={model.id}>
                                    {model.name} {model.recommended ? '⭐' : ''} - {model.speed}, {model.quality}
                                </option>
                            ))}
                        </select>
                        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>
                            {AVAILABLE_MODELS.find(m => m.id === selectedModel)?.description}
                        </p>
                    </div>

                    <div className="input-group">
                        <label className="input-label">YouTube Video URL</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                        />
                        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>
                            Paste any YouTube video URL - works best with business stories, case studies, and presentations
                        </p>
                    </div>

                    {error && (
                        <div
                            style={{
                                padding: '1rem',
                                background: 'rgba(245, 87, 108, 0.1)',
                                border: '1px solid rgba(245, 87, 108, 0.3)',
                                borderRadius: 'var(--radius-md)',
                                color: '#f5576c',
                                marginBottom: '1rem',
                            }}
                        >
                            ⚠️ {error}
                        </div>
                    )}

                    <button
                        onClick={handleGenerate}
                        disabled={status.stage === 'extracting' || status.stage === 'analyzing' || status.stage === 'structuring' || status.stage === 'generating'}
                        className="btn btn-primary"
                        style={{ width: '100%', fontSize: '1.125rem', padding: '1.25rem' }}
                    >
                        {status.stage === 'idle' || status.stage === 'complete' || status.stage === 'error' ? (
                            <>🚀 Generate Infographic Blog</>
                        ) : (
                            <>⏳ Generating...</>
                        )}
                    </button>

                    {/* Progress */}
                    {status.stage !== 'idle' && status.stage !== 'error' && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                                    {status.message}
                                </span>
                                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary-500)' }}>
                                    {status.progress}%
                                </span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${status.progress}%` }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Results */}
                {blogContent && (
                    <div>
                        <div className="text-center mb-4">
                            <h2 style={{ marginBottom: '1rem' }}>✨ Your Infographic Blog is Ready!</h2>
                            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                                Scroll down to preview, then export as HTML
                            </p>
                        </div>

                        {/* Preview */}
                        <div style={{ marginBottom: '2rem' }}>
                            <InfographicPreview content={blogContent} />
                        </div>

                        {/* Export */}
                        <HTMLExporter content={blogContent} />

                        {/* Technical Details */}
                        <div
                            className="card"
                            style={{
                                maxWidth: '700px',
                                margin: '3rem auto',
                                padding: '1.5rem',
                                background: 'rgba(75, 172, 254, 0.05)',
                                border: '1px solid rgba(75, 172, 254, 0.2)',
                            }}
                        >
                            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
                                🧠 Powered by {AVAILABLE_MODELS.find(m => m.id === selectedModel)?.name}
                            </h3>
                            <ul style={{ paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8' }}>
                                <li>Direct YouTube video processing (no manual transcripts needed)</li>
                                <li>Advanced multimodal AI understanding (audio + visual)</li>
                                <li>SEO-optimized content structure with proper H1/H2/H3 hierarchy</li>
                                <li>Schema-ready FAQ section for rich snippets</li>
                                <li>Self-contained HTML export (no external dependencies)</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Features */}
                {!blogContent && status.stage === 'idle' && (
                    <div style={{ marginTop: '4rem' }}>
                        <h2 className="text-center mb-4">How It Works</h2>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                gap: '2rem',
                                maxWidth: '1000px',
                                margin: '0 auto',
                            }}
                        >
                            {[
                                {
                                    icon: '🎥',
                                    title: 'Paste YouTube URL',
                                    desc: 'Enter any YouTube video link - Odoo stories, tutorials, presentations',
                                },
                                {
                                    icon: '🤖',
                                    title: 'AI Processing',
                                    desc: 'Gemini 2.5/3 models extract transcript and analyze content automatically',
                                },
                                {
                                    icon: '📊',
                                    title: 'SEO Optimization',
                                    desc: 'Structured with proper headings, meta tags, FAQs, and keywords',
                                },
                                {
                                    icon: '🎨',
                                    title: 'Infographic Design',
                                    desc: 'Beautiful, modern layout with metrics, quotes, and timeline',
                                },
                            ].map((feature, index) => (
                                <div key={index} className="card" style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{feature.title}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem' }}>
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
