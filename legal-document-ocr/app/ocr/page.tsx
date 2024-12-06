'use client'

import { useState } from "react"
import { DocumentViewer } from "@/components/document-viewer"
import { OCREditor } from "@/components/ocr-editor"
import { uploadDocument, saveDocument } from "@/services/api"
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
    issuing_agency: null,
    recipients: "",
    recipient_address: "",
    signer: null,
    position: null,
    subject: "",
    content: "",
    page_numbers: []
  }
}

export default function OCRPage() {
  const [documentData, setDocumentData] = useState<DocumentData>(defaultDocumentData)
  const [processedDocuments, setProcessedDocuments] = useState<DocumentData[]>([])

  const handleFileUpload = async (file: File) => {
    try {
      const data = await uploadDocument(file)
      setProcessedDocuments(prevDocs => [...prevDocs, data as DocumentData])
      setDocumentData(data as DocumentData)
    } catch (error) {
      console.error('Error uploading document:', error)
    }
  }

  const handleSave = async (data: DocumentData) => {
    try {
      await saveDocument(data)
      // Update the processed documents list with the saved data
      setProcessedDocuments(prevDocs =>
          prevDocs.map(doc =>
              doc.metadata.document_id === data.metadata.document_id ? data : doc
          )
      )
    } catch (error) {
      console.error('Error saving document:', error)
    }
  }

  const handleSelectDocument = (selectedDoc: DocumentData) => {
    setDocumentData(selectedDoc)
  }

  return (
      <div className="grid grid-cols-2 gap-4">
        <DocumentViewer onFileUpload={handleFileUpload} />
        <OCREditor
            data={documentData}
            processedDocuments={processedDocuments}
            onSave={handleSave}
            onSelectDocument={handleSelectDocument}
        />
      </div>
  )
}

