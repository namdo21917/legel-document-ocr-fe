export interface DocumentMetadata {
    document_id: string;
    extraction_time: string;
    version: string;
}

export interface DocumentInfo {
    document_type: string;
    document_number: string;
    issue_location: string;
    issue_date: string;
    issuing_agency: string;
    recipients: string;
    recipient_address: string;
    signer: string;
    position: string;
    subject: string;
    content: string;
    page_numbers: number[];
}

export interface DocumentData {
    metadata: DocumentMetadata;
    document_info: DocumentInfo;
}

export interface DocumentListParams {
    skip?: number;
    limit?: number;
    document_type?: string;
}

export interface DocumentResponse {
    documents: DocumentData[];
}

export interface DocumentDeleteResponse{
    isSuccess: boolean;
    message: string;
    document_id: string;
}

