'use client'

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Upload} from 'lucide-react'
import {documentService} from "@/services/document-service";
import {DocumentData} from "@/types/document";

interface DocumentViewerProps {
    onFileUpload: (file: File) => void
    isLoading: boolean
    setProcessedDocuments: (processedDocuments: DocumentData[]) => void
}

export function DocumentViewer({onFileUpload}: DocumentViewerProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        let doc;
        if (file) {
            setSelectedFile(file)
            setSelectedFileName(file.name)
            onFileUpload(file)
            doc = documentService.uploadDocument(file)

        }
        console.log(doc);
    }

    const renderPreview = () => {
        if (!selectedFile) return null

        const fileType = selectedFile.type
        const fileUrl = URL.createObjectURL(selectedFile)

        if (fileType.startsWith('image/')) {
            return (
                <img
                    src={fileUrl}
                    alt="Document preview"
                    className="h-full w-full object-contain"
                />
            )
        } else if (fileType === 'application/pdf') {
            return (
                <iframe
                    src={fileUrl}
                    className="h-full w-full"
                    title="PDF preview"
                />
            )
        } else if (fileType === 'application/json') {
            return (
                <iframe
                    src={fileUrl}
                    className="h-full w-full"
                    title="JSON preview"
                />
            )
        } else {
            return (
                <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">Xem trước không khả dụng cho loại file này</p>
                </div>
            )
        }
    }

    return (
        <Card className="p-4">
            <div className="mb-4">
                <div className="mt-2">
                    <Button
                        asChild
                    >
                        <label>
                            <Input
                                id="file-upload"
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg,.tiff,.json"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Upload className="mr-2 h-4 w-4"/>
                            Choose file
                        </label>
                    </Button>
                    &nbsp;
                    {selectedFileName && (
                        <span className="text-sm text-muted-foreground">{selectedFileName}</span>
                    )}
                </div>
            </div>
            {selectedFile && (
                <div className="aspect-[3/4] w-full border rounded-lg overflow-hidden">
                    {renderPreview()}
                </div>
            )}
        </Card>
    )
}

