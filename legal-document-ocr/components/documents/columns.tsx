"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DocumentData } from "@/types/document"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { documentService } from "@/services/document-service"
import { DocumentSheet } from "./document-sheet"
import { DocumentEditSheet } from "./document-edit-sheet"
import {useToast} from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ActionsProps {
  document: DocumentData;
  onRefresh: () => void;
}

const Actions = ({ document, onRefresh }: ActionsProps) => {
  const [openViewSheet, setOpenViewSheet] = useState(false)
  const [openEditSheet, setOpenEditSheet] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleView = async (doc: DocumentData) => {
    try {
      const result = await documentService.getDocument(doc.metadata.document_id)
      setSelectedDocument(result)
      setOpenViewSheet(true)
    } catch (error) {
      console.error('Error fetching document:', error)
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể tải thông tin văn bản"
      })
    }
  }

  const handleEdit = async (doc: DocumentData) => {
    try {
      const result = await documentService.getDocument(doc.metadata.document_id)
      setSelectedDocument(result)
      setOpenEditSheet(true)
    } catch (error) {
      console.error('Error fetching document:', error)
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể tải thông tin văn bản"
      })
    }
  }

  const handleSave = async (updatedDoc: DocumentData) => {
    try {
      setIsLoading(true)
      await documentService.updateDocument(updatedDoc.metadata.document_id, updatedDoc)
      toast({
        title: "Thành công",
        description: "Cập nhật văn bản thành công"
      })
      setOpenEditSheet(false)
      if (onRefresh) {
        onRefresh()
      }
    } catch (error) {
      console.error('Error updating document:', error)
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể cập nhật văn bản"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (documentId: string) => {
    try {
      setIsLoading(true)
      const result = await documentService.deleteDocument(documentId)
      if (result.isSuccess) {
        toast({
          title: "Thành công",
          description: "Xóa văn bản thành công"
        })
        if (onRefresh) {
          onRefresh()
        }
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Error deleting document:', error)
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể xóa văn bản"
      })
    } finally {
      setIsLoading(false)
      setOpenDeleteAlert(false)
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleView(document)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Xem chi tiết</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(document)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chỉnh sửa</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenDeleteAlert(true)}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Xóa</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <DocumentSheet 
        document={selectedDocument}
        open={openViewSheet}
        onOpenChange={setOpenViewSheet}
      />
      <DocumentEditSheet 
        document={selectedDocument}
        open={openEditSheet}
        onOpenChange={setOpenEditSheet}
        onSave={handleSave}
        isLoading={isLoading}
      />

      <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Văn bản sẽ bị xóa vĩnh viễn khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(document.metadata.document_id)}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? "Đang xóa..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export const columns: ColumnDef<DocumentData>[] = [
  {
    id: "documentType",
    accessorKey: "document_info.document_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loại văn bản
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "documentNumber",
    accessorKey: "document_info.document_number",
    header: "Số văn bản",
  },
  {
    id: "issueDate",
    accessorKey: "document_info.issue_date",
    header: "Ngày ban hành",
  },
  {
    id: "subject",
    accessorKey: "document_info.subject",
    header: "Chủ đề",
  },
  {
    id: "issuingAgency",
    accessorKey: "document_info.issuing_agency", 
    header: "Phòng/Ban ban hành",
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row, table }) => {
      const document = row.original
      const meta = table.options.meta as { onRefresh: () => void }
      return (
        <Actions
          document={document}
          onRefresh={meta?.onRefresh}
        />
      )
    }
  }
]