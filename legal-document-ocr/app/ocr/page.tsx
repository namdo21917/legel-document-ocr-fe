'use client'

import { useState } from "react"
import { DocumentViewer } from "@/components/document-viewer"
import { OCREditor } from "@/components/ocr-editor"
import { documentService } from "@/services/document-service"
import type { DocumentData } from "@/types/document"

const defaultDocumentData: DocumentData = {
  metadata: {
    document_id: "",
    extraction_time: "",
    version: ""
  },
  document_info: {
    document_type: "",
    document_number: "",
    issue_location: "",
    issue_date: "",
    issuing_agency: '',
    recipients: "",
    recipient_address: "",
    signer: '',
    position: '',
    subject: "",
    content: "",
    page_numbers: []
  }
}

export default function OCRPage() {
  const [documentData, setDocumentData] = useState<DocumentData>(defaultDocumentData)
  const [processedDocuments, setProcessedDocuments] = useState<DocumentData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true)
      const documents = await documentService.uploadDocument(file)
      setProcessedDocuments(documents)
      if (documents.length > 0) {
        setDocumentData(documents[0])
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (data: DocumentData) => {
    try {
      setIsLoading(true)
      const savedDocument = await documentService.saveDocument(data)
      setProcessedDocuments(prevDocs =>
        prevDocs.map(doc =>
          doc.metadata.document_id === savedDocument.metadata.document_id 
            ? savedDocument 
            : doc
        )
      )

    } catch (error) {
       console.log(error);

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 h-[calc(100vh-2rem)] p-4">
      <DocumentViewer onFileUpload={handleFileUpload} isLoading={isLoading} setProcessedDocuments={setProcessedDocuments} />
      <OCREditor
        data={documentData}
        processedDocuments={processedDocuments}
        onSave={handleSave}
        onSelectDocument={setDocumentData}
        isLoading={isLoading}
      />
    </div>
  )
}

