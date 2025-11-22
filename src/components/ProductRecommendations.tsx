import React from 'react';
import { Product } from '@/data/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductRecommendationsProps {
    products: Product[];
}

export function ProductRecommendations({ products }: ProductRecommendationsProps) {
    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-500">No product recommendations available.</p>
            </div>
        );
    }

    const getPriceRangeText = (range: string) => {
        switch (range) {
            case '$': return 'Under $20';
            case '$$': return '$20-$50';
            case '$$$': return 'Over $50';
            default: return '';
        }
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'cleanser': 'bg-blue-100 text-blue-700 border-blue-200',
            'moisturizer': 'bg-green-100 text-green-700 border-green-200',
            'treatment': 'bg-purple-100 text-purple-700 border-purple-200',
            'serum': 'bg-pink-100 text-pink-700 border-pink-200',
            'sunscreen': 'bg-amber-100 text-amber-700 border-amber-200'
        };
        return colors[category] || 'bg-slate-100 text-slate-700 border-slate-200';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-900">Personalized Product Matches</h3>
                    <p className="text-sm text-slate-500 mt-1">Curated for your specific skin type and concerns</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                    {products.length} Products
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white overflow-hidden">
                        <CardHeader className="pb-3 bg-slate-50/50">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getCategoryColor(product.category)}`}>
                                            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                            <span className="text-xs font-semibold text-slate-700">{product.rating}</span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-base leading-tight group-hover:text-primary transition-colors">
                                        {product.name}
                                    </CardTitle>
                                    <p className="text-xs text-slate-500 mt-0.5">{product.brand}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-xs font-bold text-primary">{product.priceRange}</div>
                                    <div className="text-[10px] text-slate-400">{getPriceRangeText(product.priceRange)}</div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-3 pt-4">
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="space-y-2">
                                <div>
                                    <p className="text-xs font-semibold text-slate-700 mb-1.5">Key Ingredients:</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {product.keyIngredients.map((ingredient, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20 font-medium"
                                            >
                                                {ingredient}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-slate-700 mb-1.5">Targets:</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {product.concerns.slice(0, 3).map((concern, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200"
                                            >
                                                {concern}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 text-xs h-8 border-slate-200 hover:bg-slate-50"
                                    onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(product.brand + ' ' + product.name)}`, '_blank')}
                                >
                                    <ExternalLink className="h-3 w-3 mr-1.5" />
                                    Learn More
                                </Button>
                                <Button
                                    size="sm"
                                    className="flex-1 text-xs h-8 bg-primary hover:bg-primary/90"
                                    onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(product.brand + ' ' + product.name + ' buy')}`, '_blank')}
                                >
                                    <ShoppingCart className="h-3 w-3 mr-1.5" />
                                    Find Retailers
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <p className="text-xs text-blue-900 leading-relaxed">
                    <strong>Disclaimer:</strong> These recommendations are generated based on your analysis results and general skincare knowledge. Always patch-test new products and consult a dermatologist if you have specific skin conditions or concerns.
                </p>
            </div>
        </div>
    );
}
