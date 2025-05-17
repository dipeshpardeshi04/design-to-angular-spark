
import React, { useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FigmaPreview } from "@/components/FigmaPreview";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Index = () => {
  const [figmaUrl, setFigmaUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [figmaData, setFigmaData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);

  // Placeholder function to fetch Figma data
  const fetchFigmaData = async () => {
    if (!figmaUrl) {
      toast.error("Please enter a Figma URL");
      return;
    }

    setIsLoading(true);
    setHasError(false);
    setFigmaData(null);
    setIsDownloadReady(false);

    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This would be replaced with actual API call
      const mockData = {
        name: "Sample Figma Design",
        lastModified: "2023-05-17",
        thumbnail: "https://cdn.dribbble.com/userupload/4789321/file/original-b1076f71ab42f5ea91ef16cde23afc05.png?compress=1&resize=752x",
        components: 12,
        pages: 3
      };
      
      setFigmaData(mockData);
      toast.success("Figma data loaded successfully");
    } catch (error) {
      console.error("Error fetching Figma data:", error);
      setHasError(true);
      toast.error("Failed to load Figma data");
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder function to generate Angular code
  const generateAngularCode = async () => {
    if (!figmaData) {
      toast.error("Please fetch Figma data first");
      return;
    }

    setIsGenerating(true);
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setIsDownloadReady(true);
      toast.success("Angular code generated successfully");
    } catch (error) {
      console.error("Error generating Angular code:", error);
      toast.error("Failed to generate Angular code");
    } finally {
      setIsGenerating(false);
    }
  };

  // Placeholder function to download ZIP file
  const downloadZip = () => {
    toast.success("Starting download...");
    // This would trigger the actual download in a real implementation
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Figma to Angular Converter</h1>
          <p className="text-xl text-gray-600">Transform your Figma designs into Angular code with one click</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Convert Your Design</CardTitle>
            <CardDescription>
              Paste your Figma file URL below to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="https://www.figma.com/file/..."
                value={figmaUrl}
                onChange={(e) => setFigmaUrl(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                onClick={fetchFigmaData}
                disabled={isLoading || !figmaUrl}
                className="whitespace-nowrap"
              >
                {isLoading ? <LoadingSpinner /> : "Fetch Design"}
              </Button>
            </div>

            {hasError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
                Error loading Figma data. Please check your URL and try again.
              </div>
            )}

            {figmaData && <FigmaPreview data={figmaData} />}
          </CardContent>
          
          {figmaData && (
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between border-t pt-6">
              <Button
                onClick={generateAngularCode}
                disabled={isGenerating || isDownloadReady}
                className="w-full sm:w-auto"
              >
                {isGenerating ? <LoadingSpinner /> : "Generate Angular Code"}
              </Button>
              
              {isDownloadReady && (
                <Button 
                  variant="secondary" 
                  onClick={downloadZip}
                  className="w-full sm:w-auto flex gap-2 items-center"
                >
                  <Download className="h-4 w-4" />
                  Download ZIP
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;
