import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { DocumentData } from "@/types/document"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"

interface DocumentEditSheetProps {
  document: DocumentData | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (document: DocumentData) => void
  isLoading?: boolean
}

export function DocumentEditSheet({ document, open, onOpenChange, onSave, isLoading }: DocumentEditSheetProps) {
  const [editedDocument, setEditedDocument] = useState<DocumentData | null>(document)

  useEffect(() => {
    if (document) {
      setEditedDocument(document)
    }
  }, [document])

  if (!editedDocument) return null

  const handleChange = (field: string, value: string) => {
    setEditedDocument({
      ...editedDocument,
      document_info: {
        ...editedDocument.document_info,
        [field]: field === 'page_numbers' 
          ? value.split(',').map(num => parseInt(num.trim()))
          : value
      }
    })
  }

  const handleSave = () => {
    if (editedDocument) {
      onSave(editedDocument)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90vw] sm:max-w-[800px] h-full overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Chỉnh sửa văn bản</SheetTitle>
        </SheetHeader>
        
        <Tabs defaultValue="extracted">
          <TabsList>
            <TabsTrigger value="extracted">Thông tin</TabsTrigger>
            <TabsTrigger value="full-text">Văn bản</TabsTrigger>
          </TabsList>
          <TabsContent value="extracted">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Loại văn bản</Label>
                  <Input
                    value={editedDocument.document_info.document_type}
                    onChange={e => handleChange('document_type', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Số văn bản</Label>
                  <Input
                    value={editedDocument.document_info.document_number}
                    onChange={e => handleChange('document_number', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nơi ban hành</Label>
                  <Input
                    value={editedDocument.document_info.issue_location}
                    onChange={e => handleChange('issue_location', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Ngày ban hành</Label>
                  <Input
                    value={editedDocument.document_info.issue_date}
                    onChange={e => handleChange('issue_date', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Người nhận</Label>
                  <Input
                    value={editedDocument.document_info.recipients}
                    onChange={e => handleChange('recipients', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Nơi nhận</Label>
                  <Input
                    value={editedDocument.document_info.recipient_address}
                    onChange={e => handleChange('recipient_address', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>Phòng/Ban ban hành</Label>
                <Input
                  value={editedDocument.document_info.issuing_agency}
                  onChange={e => handleChange('issuing_agency', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Người ký</Label>
                  <Input
                    value={editedDocument.document_info.signer}
                    onChange={e => handleChange('signer', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Vị trí</Label>
                  <Input
                    value={editedDocument.document_info.position}
                    onChange={e => handleChange('position', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Ở trang</Label>
                  <Input
                    value={editedDocument.document_info.page_numbers.join(', ')}
                    onChange={e => handleChange('page_numbers', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>Chủ đề</Label>
                <Input
                  value={editedDocument.document_info.subject}
                  onChange={e => handleChange('subject', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Nội dung</Label>
                <Textarea
                  value={editedDocument.document_info.content}
                  onChange={e => handleChange('content', e.target.value)}
                  className="mt-2 min-h-[200px]"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="full-text">
            <Textarea
              value={editedDocument.document_info.content}
              onChange={e => handleChange('content', e.target.value)}
              className="min-h-[400px]"
            />
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
} 