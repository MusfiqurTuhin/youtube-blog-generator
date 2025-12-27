import { GoogleGenerativeAI } from '@google/generative-ai';
import { BlogContent, TranscriptResponse, SupportedModel, AVAILABLE_MODELS } from '@/types/types';

/**
 * Gemini Service - Handles all interactions with Gemini API
 * Supports multiple models: Gemini 2.5/3 series with model selection
 * Uses native multimodal capabilities to process YouTube videos
 */
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private modelName: SupportedModel;

  constructor(apiKey: string, modelName?: SupportedModel) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    // Default to Gemini 3 Flash for best balance of speed and quality
    this.modelName = modelName || 'gemini-3-flash-preview';
    this.model = this.genAI.getGenerativeModel({ model: this.modelName });
  }

  /**
   * Get the currently selected model name
   */
  getModelName(): SupportedModel {
    return this.modelName;
  }

  /**
   * Get list of available models with their information
   */
  static getAvailableModels() {
    return AVAILABLE_MODELS;
  }

  /**
   * Extract YouTube video ID from various URL formats
   */
  private extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  }

  /**
   * Extract transcript from YouTube video using Gemini's native multimodal capabilities
   */
  async extractTranscript(youtubeUrl: string): Promise<TranscriptResponse> {
    try {
      const videoId = this.extractVideoId(youtubeUrl);
      if (!videoId) {
        throw new Error('Invalid YouTube URL format');
      }

      const prompt = `Please provide a complete, accurate, verbatim transcript of all spoken content in this video. 
Include timestamps every 30 seconds in the format [MM:SS]. 
Structure the transcript with clear paragraphs based on topic changes.
Do not summarize - provide the exact words spoken.`;

      const result = await this.model.generateContent([
        {
          fileData: {
            mimeType: 'video/*',
            fileUri: youtubeUrl,
          },
        },
        { text: prompt },
      ]);

      const response = await result.response;
      const transcript = response.text();

      return {
        transcript,
        timestamps: this.parseTimestamps(transcript),
      };
    } catch (error: any) {
      console.error('Transcript extraction error:', error);
      throw new Error(`Failed to extract transcript: ${error.message}`);
    }
  }

  /**
   * Parse timestamps from transcript
   */
  private parseTimestamps(transcript: string): Array<{ time: string; text: string }> {
    const timestampRegex = /\[(\d{1,2}:\d{2})\]\s*([^\[]+)/g;
    const timestamps = [];
    let match;

    while ((match = timestampRegex.exec(transcript)) !== null) {
      timestamps.push({
        time: match[1],
        text: match[2].trim(),
      });
    }

    return timestamps;
  }

  /**
   * Analyze transcript and generate structured blog content
   */
  async generateBlogContent(
    transcript: string,
    videoUrl: string,
    videoId: string
  ): Promise<BlogContent> {
    const prompt = this.buildContentPrompt(transcript);

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();

      // Parse the structured JSON response
      const blogContent = this.parseGeminiResponse(content, videoUrl, videoId);
      return blogContent;
    } catch (error: any) {
      console.error('Content generation error:', error);
      throw new Error(`Failed to generate blog content: ${error.message}`);
    }
  }

  /**
   * Build comprehensive prompt for content generation
   */
  private buildContentPrompt(transcript: string): string {
    return `You are an expert content strategist and SEO specialist. Analyze the following video transcript and create a comprehensive, SEO-optimized blog post structure.

TRANSCRIPT:
${transcript}

Generate a JSON response with the following structure:

{
  "title": "Compelling H1 title (60-70 characters)",
  "metaTitle": "SEO-optimized meta title (50-60 characters)",
  "metaDescription": "Engaging meta description (150-160 characters)",
  "sections": [
    {
      "id": "unique-slug",
      "heading": "Section heading",
      "level": 2,
      "content": "Rich, detailed content with natural keyword integration. Use storytelling. Include specific examples from the video.",
      "icon": "📊" // Relevant emoji as icon
    }
  ],
  "metrics": [
    {
      "label": "Key Metric Name",
      "value": "500%",
      "description": "Brief explanation of the metric",
      "icon": "📈"
    }
  ],
  "quotes": [
    {
      "text": "Exact quote from video that highlights impact or insight",
      "author": "Person name if mentioned",
      "role": "Their role/title if mentioned"
    }
  ],
  "faqs": [
    {
      "question": "What problem was addressed?",
      "answer": "Detailed answer based on video content"
    },
    {
      "question": "Why was this solution chosen?",
      "answer": "Explanation with specific details"
    },
    {
      "question": "How was it implemented?",
      "answer": "Step-by-step or key implementation points"
    },
    {
      "question": "What were the challenges?",
      "answer": "Challenges faced and how they were overcome"
    },
    {
      "question": "What results were achieved?",
      "answer": "Specific outcomes and impact"
    }
  ],
  "timeline": [
    {
      "title": "Initial Challenge",
      "description": "Brief description of the starting point",
      "phase": "before"
    },
    {
      "title": "Solution Implementation",
      "description": "Key actions taken",
      "phase": "during"
    },
    {
      "title": "Results Achieved",
      "description": "Final outcomes",
      "phase": "after"
    }
  ],
  "cta": {
    "heading": "Ready to Transform Your Business?",
    "description": "Brief value proposition based on the story",
    "buttonText": "Get Started Today",
    "buttonLink": "#contact"
  }
}

CRITICAL REQUIREMENTS:
1. Create at least 5-7 comprehensive sections covering the full story
2. Extract ALL mentioned metrics, numbers, and quantifiable results
3. Include 3-5 impactful quotes
4. Create 5-8 FAQs that cover the entire narrative arc
5. Build a 3-5 step timeline showing transformation
6. Use natural, engaging language - not keyword-stuffed
7. Make content scannable with clear hierarchy
8. Focus on business value and tangible outcomes
9. Use professional yet conversational tone
10. Ensure all content is factual and derived from the transcript

Return ONLY valid JSON, no markdown formatting.`;
  }

  /**
   * Parse Gemini's response into BlogContent structure
   */
  private parseGeminiResponse(content: string, videoUrl: string, videoId: string): BlogContent {
    try {
      // Remove markdown code blocks if present
      let jsonContent = content.trim();
      if (jsonContent.startsWith('```json')) {
        jsonContent = jsonContent.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
      } else if (jsonContent.startsWith('```')) {
        jsonContent = jsonContent.replace(/```\n?/g, '');
      }

      const parsed = JSON.parse(jsonContent);

      return {
        ...parsed,
        videoUrl,
        videoId,
        heroImage: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      };
    } catch (error) {
      console.error('JSON parsing error:', error);
      console.error('Raw content:', content);
      throw new Error('Failed to parse Gemini response. The model may have returned invalid JSON.');
    }
  }

  /**
   * Complete workflow: Extract transcript and generate blog content
   */
  async processYouTubeVideo(youtubeUrl: string, onProgress?: (stage: string, progress: number) => void): Promise<BlogContent> {
    try {
      // Stage 1: Extract transcript
      onProgress?.('extracting', 20);
      const { transcript } = await this.extractTranscript(youtubeUrl);

      // Stage 2: Generate content
      onProgress?.('generating', 60);
      const videoId = this.extractVideoId(youtubeUrl)!;
      const blogContent = await this.generateBlogContent(transcript, youtubeUrl, videoId);

      onProgress?.('complete', 100);
      return blogContent;
    } catch (error: any) {
      throw new Error(`Video processing failed: ${error.message}`);
    }
  }
}
