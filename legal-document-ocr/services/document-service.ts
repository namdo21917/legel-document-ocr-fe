import { httpClient } from '@/lib/http-client';
import { DocumentData, DocumentListParams, DocumentResponse } from '@/types/document';

export class DocumentService {
  private static instance: DocumentService;
  
  private constructor() {}
  
  public static getInstance(): DocumentService {
    if (!DocumentService.instance) {
      DocumentService.instance = new DocumentService();
    }
    return DocumentService.instance;
  }

  public async uploadDocument(file: File): Promise<DocumentData[]> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await httpClient.post<DocumentResponse | DocumentResponse[]>('/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return this.mapDocumentResponse(response);
  }

  public async getDocuments(params: DocumentListParams): Promise<DocumentData[]> {
    const response = await httpClient.get<DocumentResponse | DocumentResponse[]>('/documents/', {
      params,
    });

    return this.mapDocumentResponse(response);
  }

  public async saveDocument(data: DocumentData): Promise<DocumentData> {
    const response = await httpClient.post<DocumentResponse>('/documents/save', data);
    const mappedResponse = this.mapDocumentResponse(response);
    return mappedResponse[0];
  }

  private mapDocumentResponse(response: DocumentResponse | DocumentResponse[]): DocumentData[] {
    const documents = Array.isArray(response) ? response : [response];
    
    return documents.map(doc => ({
      metadata: {
        document_id: doc.id || '',
        extraction_time: doc.extraction_time || new Date().toISOString(),
        version: doc.version || '1.0',
      },
      document_info: {
        document_type: doc.document_type || '',
        document_number: doc.document_number || '',
        issue_location: doc.issue_location || '',
        issue_date: doc.issue_date || '',
        issuing_agency: doc.issuing_agency || null,
        recipients: doc.recipients || '',
        recipient_address: doc.recipient_address || '',
        signer: doc.signer || null,
        position: doc.position || null,
        subject: doc.subject || '',
        content: doc.content || '',
        page_numbers: doc.page_numbers || [],
      },
    }));
  }
}

export const documentService = DocumentService.getInstance(); 