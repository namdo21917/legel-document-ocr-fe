import { DocumentList } from "@/components/document-list"

export default function DocumentsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Document List</h1>
      <DocumentList />
    </div>
  )
}

