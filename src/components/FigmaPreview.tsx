
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface FigmaPreviewProps {
  data: {
    name: string;
    lastModified: string;
    thumbnail: string;
    components: number;
    pages: number;
  };
}

export const FigmaPreview: React.FC<FigmaPreviewProps> = ({ data }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">Design Preview</h3>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/5">
              {data.thumbnail ? (
                <img 
                  src={data.thumbnail} 
                  alt="Design Thumbnail" 
                  className="w-full h-auto rounded-md shadow-sm object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=No+Preview";
                  }}
                />
              ) : (
                <Skeleton className="w-full h-48 rounded-md" />
              )}
            </div>
            <div className="w-full md:w-3/5 space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Name</h4>
                <p className="font-medium">{data.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Last Modified</h4>
                <p>{data.lastModified}</p>
              </div>
              <div className="flex gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Pages</h4>
                  <p>{data.pages}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Components</h4>
                  <p>{data.components}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
