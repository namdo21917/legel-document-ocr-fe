import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { DocumentData } from "@/types/document"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DocumentSheetProps {
  document: DocumentData | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocumentSheet({ document, open, onOpenChange }: DocumentSheetProps) {
  if (!document) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90vw] sm:max-w-[800px] h-full overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Chi tiết văn bản</SheetTitle>
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
                  <div className="p-2 border rounded-md mt-2">
                    {document.document_info.document_type}
                  </div>
                </div>
                <div>
                  <Label>Số văn bản</Label>
                  <div className="p-2 border rounded-md mt-2">
                    {document.document_info.document_number}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nơi ban hành</Label>
                  <div className="p-2 border rounded-md mt-2">
                    {document.document_info.issue_location}
                  </div>
                </div>
                <div>
                  <Label>Ngày ban hành</Label>
                  <div className="p-2 border rounded-md mt-2">
                    {document.document_info.issue_date}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Người nhận</Label>
                  <div className="p-2 border rounded-md mt-2">
                    {document.document_info.recipients}
                  </div>
                </div>
                <div>
                  <Label>Nơi nhận</Label>
                  <div className="p-2 border rounded-md mt-2">
                    {document.document_info.recipient_address}
                  </div>
                </div>
              </div>

              <div>
                <Label>Phòng/Ban ban hành</Label>
                <div className="p-2 border rounded-md mt-2">
                  {document.document_info.issuing_agency}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Người ký</Label>
                  <div className="p-2 border rounded-md mt-2">
                    {document.document_info.signer}
                  </div>
                </div>
                <div>
                  <Label>Vị trí</Label>
                  <div className="p-2 border rounded-md mt-2">
                    {document.document_info.position}
                  </div>
                </div>
                <div>
                  <Label>Ở trang</Label>
                  <div className="p-2 border rounded-md mt-2">
                    {document.document_info.page_numbers.join(', ')}
                  </div>
                </div>
              </div>

              <div>
                <Label>Chủ đề</Label>
                <div className="p-2 border rounded-md mt-2">
                  {document.document_info.subject}
                </div>
              </div>

              <div>
                <Label>Nội dung</Label>
                <div className="p-2 border rounded-md mt-2 min-h-[200px] whitespace-pre-wrap">
                  {document.document_info.content}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="full-text">
            <div className="p-2 border rounded-md min-h-[400px] whitespace-pre-wrap">
              {document.document_info.content}
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
} 