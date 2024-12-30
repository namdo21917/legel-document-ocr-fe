'use client'

import {useEffect, useState} from 'react'
import type {DocumentData} from "@/types/document"
import {documentService} from "@/services/document-service"
import {columns} from "./documents/columns"
import {DataTable} from "./documents/data-table"

export function DocumentList() {
    const [documents, setDocuments] = useState<DocumentData[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchDocuments()
    }, [])

    const fetchDocuments = async (value?: string) => {
        try {
            setIsLoading(true)
            const response = await documentService.getDocuments({
                skip: 0,
                limit: 100, // Có thể điều chỉnh limit tùy nhu cầu
                document_type: value
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
            <DataTable columns={columns} data={documents} onFilter={fetchDocuments} isLoading={isLoading}/>
        </div>
    )
}

