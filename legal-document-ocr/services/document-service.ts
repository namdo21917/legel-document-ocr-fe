import {httpClient} from '@/lib/http-client';
import {DocumentData, DocumentListParams, DocumentResponse, DocumentDeleteResponse} from '@/types/document';

export class DocumentService {
    private static instance: DocumentService;

    private constructor() {
    }

    public static getInstance(): DocumentService {
        if (!DocumentService.instance) {
            DocumentService.instance = new DocumentService();
        }
        return DocumentService.instance;
    }

    public async uploadDocument(file: File): Promise<DocumentData[]> {
        const formData = new FormData();
        formData.append('file', file);

        console.log('Uploading to endpoint: /documents/');

        const response = await httpClient.post<DocumentResponse>('/documents/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("docs", response)
        console.log("mapped :", this.mapDocumentResponse(response));
        return this.mapDocumentResponse(response);

    }

    public async getDocuments(params: DocumentListParams): Promise<DocumentData[]> {
        const response = await httpClient.get<DocumentData[]>('/documents/', {
            params,
        });

        return this.mapDocumentResponses(response);
    }

    public async saveDocuments(documents: DocumentData[]): Promise<DocumentData[]> {
        const response = await httpClient.post<DocumentResponse>('/documents/save', {
            documents: documents
        });
        return this.mapDocumentResponse(response);
    }

    public async getDocument(documentId: string): Promise<DocumentData> {
        const response = await httpClient.get<DocumentData>(`/documents/${documentId}`);
        return response;
    }

    public async updateDocument(documentId: string, data: DocumentData): Promise<DocumentData> {
        const response = await httpClient.put<DocumentData>(`/documents/${documentId}`, data);
        return response;
    }

    public async deleteDocument(documentId: string): Promise<DocumentDeleteResponse> {
        const response = await httpClient.delete<DocumentDeleteResponse>(`/documents/${documentId}/delete`);
        return response;
    }

    private mapDocumentResponse(response: DocumentResponse): DocumentData[] {
        console.log("in map function: ", response)
        return response.documents.map(doc => ({
            metadata: {
                document_id: doc.metadata.document_id || '',
                extraction_time: doc.metadata.extraction_time || new Date().toISOString(),
                version: doc.metadata.version || '1.0',
            },
            document_info: {
                document_type: doc.document_info.document_type || '',
                document_number: doc.document_info.document_number || '',
                issue_location: doc.document_info.issue_location || '',
                issue_date: doc.document_info.issue_date || '',
                issuing_agency: doc.document_info.issuing_agency || '',
                recipients: doc.document_info.recipients || '',
                recipient_address: doc.document_info.recipient_address || '',
                signer: doc.document_info.signer || '',
                position: doc.document_info.position || '',
                subject: doc.document_info.subject || '',
                content: doc.document_info.content || '',
                page_numbers: doc.document_info.page_numbers || [],
            },
        }))

    }

    private mapDocumentResponses(response: DocumentData[]): DocumentData[] {
        console.log("in map function: ", response)
        return response.map(doc => ({
            metadata: {
                document_id: doc.metadata.document_id || '',
                extraction_time: doc.metadata.extraction_time || new Date().toISOString(),
                version: doc.metadata.version || '1.0',
            },
            document_info: {
                document_type: doc.document_info.document_type || '',
                document_number: doc.document_info.document_number || '',
                issue_location: doc.document_info.issue_location || '',
                issue_date: doc.document_info.issue_date || '',
                issuing_agency: doc.document_info.issuing_agency || '',
                recipients: doc.document_info.recipients || '',
                recipient_address: doc.document_info.recipient_address || '',
                signer: doc.document_info.signer || '',
                position: doc.document_info.position || '',
                subject: doc.document_info.subject || '',
                content: doc.document_info.content || '',
                page_numbers: doc.document_info.page_numbers || [],
            },
        }))

    }
}

export const documentService = DocumentService.getInstance();