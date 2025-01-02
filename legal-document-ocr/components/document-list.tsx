'use client'

import {useEffect, useState} from 'react'
import type {DocumentData} from "@/types/document"
import {documentService} from "@/services/document-service"
import {columns} from "./documents/columns"
import {DataTable} from "./documents/data-table"
import {useToast} from "@/hooks/use-toast";

export function DocumentList() {
    const [documents, setDocuments] = useState<DocumentData[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        fetchDocuments()
    }, [fetchDocuments])

    const fetchDocuments = async (value?: string) => {
        try {
            setIsLoading(true)
            const response = await documentService.getDocuments({
                skip: 0,
                limit: 100,
                document_type: value
            })
            setDocuments(response)
        } catch (error) {
            console.error('Error fetching documents:', error)
            toast({
                variant: "destructive",
                title: "Lỗi",
                description: "Không thể tải danh sách văn bản"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleRefresh = () => {
        fetchDocuments()
    }

    return (
        <div>
            <DataTable 
                columns={columns} 
                data={documents} 
                onFilter={fetchDocuments}
                isLoading={isLoading}
                onRefresh={handleRefresh}
            />
        </div>
    )
}

