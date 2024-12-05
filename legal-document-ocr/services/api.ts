import {DocumentData, DocumentListParams} from "@/types/document";

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/v1/documents/', {
    method: 'POST',
    body: formData,
  });
  
  return response.json();
}

export async function getDocuments(params: DocumentListParams) {
  const searchParams = new URLSearchParams();
  if (params.skip) searchParams.append('skip', params.skip.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.document_type) searchParams.append('document_type', params.document_type);
  
  const response = await fetch(`/api/v1/documents/?${searchParams.toString()}`);
  return response.json();
}

export async function saveDocument(data: DocumentData) {
  const response = await fetch('/api/v1/documents/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return response.json();
}

