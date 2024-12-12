'use client'

import {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import type {DocumentData} from "@/types/document"
import {documentService} from "@/services/document-service";

export function DocumentList() {
  const [documents, setDocuments] = useState<DocumentData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10

  useEffect(() => {
    fetchDocuments()
  }, [currentPage])

  const fetchDocuments = async () => {
    try {
      const response = await documentService.getDocuments({
        skip: (currentPage - 1) * limit,
        limit: limit,
      })
      setDocuments(response)
      setTotalPages(Math.ceil(response.length / limit))
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Type</TableHead>
              <TableHead>Document Number</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Issue Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.metadata.document_id}>
                <TableCell>{doc.document_info.document_type}</TableCell>
                <TableCell>{doc.document_info.document_number}</TableCell>
                <TableCell>{doc.document_info.issue_date}</TableCell>
                <TableCell>{doc.document_info.issue_location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

