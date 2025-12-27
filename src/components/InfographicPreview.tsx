'use client';

import React, { useState } from 'react';
import { BlogContent } from '@/types/types';
import styles from '@/styles/infographic.module.css';

interface InfographicPreviewProps {
    content: BlogContent;
}

export default function InfographicPreview({ content }: InfographicPreviewProps) {
    const [activeFaqs, setActiveFaqs] = useState<Set<number>>(new Set());

    const toggleFaq = (index: number) => {
        const newActiveFaqs = new Set(activeFaqs);
        if (newActiveFaqs.has(index)) {
            newActiveFaqs.delete(index);
        } else {
            newActiveFaqs.add(index);
        }
        setActiveFaqs(newActiveFaqs);
    };

    return (
        <div className={styles.infographic}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <img
                    src={content.heroImage}
                    alt={content.title}
                    className={styles.hero__background}
                />
                <div className={styles.hero__overlay} />
                <div className={styles.hero__content}>
                    <h1 className={styles.hero__title}>{content.title}</h1>
                    <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)' }}>
                        {content.metaDescription}
                    </p>
                </div>
            </section>

            {/* Main Content Sections */}
            {content.sections.map((section, index) => (
                <section key={section.id} className={styles.contentSection}>
                    <div className={styles.sectionHeader}>
                        {section.icon && <span className={styles.sectionIcon}>{section.icon}</span>}
                        <div>
                            {section.level === 2 && <h2>{section.heading}</h2>}
                            {section.level === 3 && <h3>{section.heading}</h3>}
                        </div>
                    </div>
                    <div
                        className={styles.sectionContent}
                        dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                </section>
            ))}

            {/* Metrics Grid */}
            {content.metrics.length > 0 && (
                <section>
                    <div className="container">
                        <h2 className="text-center mb-4">Key Results</h2>
                    </div>
                    <div className={styles.metricsGrid}>
                        {content.metrics.map((metric, index) => (
                            <div key={index} className={styles.metricCard}>
                                {metric.icon && <div className={styles.metricIcon}>{metric.icon}</div>}
                                <div className={styles.metricValue}>{metric.value}</div>
                                <div className={styles.metricLabel}>{metric.label}</div>
                                <div className={styles.metricDescription}>{metric.description}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Quotes */}
            {content.quotes.map((quote, index) => (
                <div key={index} className={styles.quoteBlock}>
                    <p className={styles.quoteText}>{quote.text}</p>
                    {(quote.author || quote.role) && (
                        <div>
                            {quote.author && <div className={styles.quoteAuthor}>— {quote.author}</div>}
                            {quote.role && <div className={styles.quoteRole}>{quote.role}</div>}
                        </div>
                    )}
                </div>
            ))}

            {/* Timeline */}
            {content.timeline.length > 0 && (
                <section className={styles.timeline}>
                    <div className="container">
                        <h2 className="text-center mb-5">Journey Timeline</h2>
                    </div>
                    {content.timeline.map((event, index) => (
                        <div key={index} className={styles.timelineItem}>
                            <div className={styles.timelineContent}>
                                <div className={styles.timelinePhase}>{event.phase}</div>
                                <h3 className={styles.timelineTitle}>{event.title}</h3>
                                <p className={styles.timelineDescription}>{event.description}</p>
                            </div>
                            <div className={styles.timelineMarker}>
                                {event.phase === 'before' && '🎯'}
                                {event.phase === 'during' && '⚙️'}
                                {event.phase === 'after' && '🚀'}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* FAQ Section */}
            {content.faqs.length > 0 && (
                <section className={styles.faqSection}>
                    <div className="container">
                        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
                    </div>
                    {content.faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${activeFaqs.has(index) ? 'active' : ''}`}
                        >
                            <button
                                className={styles.faqQuestion}
                                onClick={() => toggleFaq(index)}
                                aria-expanded={activeFaqs.has(index)}
                            >
                                {faq.question}
                                <span className={styles.faqIcon}>+</span>
                            </button>
                            <div className={styles.faqAnswer}>
                                <div className={styles.faqAnswerContent}>{faq.answer}</div>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Call to Action */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaContent}>
                    <h2 className={styles.ctaHeading}>{content.cta.heading}</h2>
                    <p className={styles.ctaDescription}>{content.cta.description}</p>
                    <button className={styles.ctaButton}>{content.cta.buttonText}</button>
                </div>
            </section>
        </div>
    );
}
