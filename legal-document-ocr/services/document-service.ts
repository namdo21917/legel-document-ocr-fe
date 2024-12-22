import {httpClient} from '@/lib/http-client';
import {DocumentData, DocumentListParams, DocumentResponse} from '@/types/document';

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
        const response = await httpClient.get<DocumentResponse>('/documents/', {
            params,
        });

        return this.mapDocumentResponse(response);
    }

    public async saveDocuments(documents: DocumentData[]): Promise<DocumentData[]> {
        const response = await httpClient.post<DocumentResponse>('/documents/save', {
            documents: documents
        });
        return this.mapDocumentResponse(response);
    }

    private mapDocumentResponse(response: DocumentResponse): DocumentData[] {
        const documents = response;
        console.log("in map function: ", documents)
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
}

export const documentService = DocumentService.getInstance();