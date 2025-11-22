// Product database for smart recommendations
export interface Product {
    id: string;
    name: string;
    brand: string;
    category: 'cleanser' | 'moisturizer' | 'treatment' | 'sunscreen' | 'serum';
    skinTypes: string[]; // e.g., ['Oily', 'Combination']
    concerns: string[]; // e.g., ['Acne', 'Hyperpigmentation']
    keyIngredients: string[];
    description: string;
    priceRange: '$' | '$$' | '$$$';
    rating: number; // 1-5
    imageUrl?: string;
}

export const PRODUCT_DATABASE: Product[] = [
    // Cleansers
    {
        id: 'clnsr-001',
        name: 'Hydrating Facial Cleanser',
        brand: 'CeraVe',
        category: 'cleanser',
        skinTypes: ['Dry', 'Normal', 'Sensitive'],
        concerns: ['Dehydration', 'Sensitivity'],
        keyIngredients: ['Hyaluronic Acid', 'Ceramides'],
        description: 'Gentle, non-foaming cleanser that hydrates and restores the skin barrier.',
        priceRange: '$',
        rating: 4.6
    },
    {
        id: 'clnsr-002',
        name: 'SA Cleanser',
        brand: 'CeraVe',
        category: 'cleanser',
        skinTypes: ['Oily', 'Combination', 'Normal'],
        concerns: ['Acne', 'Blackheads', 'Large Pores'],
        keyIngredients: ['Salicylic Acid (2%)', 'Niacinamide'],
        description: 'Exfoliating cleanser with salicylic acid to unclog pores and reduce breakouts.',
        priceRange: '$',
        rating: 4.5
    },
    {
        id: 'clnsr-003',
        name: 'Ultra Gentle Daily Cleanser',
        brand: 'Neutrogena',
        category: 'cleanser',
        skinTypes: ['Sensitive', 'Dry'],
        concerns: ['Sensitivity', 'Redness'],
        keyIngredients: ['Glycerin'],
        description: 'Fragrance-free, hypoallergenic cleanser that won\'t strip skin.',
        priceRange: '$',
        rating: 4.3
    },

    // Moisturizers
    {
        id: 'moist-001',
        name: 'Daily Moisturizing Lotion',
        brand: 'CeraVe',
        category: 'moisturizer',
        skinTypes: ['Dry', 'Normal', 'Sensitive'],
        concerns: ['Dehydration', 'Dullness'],
        keyIngredients: ['Ceramides', 'Hyaluronic Acid'],
        description: 'Lightweight, non-greasy moisturizer that provides 24-hour hydration.',
        priceRange: '$',
        rating: 4.7
    },
    {
        id: 'moist-002',
        name: 'Dramatically Different Moisturizing Gel',
        brand: 'Clinique',
        category: 'moisturizer',
        skinTypes: ['Oily', 'Combination'],
        concerns: ['Excess Oil', 'Dehydration'],
        keyIngredients: ['Hyaluronic Acid', 'Cucumber Extract'],
        description: 'Oil-free gel moisturizer that hydrates without adding shine.',
        priceRange: '$$',
        rating: 4.4
    },
    {
        id: 'moist-003',
        name: 'Toleriane Double Repair Face Moisturizer',
        brand: 'La Roche-Posay',
        category: 'moisturizer',
        skinTypes: ['Sensitive', 'Dry', 'Normal'],
        concerns: ['Sensitivity', 'Redness', 'Barrier Damage'],
        keyIngredients: ['Ceramide-3', 'Niacinamide', 'Prebiotic Thermal Water'],
        description: 'Restorative moisturizer for sensitive skin with SPF 30.',
        priceRange: '$$',
        rating: 4.6
    },

    // Treatments
    {
        id: 'treat-001',
        name: 'Niacinamide 10% + Zinc 1%',
        brand: 'The Ordinary',
        category: 'serum',
        skinTypes: ['Oily', 'Combination', 'Acne-Prone'],
        concerns: ['Acne', 'Large Pores', 'Excess Oil', 'Uneven Texture'],
        keyIngredients: ['Niacinamide (10%)', 'Zinc PCA'],
        description: 'High-strength vitamin B3 serum to reduce blemishes and congestion.',
        priceRange: '$',
        rating: 4.3
    },
    {
        id: 'treat-002',
        name: 'Retinol 0.5% in Squalane',
        brand: 'The Ordinary',
        category: 'treatment',
        skinTypes: ['Normal', 'Dry', 'Combination'],
        concerns: ['Fine Lines', 'Aging', 'Uneven Texture', 'Hyperpigmentation'],
        keyIngredients: ['Retinol (0.5%)', 'Squalane'],
        description: 'Moderate-strength retinol for reducing signs of aging.',
        priceRange: '$',
        rating: 4.4
    },
    {
        id: 'treat-003',
        name: 'Azelaic Acid Suspension 10%',
        brand: 'The Ordinary',
        category: 'treatment',
        skinTypes: ['All Types'],
        concerns: ['Hyperpigmentation', 'Acne', 'Redness', 'Uneven Tone'],
        keyIngredients: ['Azelaic Acid (10%)'],
        description: 'Multi-purpose formula to brighten skin tone and reduce blemishes.',
        priceRange: '$',
        rating: 4.2
    },
    {
        id: 'treat-004',
        name: 'Vitamin C Serum',
        brand: 'SkinCeuticals',
        category: 'serum',
        skinTypes: ['All Types'],
        concerns: ['Dullness', 'Hyperpigmentation', 'UV Damage', 'Fine Lines'],
        keyIngredients: ['L-Ascorbic Acid (15%)', 'Ferulic Acid', 'Vitamin E'],
        description: 'Gold-standard vitamin C serum for brightening and antioxidant protection.',
        priceRange: '$$$',
        rating: 4.8
    },
    {
        id: 'treat-005',
        name: 'Differin Gel',
        brand: 'Differin',
        category: 'treatment',
        skinTypes: ['Oily', 'Combination', 'Acne-Prone'],
        concerns: ['Acne', 'Blackheads', 'Uneven Texture'],
        keyIngredients: ['Adapalene (0.1%)'],
        description: 'Over-the-counter retinoid specifically for acne treatment.',
        priceRange: '$',
        rating: 4.5
    },

    // Sunscreens
    {
        id: 'sun-001',
        name: 'Anthelios Melt-in Milk Sunscreen SPF 60',
        brand: 'La Roche-Posay',
        category: 'sunscreen',
        skinTypes: ['All Types'],
        concerns: ['UV Damage', 'Aging Prevention'],
        keyIngredients: ['Avobenzone', 'Homosalate', 'Octocrylene', 'Cell-Ox Shield'],
        description: 'Broad-spectrum sunscreen with lightweight, fast-absorbing texture.',
        priceRange: '$$',
        rating: 4.6
    },
    {
        id: 'sun-002',
        name: 'UV Clear Facial Sunscreen SPF 46',
        brand: 'EltaMD',
        category: 'sunscreen',
        skinTypes: ['Oily', 'Combination', 'Sensitive', 'Acne-Prone'],
        concerns: ['UV Damage', 'Acne', 'Redness'],
        keyIngredients: ['Zinc Oxide', 'Niacinamide', 'Hyaluronic Acid'],
        description: 'Oil-free, mineral sunscreen that calms and protects sensitive skin.',
        priceRange: '$$',
        rating: 4.7
    },
    {
        id: 'sun-003',
        name: 'Unseen Sunscreen SPF 40',
        brand: 'Supergoop!',
        category: 'sunscreen',
        skinTypes: ['All Types'],
        concerns: ['UV Damage', 'Shine Control'],
        keyIngredients: ['Avobenzone', 'Homosalate', 'Octisalate'],
        description: 'Invisible, weightless, scentless sunscreen with a velvety finish.',
        priceRange: '$$',
        rating: 4.5
    },

    // Additional Serums
    {
        id: 'serum-001',
        name: 'Hyaluronic Acid 2% + B5',
        brand: 'The Ordinary',
        category: 'serum',
        skinTypes: ['All Types', 'Dehydrated'],
        concerns: ['Dehydration', 'Dullness', 'Fine Lines'],
        keyIngredients: ['Hyaluronic Acid', 'Vitamin B5'],
        description: 'Hydration serum that plumps and smooths the skin.',
        priceRange: '$',
        rating: 4.5
    },
    {
        id: 'serum-002',
        name: 'Advanced Snail 96 Mucin Power Essence',
        brand: 'COSRX',
        category: 'serum',
        skinTypes: ['Dry', 'Normal', 'Dehydrated'],
        concerns: ['Dehydration', 'Dullness', 'Aging'],
        keyIngredients: ['Snail Secretion Filtrate (96%)'],
        description: 'Lightweight essence with snail mucin for hydration and repair.',
        priceRange: '$',
        rating: 4.6
    }
];

// Smart matching algorithm
export function matchProducts(
    skinType: string,
    concerns: string[],
    category?: Product['category']
): Product[] {
    return PRODUCT_DATABASE.filter(product => {
        // Filter by category if specified
        if (category && product.category !== category) {
            return false;
        }

        // Check if product matches skin type
        const skinTypeMatch = product.skinTypes.some(
            type => type.toLowerCase() === skinType.toLowerCase() || type === 'All Types'
        );

        // Check if product addresses at least one concern
        const concernMatch = concerns.some(concern =>
            product.concerns.some(pc =>
                pc.toLowerCase().includes(concern.toLowerCase()) ||
                concern.toLowerCase().includes(pc.toLowerCase())
            )
        );

        return skinTypeMatch && (concernMatch || concerns.length === 0);
    })
        .sort((a, b) => b.rating - a.rating) // Sort by rating
        .slice(0, 6); // Return top 6 matches
}
