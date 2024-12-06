import {DocumentData, DocumentListParams} from "@/types/document";
import {getApiUrl} from "@/config/api";

// Custom error class for API errors
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      error.message || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
}

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(getApiUrl('/documents/'), {
    method: 'POST',
    body: formData,
    credentials: 'include', // For handling cookies if needed
  });
  
  return handleResponse(response);
}

export async function getDocuments(params: DocumentListParams) {
  const searchParams = new URLSearchParams();
  if (params.skip) searchParams.append('skip', params.skip.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.document_type) searchParams.append('document_type', params.document_type);
  
  const response = await fetch(getApiUrl(`/documents/?${searchParams.toString()}`), {
    credentials: 'include',
  });
  return handleResponse(response);
}

export async function saveDocument(data: DocumentData) {
  const response = await fetch(getApiUrl('/documents/save'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return handleResponse(response);
}

