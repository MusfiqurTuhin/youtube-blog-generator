'use client';

import React from 'react';
import { BlogContent } from '@/types/types';

interface HTMLExporterProps {
    content: BlogContent;
}

export default function HTMLExporter({ content }: HTMLExporterProps) {
    const generateHTML = (): string => {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${content.metaDescription}">
    <meta property="og:title" content="${content.metaTitle}">
    <meta property="og:description" content="${content.metaDescription}">
    <meta property="og:image" content="${content.heroImage}">
    <meta property="og:type" content="article">
    <meta name="twitter:card" content="summary_large_image">
    <title>${content.metaTitle}</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <style>
        ${getInlineCSS()}
    </style>
</head>
<body>
    ${generateBodyHTML()}
    
    <script>
        // FAQ Toggle
        document.querySelectorAll('.faq-question').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const item = btn.parentElement;
                item.classList.toggle('active');
            });
        });
    </script>
</body>
</html>`;
    };

    const getInlineCSS = (): string => {
        return `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #252542 100%);
            color: #ffffff;
            line-height: 1.6;
            min-height: 100vh;
        }
        h1, h2, h3 { 
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            line-height: 1.2;
        }
        h2 { font-size: clamp(1.5rem, 3.5vw, 2.5rem); margin-bottom: 1.5rem; }
        h3 { font-size: clamp(1.25rem, 2.5vw, 1.875rem); margin-bottom: 1rem; }
        .infographic { max-width: 900px; margin: 0 auto; background: linear-gradient(180deg, rgba(15,15,35,0.95) 0%, rgba(26,26,46,0.95) 100%); border-radius: 24px; overflow: hidden; }
        .hero { position: relative; min-height: 500px; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem; overflow: hidden; }
        .hero__background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.3; filter: blur(8px); }
        .hero__overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, rgba(102,126,234,0.4) 0%, rgba(15,15,35,0.95) 100%); }
        .hero__content { position: relative; z-index: 2; text-align: center; max-width: 800px; }
        .hero__title { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; line-height: 1.1; margin-bottom: 1.5rem; background: linear-gradient(135deg, #ffffff 0%, #a8b8f9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .content-section { padding: 3rem 2rem; }
        .section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
        .section-icon { font-size: 2.5rem; }
        .section-content { font-size: 1.125rem; line-height: 1.8; color: rgba(255,255,255,0.9); }
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; padding: 3rem 2rem; }
        .metric-card { padding: 2rem; background: linear-gradient(135deg, rgba(102,126,234,0.15) 0%, rgba(118,75,162,0.15) 100%); border: 1px solid rgba(102,126,234,0.3); border-radius: 16px; text-align: center; transition: all 0.25s; }
        .metric-card:hover { transform: translateY(-8px); border-color: rgba(102,126,234,0.6); box-shadow: 0 12px 40px rgba(102,126,234,0.3); }
        .metric-icon { font-size: 3rem; margin-bottom: 1rem; }
        .metric-value { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
        .metric-label { font-size: 0.875rem; font-weight: 600; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-bottom: 0.5rem; }
        .metric-description { font-size: 0.9375rem; color: rgba(255,255,255,0.6); }
        .quote-block { margin: 4rem auto; padding: 3rem; max-width: 700px; background: linear-gradient(135deg, rgba(245,87,108,0.1) 0%, rgba(240,147,251,0.1) 100%); border-left: 4px solid #f5576c; border-radius: 12px; position: relative; }
        .quote-block::before { content: '"'; font-size: 6rem; font-family: Georgia, serif; color: rgba(245,87,108,0.2); position: absolute; top: -20px; left: 20px; }
        .quote-text { font-size: 1.375rem; font-style: italic; line-height: 1.6; margin-bottom: 1.5rem; }
        .quote-author { font-size: 1rem; font-weight: 600; }
        .quote-role { font-size: 0.875rem; color: rgba(255,255,255,0.6); }
        .timeline { padding: 4rem 2rem; position: relative; }
        .timeline::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, transparent 0%, rgba(102,126,234,0.6) 20%, rgba(102,126,234,0.6) 80%, transparent 100%); transform: translateX(-50%); }
        .timeline-item { position: relative; margin-bottom: 3rem; display: grid; grid-template-columns: 1fr auto 1fr; gap: 2rem; align-items: center; }
        .timeline-marker { grid-column: 2; width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: 4px solid #0f0f23; box-shadow: 0 0 0 4px rgba(102,126,234,0.3); z-index: 2; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; }
        .timeline-content { padding: 1.5rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; }
        .timeline-item:nth-child(odd) .timeline-content { grid-column: 3; }
        .timeline-item:nth-child(even) .timeline-content { grid-column: 1; text-align: right; }
        .timeline-phase { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #667eea; margin-bottom: 0.5rem; }
        .timeline-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
        .timeline-description { font-size: 0.9375rem; color: rgba(255,255,255,0.7); }
        .faq-section { padding: 4rem 2rem; }
        .faq-item { margin-bottom: 1.5rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden; }
        .faq-question { width: 100%; padding: 1.5rem; font-size: 1.125rem; font-weight: 600; background: transparent; border: none; color: white; text-align: left; cursor: pointer; display: flex; justify-content: space-between; }
        .faq-icon { font-size: 1.5rem; transition: transform 0.25s; }
        .faq-item.active .faq-icon { transform: rotate(45deg); }
        .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.4s; }
        .faq-item.active .faq-answer { max-height: 500px; }
        .faq-answer-content { padding: 0 1.5rem 1.5rem; color: rgba(255,255,255,0.8); }
        .cta-section { padding: 4rem; margin: 4rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 24px; text-align: center; }
        .cta-heading { font-size: 2.5rem; font-weight: 800; color: white; margin-bottom: 1.5rem; }
        .cta-description { font-size: 1.25rem; color: rgba(255,255,255,0.95); margin-bottom: 2rem; }
        .cta-button { padding: 1.25rem 3rem; font-size: 1.125rem; font-weight: 700; background: white; color: #4451bc; border: none; border-radius: 12px; cursor: pointer; }
        .text-center { text-align: center; }
        @media (max-width: 768px) {
            .timeline::before { left: 20px; }
            .timeline-item { grid-template-columns: auto 1fr; }
            .timeline-marker { grid-column: 1; }
            .timeline-item:nth-child(odd) .timeline-content,
            .timeline-item:nth-child(even) .timeline-content { grid-column: 2; text-align: left; }
            .metrics-grid { grid-template-columns: 1fr; }
        }
    `;
    };

    const generateBodyHTML = (): string => {
        return `
    <div class="infographic">
        <!-- Hero -->
        <section class="hero">
            <img src="${content.heroImage}" alt="${content.title}" class="hero__background">
            <div class="hero__overlay"></div>
            <div class="hero__content">
                <h1 class="hero__title">${content.title}</h1>
                <p style="font-size: 1.25rem; color: rgba(255,255,255,0.9);">${content.metaDescription}</p>
            </div>
        </section>

        <!-- Sections -->
        ${content.sections
                .map(
                    (section) => `
        <section class="content-section">
            <div class="section-header">
                ${section.icon ? `<span class="section-icon">${section.icon}</span>` : ''}
                <div>
                    ${section.level === 2 ? `<h2>${section.heading}</h2>` : `<h3>${section.heading}</h3>`}
                </div>
            </div>
            <div class="section-content">${section.content}</div>
        </section>
        `
                )
                .join('')}

        <!-- Metrics -->
        ${content.metrics.length > 0
                ? `
        <section>
            <h2 class="text-center" style="padding: 0 2rem;">Key Results</h2>
            <div class="metrics-grid">
                ${content.metrics
                    .map(
                        (metric) => `
                <div class="metric-card">
                    ${metric.icon ? `<div class="metric-icon">${metric.icon}</div>` : ''}
                    <div class="metric-value">${metric.value}</div>
                    <div class="metric-label">${metric.label}</div>
                    <div class="metric-description">${metric.description}</div>
                </div>
                `
                    )
                    .join('')}
            </div>
        </section>
        `
                : ''
            }

        <!-- Quotes -->
        ${content.quotes
                .map(
                    (quote) => `
        <div class="quote-block">
            <p class="quote-text">${quote.text}</p>
            ${quote.author || quote.role
                            ? `
            <div>
                ${quote.author ? `<div class="quote-author">— ${quote.author}</div>` : ''}
                ${quote.role ? `<div class="quote-role">${quote.role}</div>` : ''}
            </div>
            `
                            : ''
                        }
        </div>
        `
                )
                .join('')}

        <!-- Timeline -->
        ${content.timeline.length > 0
                ? `
        <section class="timeline">
            <h2 class="text-center" style="margin-bottom: 3rem;">Journey Timeline</h2>
            ${content.timeline
                    .map(
                        (event, index) => `
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-phase">${event.phase}</div>
                    <h3 class="timeline-title">${event.title}</h3>
                    <p class="timeline-description">${event.description}</p>
                </div>
                <div class="timeline-marker">
                    ${event.phase === 'before' ? '🎯' : event.phase === 'during' ? '⚙️' : '🚀'}
                </div>
            </div>
            `
                    )
                    .join('')}
        </section>
        `
                : ''
            }

        <!-- FAQs -->
        ${content.faqs.length > 0
                ? `
        <section class="faq-section">
            <h2 class="text-center" style="margin-bottom: 2rem;">Frequently Asked Questions</h2>
            ${content.faqs
                    .map(
                        (faq) => `
            <div class="faq-item">
                <button class="faq-question">
                    ${faq.question}
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <div class="faq-answer-content">${faq.answer}</div>
                </div>
            </div>
            `
                    )
                    .join('')}
        </section>
        `
                : ''
            }

        <!-- CTA -->
        <section class="cta-section">
            <h2 class="cta-heading">${content.cta.heading}</h2>
            <p class="cta-description">${content.cta.description}</p>
            <button class="cta-button">${content.cta.buttonText}</button>
        </section>
    </div>
    `;
    };

    const copyToClipboard = () => {
        const html = generateHTML();
        navigator.clipboard.writeText(html);
        alert('HTML copied to clipboard!');
    };

    const downloadHTML = () => {
        const html = generateHTML();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${content.title.toLowerCase().replace(/\s+/g, '-')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={copyToClipboard} className="btn btn-secondary">
                📋 Copy HTML
            </button>
            <button onClick={downloadHTML} className="btn btn-primary">
                ⬇️ Download HTML
            </button>
        </div>
    );
}
