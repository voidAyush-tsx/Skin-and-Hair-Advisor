// src/server/analyze.ts
import express from 'express';
import multer from 'multer';
import { Request, Response } from 'express';

// Define proper types for the API response
interface ApiResponse {
    choices: Array<{
        message?: {
            content: string;
            role?: string;
        };
        text?: string;
        index?: number;
        finish_reason?: string;
    }>;
    error?: {
        message: string;
    };
}

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post('/analyze', upload.single('image'), async (req: Request, res: Response) => {
    try {
        console.log("Analyze endpoint called");

        if (!req.file) {
            console.log("No image file in request");
            res.status(400).json({ success: false, error: 'No image provided' });
            return;
        }

        const analysisType = (req.query.type as string || 'skin').toLowerCase();
        if (!['skin', 'hair'].includes(analysisType)) {
            res.status(400).json({ success: false, error: 'Invalid analysis type. Use "skin" or "hair"' });
            return;
        }

        const mimeType = req.file.mimetype || 'image/jpeg';
        console.log(`Image mime type: ${mimeType}`);

        if (req.file.size > 8 * 1024 * 1024) {
            res.status(400).json({ success: false, error: 'Image too large. Please use an image under 8MB' });
            return;
        }

        // Convert image to base64 for API
        const imageBase64 = req.file.buffer.toString('base64');
        const base64Image = `data:${mimeType};base64,${imageBase64}`;

        console.log(`Processing ${mimeType} image of size ${req.file.size} bytes`);

        // Check for API key (OpenRouter or Gemini)
        const rawApiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

        if (!rawApiKey) {
            console.error("Missing API key");
            res.status(500).json({ success: false, error: 'Server configuration error: Missing API key' });
            return;
        }

        const apiKey = rawApiKey.trim();

        // Construct the prompt based on analysis type
        const systemPrompt = `You are an expert dermatologist and trichologist AI assistant. 
        Your task is to analyze images of skin or hair and provide a detailed, clinical-grade assessment in STRICT JSON format.
        Do not include any conversational text, markdown formatting (like \`\`\`json), or explanations outside the JSON object.
        If the image is not suitable for analysis (blurry, not skin/hair, too dark), return a JSON with an "error" field explaining why.`;

        const userPrompt = analysisType === 'skin'
            ? `Analyze this image for SKIN health. Return a valid JSON object with this exact structure:
            {
                "skinType": "one of: Normal, Dry, Oily, Combination, Sensitive",
                "hydrationLevel": "one of: Dehydrated, Balanced, Well-hydrated",
                "sensitivity": "one of: Low, Moderate, High",
                "uvDamage": "one of: None, Minimal, Moderate, Severe",
                "concerns": ["array", "of", "specific", "concerns", "detected"],
                "recommendations": [
                    { "type": "Cleansing", "description": "Specific advice..." },
                    { "type": "Moisturizing", "description": "Specific advice..." },
                    { "type": "Treatment", "description": "Specific advice..." },
                    { "type": "Protection", "description": "Specific advice..." }
                ]
            }`
            : `Analyze this image for HAIR and SCALP health. Return a valid JSON object with this exact structure:
            {
                "hairType": "one of: Straight, Wavy, Curly, Coily",
                "texture": "one of: Fine, Medium, Coarse",
                "density": "one of: Thin, Medium, Thick",
                "porosity": "one of: Low, Medium, High",
                "damageLevel": "one of: Healthy, Minimal Damage, Moderate Damage, Severe Damage",
                "scalpCondition": "one of: Healthy, Dry/Flaky, Oily, Inflamed",
                "concerns": ["array", "of", "specific", "concerns", "detected"],
                "recommendations": [
                    { "type": "Cleansing", "description": "Specific advice..." },
                    { "type": "Conditioning", "description": "Specific advice..." },
                    { "type": "Treatment", "description": "Specific advice..." },
                    { "type": "Styling", "description": "Specific advice..." }
                ]
            }`;

        // OpenRouter endpoint configuration
        const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

        // Use a model capable of vision and JSON instruction following
        const requestBody = {
            model: "x-ai/grok-4.1-fast:free", // Fast, capable vision model
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: userPrompt },
                        {
                            type: "image_url",
                            image_url: {
                                url: base64Image
                            }
                        }
                    ]
                }
            ],
            temperature: 0.2, // Low temperature for consistent JSON
            response_format: { type: "json_object" }, // Request JSON mode if supported
            reasoning: { enabled: true } // Enable reasoning as requested
        };

        console.log("Sending request to LLM API...");
        console.log("Request model:", requestBody.model);
        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3001',
                'X-Title': 'Skin & Hair Advisor'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API error:', errorText);
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API response received");

        const content = data.choices?.[0]?.message?.content || '';

        // Parse the JSON response
        let analysisResult;
        try {
            // Clean up any potential markdown code blocks if the model ignored instructions
            const jsonString = content.replace(/```json\n?|\n?```/g, '').trim();
            analysisResult = JSON.parse(jsonString);
        } catch (e) {
            console.error("Failed to parse JSON response:", content);
            throw new Error("AI returned invalid data format");
        }

        // Check for error in the AI response
        if (analysisResult.error) {
            res.status(200).json({ success: false, error: analysisResult.error });
            return;
        }

        res.status(200).json({ success: true, data: analysisResult });

    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to process analysis'
        });
    }
});

router.post('/chat', async (req: Request, res: Response) => {
    try {
        const { messages, context } = req.body;

        if (!messages || !Array.isArray(messages)) {
            res.status(400).json({ success: false, error: 'Invalid messages format' });
            return;
        }

        const apiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            res.status(500).json({ success: false, error: 'Server configuration error' });
            return;
        }

        // Construct a system prompt that includes the analysis context
        const systemPrompt = `You are Dr. AI, an expert dermatologist and trichologist assistant.
        
        CONTEXT FROM ANALYSIS:
        ${JSON.stringify(context, null, 2)}
        
        Your goal is to answer the user's follow-up questions based on this analysis.
        - Be empathetic, professional, and clear.
        - Use the specific data points from the analysis (e.g., "As I mentioned, your hydration is low...").
        - Do not give medical prescriptions, but suggest over-the-counter ingredients.
        - Keep answers concise (under 3 paragraphs).`;

        const apiMessages = [
            { role: "system", content: systemPrompt },
            ...messages
        ];

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey.trim()}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3001',
                'X-Title': 'Skin & Hair Advisor'
            },
            body: JSON.stringify({
                model: "x-ai/grok-4.1-fast:free",
                messages: apiMessages,
                temperature: 0.7, // Slightly higher for natural conversation
                reasoning: { enabled: true }
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "I apologize, I couldn't generate a response.";

        res.json({ success: true, reply });

    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ success: false, error: 'Failed to process chat' });
    }
});

export default router;