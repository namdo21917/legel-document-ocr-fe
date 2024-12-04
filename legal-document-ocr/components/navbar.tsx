import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Upload } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="font-semibold">
          OCR Service
        </Link>
        <div className="ml-6 flex gap-4">
          <Link href="/ocr">OCR</Link>
          <Link href="/documents">Documents</Link>
        </div>
        <div className="ml-auto">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload File
          </Button>
        </div>
      </div>
    </nav>
  )
}

