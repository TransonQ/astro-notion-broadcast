export interface FileObject {
  type: string
  name?: string
  external?: External
  file?: File
}

interface External {
  url: string
}

interface File {
  url: string
  expiry_time: string
}
