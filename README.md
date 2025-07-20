# Legal Document OCR System

A specialized OCR (Optical Character Recognition) system designed for recognizing and processing legal documents. The application is built with Next.js and ShadcnUI, providing a modern user interface and smooth user experience.

## Key Features

- **Intelligent OCR**: High-accuracy text recognition from legal document images
- **Document Management**: Store, search, and manage OCR-processed documents
- **Content Editing**: Intuitive editing interface for correcting OCR results
- **Document Preview**: Side-by-side display of original documents and OCR results
- **Document Classification**: Automatic classification of different legal document types
- **Data Export**: Support for exporting results in multiple formats

## Technology Stack

### Frontend Framework
- **Next.js**: `14.2.16` - React framework with SSR and App Router
- **React**: `^18` - UI component library
- **TypeScript**: `^5` - Programming language with type safety

### UI Components & Styling
- **ShadcnUI**: Modern UI component system
- **Radix UI**: `^1.1.x` - Unstyled primitive components
- **Tailwind CSS**: `^3.4.1` - Utility-first CSS framework
- **Lucide React**: `^0.465.0` - Icon library

### State Management & Data Fetching
- **TanStack Table**: `^8.20.6` - Powerful table component
- **Axios**: `^1.6.0` - HTTP client for API calls

### Development Tools
- **ESLint**: `^8` - Code linting
- **PostCSS**: `^8` - CSS processing
- **Docker**: Containerization support

## Project Structure

```
legal-document-ocr/
├── app/                          # Next.js App Router
│   ├── documents/               # Document management pages
│   ├── ocr/                     # Main OCR page
│   ├── fonts/                   # Custom fonts
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # React components
│   ├── ui/                      # ShadcnUI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   └── ...
│   ├── documents/               # Document-related components
│   │   ├── columns.tsx          # Table columns definition
│   │   ├── data-table.tsx       # Data table component
│   │   ├── document-edit-sheet.tsx
│   │   └── document-sheet.tsx
│   ├── document-list.tsx        # Document listing component
│   ├── document-viewer.tsx      # Document viewer component
│   ├── navbar.tsx               # Navigation bar
│   └── ocr-editor.tsx           # OCR editor component
├── config/                      # Configuration files
│   └── api.ts                   # API configuration
├── hooks/                       # Custom React hooks
│   └── use-toast.ts             # Toast notification hook
├── lib/                         # Utility libraries
│   ├── http-client.ts           # HTTP client setup
│   └── utils.ts                 # Utility functions
├── services/                    # API services
│   └── document-service.ts      # Document API service
├── types/                       # TypeScript type definitions
│   └── document.ts              # Document-related types
├── docker-compose.yml           # Docker compose configuration
├── Dockerfile                   # Docker configuration
└── package.json                 # Dependencies and scripts
```

## System Requirements

- **Node.js**: >= 18.0.0
- **npm/yarn**: Latest version
- **Docker** (optional): For containerized deployment

## Installation

### 1. Clone repository

```bash
git clone <repository-url>
cd legal-document-ocr
```

### 2. Install dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Environment configuration

Create `.env.local` file and configure necessary environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=30000

# Other configurations...
```

## Running the Application

### Development mode

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

The application will run at `http://localhost:3000`

### Production build

```bash
# Build the application
npm run build

# Run production server
npm run start
```

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or just run
docker-compose up
```

## Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Build application for production
- `npm run start` - Run production server
- `npm run lint` - Run ESLint for code checking

## Usage Guide

### 1. Upload Documents
- Access the OCR page
- Upload legal document images
- The system will automatically recognize and extract text

### 2. Edit Results
- Use OCR Editor to correct results
- Update document metadata information
- Save documents to the system

### 3. Document Management
- View list of processed documents
- Search by document type, date
- Edit or delete documents

## API Integration

The system integrates with backend API for:
- Upload and process OCR documents
- Store and retrieve document data
- Manage metadata and classification

For detailed API endpoints, refer to `services/document-service.ts`

## UI Components

Built with ShadcnUI components and Tailwind CSS:
- **Button**: Action buttons with multiple variants
- **Card**: Content containers
- **Table**: Data display in tabular format
- **Sheet**: Side panels for forms and details
- **Toast**: User notifications
- **Dialog**: Modal dialogs

## Customization

### Adding new components
```bash
npx shadcn-ui@latest add [component-name]
```

### Theme customization
Edit `tailwind.config.ts` file to change colors and theme

### Adding API services
Create new services in `services/` directory following existing patterns

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request


## Contact

- **Project Link**: [Repository URL]
- **Documentation**: [Docs URL]
- **Issues**: [Issues URL]

---

**Note**: This is a specialized OCR system for legal documents. Please ensure compliance with security and privacy regulations when processing documents.
