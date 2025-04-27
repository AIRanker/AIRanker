export type FileUploader = (data: {
  file: string
  fileName: string
}) => Promise<{ success: boolean; url?: string; message?: string }>
