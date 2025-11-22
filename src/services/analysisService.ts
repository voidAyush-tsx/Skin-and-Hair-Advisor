// src/services/analysisService.ts
import { HairAnalysisResult, SkinAnalysisResult } from "@/types/analysis";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

interface AnalysisResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export async function analyzeSkin(image: File): Promise<SkinAnalysisResult> {
    try {
        const formData = new FormData();
        formData.append("image", image);

        const response = await fetch(`${API_URL}/analyze?type=skin`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error (${response.status}): ${errorText || response.statusText}`);
        }

        const result: AnalysisResponse<SkinAnalysisResult> = await response.json();

        if (!result.success || !result.data) {
            throw new Error(result.error || "Analysis failed to produce results");
        }

        return result.data;
    } catch (error) {
        console.error("Skin analysis failed:", error);
        // Re-throw with a user-friendly message if possible
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred during skin analysis");
    }
}

export async function analyzeHair(image: File): Promise<HairAnalysisResult> {
    try {
        const formData = new FormData();
        formData.append("image", image);

        const response = await fetch(`${API_URL}/analyze?type=hair`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error (${response.status}): ${errorText || response.statusText}`);
        }

        const result: AnalysisResponse<HairAnalysisResult> = await response.json();

        if (!result.success || !result.data) {
            throw new Error(result.error || "Analysis failed to produce results");
        }

        return result.data;
    } catch (error) {
        console.error("Hair analysis failed:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred during hair analysis");
    }
}