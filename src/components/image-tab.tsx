
"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Loader2, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { generateImage } from '@/ai/flows/generate-image';

export function ImageTab() {
    const { toast } = useToast();
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [referenceImage, setReferenceImage] = useState<string | null>(null);
    const [referenceImageType, setReferenceImageType] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) { // 4MB limit
                toast({
                    variant: "destructive",
                    title: "File too large",
                    description: "Please select an image smaller than 4MB.",
                });
                return;
            }
            setReferenceImageType(file.type);
            const reader = new FileReader();
            reader.onloadend = () => {
                setReferenceImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast({
                variant: "destructive",
                title: "Prompt is empty",
                description: "Please enter a description for the image you want to generate.",
            });
            return;
        }

        setLoading(true);
        setGeneratedImage(null);

        try {
            const result = await generateImage({
                prompt,
                referenceImageDataUri: referenceImage
            });
            setGeneratedImage(result.imageDataUri);
        } catch (error: any) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Image Generation Failed",
                description: "Something went wrong while generating the image. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline">AI Image Generator</CardTitle>
                    <CardDescription>Describe the image you want to create. You can also provide a reference image.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col gap-4">
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="prompt">Your Prompt</Label>
                        <Textarea
                            id="prompt"
                            placeholder="e.g., 'A futuristic cityscape at sunset, cinematic lighting'"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="min-h-[120px]"
                            disabled={loading}
                        />
                    </div>
                    <div className="grid w-full gap-1.5">
                        <Label>Reference Image (Optional)</Label>
                        <div 
                            className="relative flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Input 
                                ref={fileInputRef}
                                type="file" 
                                className="hidden" 
                                onChange={handleFileChange}
                                accept="image/png, image/jpeg"
                                disabled={loading}
                            />
                            {referenceImage ? (
                                <>
                                    <Image src={referenceImage} alt="Reference" layout="fill" objectFit="contain" className="rounded-lg p-2" />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-7 w-7"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setReferenceImage(null);
                                            setReferenceImageType(null);
                                            if(fileInputRef.current) fileInputRef.current.value = "";
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </>
                            ) : (
                                <div className="text-center text-muted-foreground">
                                    <UploadCloud className="mx-auto h-8 w-8 mb-2" />
                                    <p>Click to upload or drag & drop</p>
                                    <p className="text-xs">PNG, JPG up to 4MB</p>
                                </div>
                            )}
                        </div>
                    </div>
                     <Button onClick={handleGenerate} disabled={loading} className="w-full mt-auto bg-primary hover:bg-primary/90">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Generate Image
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Generated Image</CardTitle>
                    <CardDescription>Your generated image will appear here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative flex items-center justify-center w-full aspect-square rounded-lg border bg-secondary/50 overflow-hidden">
                        {loading ? (
                            <div className="text-center">
                                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                                <p className="mt-4 text-muted-foreground">Generating your image...</p>
                            </div>
                        ) : generatedImage ? (
                            <Image src={generatedImage} alt="Generated image" layout="fill" objectFit="contain" />
                        ) : (
                            <div className="text-center text-muted-foreground">
                                <Sparkles className="mx-auto h-12 w-12" />
                                <p className="mt-4">Your image will appear here.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
