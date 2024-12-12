import Link from "next/link"

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
      </div>
    </nav>
  )
}

