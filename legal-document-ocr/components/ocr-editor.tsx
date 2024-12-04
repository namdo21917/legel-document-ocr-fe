'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DocumentData } from "@/types/document"

interface OCREditorProps {
  data: DocumentData
  onSave: (data: DocumentData) => void
}

export function OCREditor({ data, onSave }: OCREditorProps) {
  const [documentData, setDocumentData] = useState<DocumentData>(data)

  const handleChange = (field: string, value: string) => {
    setDocumentData(prev => ({
      ...prev,
      document_info: {
        ...prev.document_info,
        [field]: value
      }
    }))
  }

  return (
    <Card className="p-4">
      <Tabs defaultValue="extracted">
        <TabsList>
          <TabsTrigger value="extracted">Extracted</TabsTrigger>
          <TabsTrigger value="full-text">Full text</TabsTrigger>
        </TabsList>
        <TabsContent value="extracted">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="document_type">Document Type</Label>
                <Input
                  id="document_type"
                  value={documentData.document_info.document_type}
                  onChange={e => handleChange('document_type', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="document_number">Document Number</Label>
                <Input
                  id="document_number"
                  value={documentData.document_info.document_number}
                  onChange={e => handleChange('document_number', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issue_location">Issue Location</Label>
                <Input
                  id="issue_location"
                  value={documentData.document_info.issue_location}
                  onChange={e => handleChange('issue_location', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="issue_date">Issue Date</Label>
                <Input
                  id="issue_date"
                  value={documentData.document_info.issue_date}
                  onChange={e => handleChange('issue_date', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={documentData.document_info.content}
                onChange={e => handleChange('content', e.target.value)}
                className="min-h-[200px]"
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="full-text">
          <Textarea
            value={documentData.document_info.content}
            onChange={e => handleChange('content', e.target.value)}
            className="min-h-[400px]"
          />
        </TabsContent>
      </Tabs>
      <Button className="mt-4" onClick={() => onSave(documentData)}>
        Save
      </Button>
    </Card>
  )
}

