// src/services/analysisService.ts
import { HairAnalysisResult, SkinAnalysisResult } from "@/types/analysis";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export async function analyzeSkin(image: File): Promise<SkinAnalysisResult> {
    try {
        const formData = new FormData();
        formData.append("image", image);

        const response = await fetch(`${API_URL}/analyze?type=skin`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Skin analysis failed:", error);
        throw error;
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
            throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Hair analysis failed:", error);
        throw error;
    }
}