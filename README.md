# YouTube → SEO-Optimized Infographic Blog Generator

Transform any YouTube video into a stunning, SEO-optimized infographic blog post using **Gemini 2.5 and 3 series** AI models with advanced multimodal capabilities.

![YouTube to Blog Generator](https://img.shields.io/badge/Powered%20by-Gemini%202.5%2F3-blue)
![Next.js](https://img.shields.io/badge/Next.js-16+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)

## 🎯 Features

- **🤖 Multiple Gemini Models**: Choose from Gemini 2.5/3 series models for different speed/quality tradeoffs
- **📝 Native YouTube Processing**: Directly processes YouTube URLs - no manual transcripts needed
- **🎨 Beautiful Infographic Design**: Modern, visually stunning layouts with glassmorphism and animations
- **🔍 SEO-Optimized**: Proper H1/H2/H3 hierarchy, meta tags, FAQ schema, and keyword optimization
- **📊 Rich Content Elements**: Metrics cards, quotes, timeline, FAQ accordion
- **💾 HTML Export**: Self-contained HTML with inline CSS - ready for any CMS
- **🚀 Zero External Dependencies**: Exported HTML works standalone
- **💾 Model Persistence**: Your model choice is saved for future sessions

## 🌟 Available Gemini Models

This application supports multiple Gemini models with different capabilities:

| Model | Speed | Quality | Best For |
|-------|-------|---------|----------|
| **Gemini 3 Flash (Preview)** ⭐ | Very Fast | Excellent | Latest fast model (recommended) |
| Gemini 3 Pro (Preview) | Medium | Excellent | Complex reasoning |
| Gemini 2.5 Pro (Stable) | Medium | Excellent | High-quality, stable |
| Gemini 2.5 Flash (Stable) | Fast | Very Good | Production standard |
| Gemini 2.5 Flash Lite | Very Fast | Good | Cost-effective |
| Gemini 1.5 Pro (Legacy) | Medium | Very Good | Legacy fallback |

### Key Capabilities (All Models)

- **Native YouTube URL Support**: Processes videos directly without downloading
- **Multimodal Understanding**: Analyzes both audio (speech) and visual (on-screen text) content
- **Context Window**: Up to 2M tokens for comprehensive content analysis
- **High-Quality Output**: Natural, engaging, SEO-optimized prose

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone or navigate to the project**:
   \`\`\`bash
   cd youtube-infographic-blog
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Run development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Usage

1. **Enter your Gemini API Key**: Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Select a Model**: Choose from Gemini 2.5/3 series based on your needs (⭐ = recommended)
3. **Paste YouTube URL**: Any YouTube video (works best with business stories, case studies, presentations)
4. **Click Generate**: Wait for the AI to process the video
4. **Preview**: Scroll through the beautiful infographic blog
5. **Export**: Download or copy the self-contained HTML

## 📁 Project Structure

\`\`\`
youtube-infographic-blog/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global design system
│   │   ├── layout.tsx            # Root layout with metadata
│   │   └── page.tsx              # Main page
│   ├── components/
│   │   ├── YouTubeToInfographic.tsx  # Main app component
│   │   ├── InfographicPreview.tsx    # Preview component
│   │   └── HTMLExporter.tsx          # Export functionality
│   ├── services/
│   │   └── gemini-service.ts     # Gemini API integration
│   ├── styles/
│   │   └── infographic.module.css    # Infographic styles
│   └── types/
│       └── types.ts              # TypeScript interfaces
├── package.json
└── README.md
\`\`\`

## 🎨 Design Features

- **Modern Aesthetics**: Vibrant gradients, glassmorphism, dark mode
- **Smooth Animations**: Hover effects, transitions, micro-interactions
- **Responsive**: Mobile-first design that works on all devices
- **Premium Feel**: State-of-the-art design that wows users

## 🔧 Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Vanilla CSS (no Tailwind in components)
- **AI**: Google Generative AI SDK (`@google/generative-ai`)
- **Fonts**: Google Fonts (Inter, Poppins)

## 📊 How It Works

1. **Transcript Extraction**:
   - Gemini 3 Pro processes the YouTube URL directly
   - Extracts verbatim transcript with timestamps
   - No need for existing captions or subtitles

2. **Content Analysis**:
   - Identifies narrative structure (problem → solution → impact)
   - Extracts metrics, quotes, key insights
   - Organizes into SEO-friendly sections

3. **SEO Optimization**:
   - Generates meta title & description
   - Creates proper heading hierarchy
   - Builds FAQ section with schema markup
   - Suggests internal linking opportunities

4. **Visual Layout**:
   - Designs infographic-style layout
   - Creates timeline, metric cards, quote blocks
   - Applies modern styling and animations

5. **Export**:
   - Generates self-contained HTML
   - Includes inline CSS
   - Ready for any CMS or website

## 🎯 Use Cases

- **Odoo Success Stories**: Transform customer stories into compelling blog posts
- **Product Demos**: Convert demo videos into detailed guides
- **Case Studies**: Create shareable, SEO-optimized case studies
- **Webinar Recaps**: Turn webinars into evergreen content
- **Tutorial Videos**: Generate step-by-step written tutorials

## ⚠️ Important Notes

### API Key Security
The current implementation uses client-side API key entry. For production:
- Implement a backend proxy to secure the API key
- Use environment variables server-side
- Add rate limiting and authentication

### Model Selection
This app uses **Gemini 3 Pro** (`gemini-3-pro`). If you encounter issues:
- Verify your API key has access to Gemini 3 Pro
- Check Google AI Studio for model availability
- Alternative: Use `gemini-3-flash` for faster (but lower quality) results

### Video Processing Time
- Short videos (< 10 min): ~30-60 seconds
- Medium videos (10-30 min): ~1-3 minutes
- Long videos (30+ min): ~3-5 minutes

Processing time depends on video length and API response time.

## 🐛 Troubleshooting

### "Invalid API key" Error
- Verify your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Ensure the key has Gemini 3 Pro access
- Check for extra spaces when pasting

### "Invalid YouTube URL" Error
- Use full YouTube URLs (youtube.com/watch?v=... or youtu.be/...)
- Ensure the video is publicly accessible
- Try a different video

### "Failed to extract transcript" Error
- Gemini 3 Pro may not support all video formats
- Try a different video
- Check if the video is available in your region

## 🚀 Future Enhancements

- [ ] Backend API proxy for secure API key handling
- [ ] User authentication and saved blogs
- [ ] Multiple language support
- [ ] Custom styling options
- [ ] Batch processing multiple videos
- [ ] Direct CMS integration (WordPress, Medium, etc.)
- [ ] Analytics tracking

## 📝 License

This project is built for demonstration purposes using Google's Gemini API.

## 🙏 Acknowledgments

- Powered by [Google Gemini 3 Pro](https://deepmind.google/technologies/gemini/)
- Built with [Next.js](https://nextjs.org/)
- Styled with modern CSS techniques

---

**Built with ❤️ using Gemini 3 Pro**
