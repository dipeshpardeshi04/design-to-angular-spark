import React, { useState } from "react";
import { Download, Eye } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

const Index = () => {
  const [fileId, setFileId] = useState("");
  const [pageName, setPageName] = useState("");
  const [zipBlob, setZipBlob] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const generateAngularCode = async () => {
    if (!fileId || !pageName) {
      toast.error("Please enter both File ID and Page Name.");
      return;
    }

    setIsGenerating(true);
    setZipBlob(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/generate-angular-code/?file_id=${fileId}&page=${pageName}`
      );

      if (!response.ok) {
        throw new Error("Failed to generate code");
      }

      const blob = await response.blob();
      setZipBlob(blob);
      toast.success("Angular code ready. Download now!");
    } catch (error) {
      toast.error("Error generating Angular code.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadZip = () => {
    if (zipBlob) {
      downloadBlob(zipBlob, "angular_code.zip");
      toast.success("Download started!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Figma to Angular Converter
          </h1>
          <p className="text-lg text-gray-600">
            Paste your File ID and Page Name to generate Angular code
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Enter Your Design Details</CardTitle>
            <CardDescription>
              Provide the Figma file ID and the specific page name
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              placeholder="Figma File ID"
              value={fileId}
              onChange={(e) => setFileId(e.target.value)}
            />
            <Input
              placeholder="Page Name"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
            />
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between pt-4 border-t">
            <Button onClick={generateAngularCode} disabled={isGenerating}>
              {isGenerating ? <LoadingSpinner /> : "Generate"}
            </Button>

            <Button
              variant="secondary"
              onClick={downloadZip}
              disabled={!zipBlob}
              className="flex gap-2 items-center"
            >
              <Download className="h-4 w-4" />
              Download ZIP
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
