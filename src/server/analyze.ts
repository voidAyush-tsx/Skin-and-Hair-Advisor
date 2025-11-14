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

        const analysisType = req.query.type as string || 'skin';
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
        console.log(`Base64 image string length: ${base64Image.length}`);

        if (!process.env.OPENROUTER_API_KEY) {
            console.error("Missing API key");
            res.status(500).json({ success: false, error: 'Server configuration error: Missing API key' });
            return;
        }

        // Create a stronger, more directive prompt
        const prompt = `
Please analyze this image thoroughly for ${analysisType} features.
YOU MUST provide a specific analysis of what you see in THIS image, not a general framework.

Return a structured report with EXACTLY the following format:

${analysisType === 'skin' ?
            `Skin Type: [specific type - normal, dry, oily, combination, sensitive]
Hydration Level: [specific level - low, medium, high, etc.]
Sensitivity: [specific level - low, medium, high]
UV Damage: [specific assessment - none, minimal, moderate, severe]
Concerns:
- [specific concern 1 seen in THIS image]
- [specific concern 2 seen in THIS image]
- [specific concern 3 seen in THIS image]` :
            `Hair Type: [specific type - straight, wavy, curly, coily, etc.]
Texture: [description of hair texture]
Density: [specific description - thin, medium, thick]
Porosity: [specific level - low, medium, high]
Damage Level: [level of damage observed]
Scalp Condition: [description of scalp condition]
Concerns:
- [specific concern 1 seen in THIS image]
- [specific concern 2 seen in THIS image]
- [specific concern 3 seen in THIS image]`}

Recommendations:
Cleansing - [specific product types and ingredients for THIS person]
Moisturizing - [specific product types and ingredients for THIS person]
Treatment - [specific product types and ingredients for THIS person]
Protection - [specific advice for THIS person]

DO NOT explain your limitations or that you cannot see the image. Analyze the image directly and provide specific insights. DO NOT provide a theoretical framework or explain how analysis works. Only provide the actual analysis.
`;

        // OpenRouter endpoint
        const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

        // Try a more reliable vision model
        const requestBody = {
            model: "openrouter/sonoma-sky-alpha", // Better vision model
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        {
                            type: "image_url",
                            image_url: {
                                url: base64Image,
                                detail: "high"
                            }
                        }
                    ]
                }
            ],
            max_tokens: 800
        };

        console.log("Sending request to LLM API...");
        console.log("Request model:", requestBody.model);
        console.log("API URL:", apiUrl);

        // Make the request
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3001',
                'X-Title': 'Beauty Analysis App'
            },
            body: JSON.stringify(requestBody)
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenRouter API error:', errorText);

            let errorMessage = 'Analysis service error';
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData?.error?.message || errorData?.message || 'Unknown API error';
                console.error('Parsed error:', errorData);
            } catch (e) {
                errorMessage = errorText || response.statusText;
            }

            res.status(200).json({
                success: false,
                error: errorMessage
            });
            return;
        }

        const data = await response.json();
        console.log("API response received");

        // Validate that the response is an actual analysis
        const processedData = processGeminiResponse(data, analysisType);

        // Check if we got a theoretical response instead of analysis
        const content = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || '';
        if (content.toLowerCase().includes("cannot analyze") ||
            content.toLowerCase().includes("cannot process") ||
            content.toLowerCase().includes("limitations") ||
            content.toLowerCase().includes("framework for") ||
            content.toLowerCase().includes("data limitations")) {

            res.status(200).json({
                success: false,
                error: "The AI couldn't analyze this image properly. Please try again with a clearer image.",
                data: {}
            });
            return;
        }

        // Check if we have error in processed data
        if ('error' in processedData) {
            res.status(200).json({
                success: false,
                error: processedData.error,
                data: {} // Return empty data object
            });
            return;
        }

        res.status(200).json({ success: true, data: processedData });

    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to process analysis'
        });
    }
});

function processGeminiResponse(rawResponse: ApiResponse, analysisType: string) {
    try {
        // Handle different response formats from OpenRouter
        let content = rawResponse.choices?.[0]?.message?.content ||
            rawResponse.choices?.[0]?.text ||
            '';

        console.log("Extracted content:", content);

        // Filter out the thinking sections
        content = removeThinkingSections(content);

        // Clean up markdown formatting
        content = cleanMarkdownFormatting(content);

        console.log("Content after cleaning:", content);

        // Add this check for empty responses
        if (!content || content.trim() === '') {
            console.error("API returned empty content");
            return {
                error: "The analysis service couldn't process this image. Please try a clearer image or a different image."
            };
        }

        if (analysisType === 'skin') {
            return {
                skinType: extractFromText(content, 'skin type'),
                hydrationLevel: extractFromText(content, 'hydration level'),
                sensitivity: extractFromText(content, 'sensitivity'),
                uvDamage: extractFromText(content, 'uv damage'),
                concerns: extractListFromText(content, 'concerns'),
                recommendations: extractRecommendationsFromText(content)
            };
        } else {
            return {
                hairType: extractFromText(content, 'hair type'),
                texture: extractFromText(content, 'texture'),
                density: extractFromText(content, 'density'),
                porosity: extractFromText(content, 'porosity'),
                damageLevel: extractFromText(content, 'damage level'),
                scalpCondition: extractFromText(content, 'scalp condition'),
                concerns: extractListFromText(content, 'concerns detected') || extractListFromText(content, 'concerns'),
                recommendations: extractRecommendationsFromText(content)
            };
        }
    } catch (error) {
        console.error("Error processing AI response:", error);
        return {
            error: "Failed to process the analysis result. Please try again."
        };
    }
}

// Function to clean markdown formatting from model responses
function cleanMarkdownFormatting(text: string): string {
    return text
        .replace(/^#{1,6}\s+/gm, '')           // Remove headings at line beginnings
        .replace(/\n#{1,6}\s+/gm, '\n')        // Remove headings after newlines
        .replace(/\n###\s+/gm, '\n')           // Remove ### specifically (for recommendations)
        .replace(/^\s*\*\*([^*]+)\*\*:/gm, '$1:') // Replace bold text in property names
        .trim();
}

// Function to remove thinking sections from model responses
function removeThinkingSections(text: string): string {
    // Different models might use slightly different formats for thinking sections
    const thinkingPatterns = [
        /◁think▷[\s\S]*?◁\/think▷/g,  // Moonshot AI Kimi format
        /<thinking>[\s\S]*?<\/thinking>/g,  // Alternative format
        /\[thinking\][\s\S]*?\[\/thinking\]/g  // Another possible format
    ];

    let result = text;
    for (const pattern of thinkingPatterns) {
        result = result.replace(pattern, '');
    }

    return result.trim();
}

function extractFromText(text: string, feature: string): string {
    try {
        const lowerText = text.toLowerCase();
        const lowerFeature = feature.toLowerCase();

        if (lowerText.includes(lowerFeature)) {
            const index = lowerText.indexOf(lowerFeature);
            const endOfLine = lowerText.indexOf('\n', index);
            const segment = text.substring(index, endOfLine > 0 ? endOfLine : undefined);

            const parts = segment.split(':');
            if (parts.length >= 2) {
                return parts[1].trim();
            }
        }

        return 'Not analyzed';
    } catch (error) {
        console.error(`Error extracting ${feature}:`, error);
        return 'Not analyzed';
    }
}

function extractListFromText(text: string, listName: string): string[] {
    try {
        const lowerText = text.toLowerCase();
        const startIndex = lowerText.indexOf(listName.toLowerCase());

        if (startIndex >= 0) {
            const followingText = text.substring(startIndex);
            const lines = followingText.split('\n').slice(1, 6);  // Get next 5 lines after the heading

            return lines
                .map(line => line.trim())
                .filter(line => line.startsWith('-') || line.startsWith('•') || line.startsWith('*'))
                .map(line => {
                    // Handle different bullet point styles
                    if (line.startsWith('-')) return line.substring(1).trim();
                    if (line.startsWith('•')) return line.substring(1).trim();
                    if (line.startsWith('*')) return line.substring(1).trim();
                    return line;
                })
                .filter(Boolean);
        }

        return [];
    } catch (error) {
        console.error(`Error extracting list ${listName}:`, error);
        return [];
    }
}

function extractRecommendationsFromText(text: string): {type: string, description: string}[] {
    try {
        const recommendations = [];
        const recommendationIndex = text.toLowerCase().indexOf('recommendation');

        if (recommendationIndex === -1) {
            return [];
        }

        const recommendationSection = text.substring(recommendationIndex);
        const lines = recommendationSection.split('\n');

        let currentType = '';
        let currentDesc = '';

        // Process recommendation section line by line
        for (let i = 0; i < lines.length; i++) {
            const trimmed = lines[i].trim();
            if (!trimmed) continue;

            // Skip header lines
            if (trimmed.toLowerCase() === 'recommendations:' ||
                trimmed.toLowerCase() === 'recommendation:' ||
                trimmed.toLowerCase() === 'recommended routine') {
                continue;
            }

            // Check for "Category - Description" format
            if (trimmed.includes(' - ')) {
                // Add previous recommendation if exists
                if (currentType && currentDesc) {
                    recommendations.push({ type: currentType, description: currentDesc });
                    currentType = '';
                    currentDesc = '';
                }

                const parts = trimmed.split(' - ');
                if (parts.length >= 2) {
                    currentType = parts[0].trim();
                    currentDesc = parts[1].trim();
                    recommendations.push({ type: currentType, description: currentDesc });
                    currentType = '';
                    currentDesc = '';
                }
                continue;
            }

            // Check for standalone category headers like "Cleansing:", "Moisturizing:", etc.
            const categories = ['cleansing', 'moisturizing', 'treatment', 'protection'];
            const isCategory = categories.some(cat =>
                trimmed.toLowerCase() === cat ||
                trimmed.toLowerCase() === cat + ':' ||
                trimmed.toLowerCase().startsWith(cat + ' '));

            if (isCategory || trimmed.endsWith(':')) {
                // Add previous recommendation if exists
                if (currentType && currentDesc) {
                    recommendations.push({ type: currentType, description: currentDesc });
                }

                // Set new category
                currentType = trimmed.endsWith(':') ? trimmed.slice(0, -1).trim() : trimmed;
                currentDesc = '';

                // Get the next paragraphs until next category
                let j = i + 1;
                const nextDesc = [];

                while (j < lines.length) {
                    const nextLine = lines[j].trim();
                    if (!nextLine) {
                        j++;
                        continue;
                    }

                    // Stop if we hit another category
                    if (categories.some(cat =>
                            nextLine.toLowerCase() === cat ||
                            nextLine.toLowerCase() === cat + ':' ||
                            nextLine.toLowerCase().startsWith(cat + ' ')) ||
                        nextLine.endsWith(':')) {
                        break;
                    }

                    nextDesc.push(nextLine);
                    j++;
                }

                if (nextDesc.length > 0) {
                    currentDesc = nextDesc.join(' ');
                    i = j - 1; // Skip ahead to where we stopped
                }

                continue;
            }

            // If we have a current type but still collecting description
            if (currentType && !categories.includes(currentType.toLowerCase())) {
                currentDesc += (currentDesc ? ' ' : '') + trimmed;
            }
        }

        // Add the last recommendation if it exists
        if (currentType && currentDesc) {
            recommendations.push({ type: currentType, description: currentDesc });
        }

        return recommendations;
    } catch (error) {
        console.error('Error extracting recommendations:', error);
        return [];
    }
}

export default router;