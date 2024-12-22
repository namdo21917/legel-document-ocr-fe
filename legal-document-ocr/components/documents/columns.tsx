"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DocumentData } from "@/types/document"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<DocumentData>[] = [
  {
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
    accessorKey: "document_info.document_number",
    header: "Số văn bản",
  },
  {
    accessorKey: "document_info.issue_date",
    header: "Ngày ban hành",
  },
  {
    accessorKey: "document_info.subject",
    header: "Chủ đề",
  },
  {
    accessorKey: "document_info.issuing_agency", 
    header: "Phòng/Ban ban hành",
  }
] 