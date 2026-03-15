import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Video cache to avoid regenerating
const videoCache: Record<string, { url: string; expires: number }> = {};

// Pre-generated video URLs for demos (using sample Videos that work)
const sampleVideos: Record<string, string[]> = {
    'chatbot-finance': [
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    ],
    'computer-vision': [
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    ],
    'voice-assistant': [
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMelodies.mp4',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMoments.mp4'
    ],
    'image-generation': [
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    ],
    'document-analyzer': [
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    ],
    'sentiment-analysis': [
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMelodies.mp4',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMoments.mp4'
    ],
    'video-analysis': [
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    ],
    'recommendation-engine': [
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    ]
};

// Video prompts for AI generation
const videoPrompts: Record<string, string> = {
    'chatbot-finance': 'A futuristic digital banking interface with holographic chat bubbles, glowing financial graphs, and AI assistant helping users, modern tech aesthetic with blue and green accents',
    'computer-vision': 'Autonomous car vision system detecting pedestrians, cars, and traffic signs with bounding boxes and real-time analysis, futuristic HUD overlay',
    'voice-assistant': 'Sound waves transforming into text, voice recognition visualization, AI assistant responding with natural language, modern smart home setting',
    'image-generation': 'AI creating stunning digital artwork, pixels forming into beautiful landscapes, creative process visualization, artistic AI generation',
    'document-analyzer': 'Documents being scanned and analyzed, text extraction with highlighted entities, intelligent data processing visualization',
    'sentiment-analysis': 'Social media comments flowing through AI analysis, emoji reactions categorizing sentiment, real-time emotional analysis dashboard',
    'video-analysis': 'Video frames being analyzed by AI, object detection and tracking, scene understanding with labels and timestamps',
    'recommendation-engine': 'Products being matched to user profiles, recommendation algorithm visualization, personalized content delivery'
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const demoId = searchParams.get('demoId');
    const generate = searchParams.get('generate') === 'true';

    try {
        // If requesting specific demo video
        if (demoId) {
            // Check cache first
            const cacheKey = `demo-${demoId}`;
            const cached = videoCache[cacheKey];

            if (cached && cached.expires > Date.now()) {
                return NextResponse.json({
                    success: true,
                    videoUrl: cached.url,
                    cached: true
                });
            }

            // If AI generation requested
            if (generate) {
                const prompt = videoPrompts[demoId];
                if (prompt) {
                    const videoUrl = await generateVideo(prompt);
                    if (videoUrl) {
                        // Cache for 1 hour
                        videoCache[cacheKey] = {
                            url: videoUrl,
                            expires: Date.now() + 3600000
                        };
                        return NextResponse.json({
                            success: true,
                            videoUrl,
                            generated: true
                        });
                    }
                }
            }

            // Return sample video as fallback
            const samples = sampleVideos[demoId] || sampleVideos['chatbot-finance'];
            const randomVideo = samples[Math.floor(Math.random() * samples.length)];

            return NextResponse.json({
                success: true,
                videoUrl: randomVideo,
                sample: true
            });
        }

        // Return all available videos
        const allVideos: Record<string, { url: string; generated: boolean }> = {};

        for (const [id, samples] of Object.entries(sampleVideos)) {
            allVideos[id] = {
                url: samples[0],
                generated: false
            };
        }

        return NextResponse.json({
            success: true,
            videos: allVideos,
            prompts: videoPrompts
        });
    } catch (error) {
        console.error('Error in demos-videos API:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to get videos'
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { prompt, demoId } = body;

        if (!prompt) {
            return NextResponse.json({
                success: false,
                error: 'Prompt is required'
            }, { status: 400 });
        }

        const videoUrl = await generateVideo(prompt);

        if (videoUrl) {
            // Cache if demoId provided
            if (demoId) {
                videoCache[`demo-${demoId}`] = {
                    url: videoUrl,
                    expires: Date.now() + 3600000
                };
            }

            return NextResponse.json({
                success: true,
                videoUrl,
                taskId: Date.now().toString()
            });
        }

        return NextResponse.json({
            success: false,
            error: 'Video generation failed'
        }, { status: 500 });
    } catch (error) {
        console.error('Error generating video:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 });
    }
}

async function generateVideo(prompt: string): Promise<string | null> {
    try {
        const zai = await ZAI.create();

        // Create video generation task
        const task = await zai.video.generations.create({
            prompt: prompt,
            quality: 'speed',
            duration: 5,
            fps: 30,
            size: '1024x1024'
        });

        console.log('Video task created:', task.id);

        // Poll for results
        let result = await zai.async.result.query(task.id);
        let pollCount = 0;
        const maxPolls = 60;
        const pollInterval = 5000;

        while (result.task_status === 'PROCESSING' && pollCount < maxPolls) {
            pollCount++;
            console.log(`Polling ${pollCount}/${maxPolls}: Status is ${result.task_status}`);
            await new Promise(resolve => setTimeout(resolve, pollInterval));
            result = await zai.async.result.query(task.id);
        }

        if (result.task_status === 'SUCCESS') {
            const videoUrl = (result as any).video_result?.[0]?.url ||
                (result as any).video_url ||
                (result as any).url ||
                (result as any).video;

            console.log('Video generated successfully:', videoUrl);
            return videoUrl;
        }

        console.log('Video generation status:', result.task_status);
        return null;
    } catch (error) {
        console.error('Video generation error:', error);
        return null;
    }
}
