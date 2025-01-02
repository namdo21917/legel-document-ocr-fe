import { DocumentList } from "@/components/document-list"

export default function DocumentsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Danh sách văn bản</h1>
      <DocumentList />
    </div>
  )
}

