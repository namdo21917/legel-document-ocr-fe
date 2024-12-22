'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DocumentData } from "@/types/document"
import { documentService } from "@/services/document-service"
import { columns } from "./documents/columns"
import { DataTable } from "./documents/data-table"

export function DocumentList() {
  const [documents, setDocuments] = useState<DocumentData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      setIsLoading(true)
      const response = await documentService.getDocuments({
        skip: 0,
        limit: 100, // Có thể điều chỉnh limit tùy nhu cầu
      })
      setDocuments(response)
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
   <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">Đang tải...</div>
        ) : (
          <DataTable columns={columns} data={documents} />
        )}
   </div>
  )
}

