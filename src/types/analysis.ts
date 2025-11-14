// src/types/analysis.ts
export interface HairAnalysisResult {
    hairType: string;
    texture: string;
    density: string;
    porosity: string;
    concerns: string[];
    damageLevel: string;
    scalpCondition: string;
    recommendations: {
        type: string;
        description: string;
    }[];
}

export interface SkinAnalysisResult {
    skinType: string;
    hydrationLevel: string;
    sensitivity: string;
    uvDamage: string;
    concerns: string[];
    recommendations: {
        type: string;
        description: string;
    }[];
}