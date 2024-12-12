'use client'

import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import type {DocumentData} from "@/types/document"
import {CircleCheckBig} from "lucide-react";

interface OCREditorProps {
    data: DocumentData
    processedDocuments: DocumentData[]
    onSave: (data: DocumentData) => void
    onSelectDocument: (document: DocumentData) => void
    isLoading: boolean
}

export function OCREditor({
                              data,
                              processedDocuments,
                              onSave,
                              onSelectDocument,
                              isLoading
                          }: OCREditorProps) {
    const [documentData, setDocumentData] = useState<DocumentData>(data)

    useEffect(() => {
        setDocumentData(data)
    }, [data])

    const handleChange = (field: string, value: string) => {
        setDocumentData(prev => ({
            ...prev,
            document_info: {
                ...prev.document_info,
                [field]: value
            }
        }))
    }
    console.log(processedDocuments);
    return (
        <Card className="h-full flex flex-col">
            <div className="p-4 border-b">
                <h3 className="text-lg font-semibold mb-2">Processed Documents</h3>
                <div className="overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Loại văn bản</TableHead>
                                <TableHead>Số văn bản</TableHead>
                                <TableHead>Chủ đề</TableHead>
                                <TableHead>Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {processedDocuments.map((doc) => (
                                <TableRow
                                    key={doc.metadata.document_id}
                                    className={doc.metadata.document_id === documentData.metadata.document_id ? 'font-bold' : ''}
                                    onClick={() => onSelectDocument(doc)}
                                >
                                    <TableCell>{doc.document_info.document_type}</TableCell>
                                    <TableCell>{doc.document_info.document_number}</TableCell>
                                    <TableCell>{doc.document_info.subject}</TableCell>
                                    <TableCell>
                                        {doc.metadata.document_id === documentData.metadata.document_id ?
                                            <CircleCheckBig/> : <></>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-auto">
                <Tabs defaultValue="extracted">
                    <TabsList>
                        <TabsTrigger value="extracted">Thông tin</TabsTrigger>
                        <TabsTrigger value="full-text">Văn bản</TabsTrigger>
                    </TabsList>
                    <TabsContent value="extracted">
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="document_type">Loại văn bản</Label>
                                    <Input
                                        id="document_type"
                                        value={documentData.document_info.document_type}
                                        onChange={e => handleChange('document_type', e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="document_number">Số văn bản</Label>
                                    <Input
                                        id="document_number"
                                        value={documentData.document_info.document_number}
                                        onChange={e => handleChange('document_number', e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="issue_location">Nơi ban hành</Label>
                                    <Input
                                        id="issue_location"
                                        value={documentData.document_info.issue_location}
                                        onChange={e => handleChange('issue_location', e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="issue_date">Ngày ban hành</Label>
                                    <Input
                                        id="issue_date"
                                        value={documentData.document_info.issue_date}
                                        onChange={e => handleChange('issue_date', e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="recipients">Người nhận</Label>
                                    <Input
                                        id="recipients"
                                        value={documentData.document_info.recipients}
                                        onChange={e => handleChange('recipients', e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="recipient_address">Nơi nhận</Label>
                                    <Input
                                        id="recipient_address"
                                        value={documentData.document_info.recipient_address}
                                        onChange={e => handleChange('recipient_address', e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="issuing_agency">Phòng/Ban ban hành</Label>
                                <Input
                                    id="issuing_agency"
                                    value={documentData.document_info.issuing_agency}
                                    onChange={e => handleChange('issuing_agency', e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4">

                                <div>
                                    <Label htmlFor="signer">Người ký</Label>
                                    <Input
                                        id="signer"
                                        value={documentData.document_info.recipients}
                                        onChange={e => handleChange('signer', e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="position">Vị trí</Label>
                                    <Input
                                        id="position"
                                        value={documentData.document_info.position}
                                        onChange={e => handleChange('position', e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="page_numbers">Ở trang</Label>
                                    <Input
                                        id="page_numbers"
                                        value={documentData.document_info.page_numbers.map(number => number.toString())}
                                        onChange={e => handleChange('page_numbers', e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="subject">Chủ đề</Label>
                                <Input
                                    id="subject"
                                    value={documentData.document_info.subject}
                                    onChange={e => handleChange('subject', e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>


                            <div>
                                <Label htmlFor="content">Nội dung</Label>
                                <Textarea
                                    id="content"
                                    value={documentData.document_info.content}
                                    onChange={e => handleChange('content', e.target.value)}
                                    className="min-h-[200px]"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="full-text">
                        <Textarea
                            value={documentData.document_info.content}
                            onChange={e => handleChange('content', e.target.value)}
                            className="min-h-[400px]"
                            disabled={isLoading}
                        />
                    </TabsContent>
                </Tabs>
                <Button
                    className="mt-4"
                    onClick={() => onSave(documentData)}
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </Card>
    )
}

