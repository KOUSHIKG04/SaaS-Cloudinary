# Cloudinary SaaS Platform

A modern web application for video compression and image transformation using Cloudinary's powerful media management capabilities. This platform allows users to upload, compress, and transform media files with ease.

## Features

### Video Compression

- Upload and compress videos with significant size reduction
- Real-time compression statistics
- Video preview with duration
- Download compressed videos
- Responsive video cards with modern UI
- Compression percentage display
- Original vs Compressed size comparison

### Image Transformation

- Upload and transform images for different social media platforms
- Support for multiple aspect ratios:
  - Instagram Square (1:1)
  - Instagram Portrait (4:5)
  - X Post (Twitter) (16:9)
  - X Header (Twitter) (3:1)
  - Facebook Cover (205:78)
- Real-time preview of transformed images
- Download transformed images
- Drag and drop support
- Instant format switching

### User Features

- User authentication with Clerk
- Dark/Light theme support
- Responsive design for all screen sizes
- Modern and intuitive UI
- Real-time progress indicators
- Secure file handling
- Optimized performance

## Tech Stack

- **Frontend**:

  - Next.js 14 (App Router)
  - React 18
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - Next-Cloudinary
  - Lucide Icons

- **Backend**:

  - Next.js API Routes
  - Prisma ORM
  - Cloudinary SDK
  - Axios

- **Authentication**:

  - Clerk

- **Database**:

  - PostgreSQL

- **Deployment**:

  - Vercel
  - GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Cloudinary account
- Clerk account
- PostgreSQL database
- Git

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_database_url
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cloudinary-saas.git
cd cloudinary-saas
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
my-app/
├── app/
│   ├── (app)/
│   │   ├── home/
│   │   ├── social-share/
│   │   └── video-upload/
│   ├── api/
│   │   ├── image-upload/
│   │   └── video-upload/
│   └── video/
├── components/
│   ├── ui/
│   ├── VideoCard.tsx
│   ├── Navbar.tsx
│   └── theme-provider.tsx
├── prisma/
│   └── schema.prisma
├── public/
├── .github/
│   └── workflows/
│       └── vercel.yml
└── types/
```

## Usage

### Video Compression

1. Navigate to the Video Upload page
2. Drag and drop or select a video file
3. Add title and description
4. Wait for compression to complete
5. View compression statistics
6. Download the compressed video

### Image Transformation

1. Navigate to the Social Share page
2. Upload an image using drag & drop or file browser
3. Select the desired social media format
4. Preview the transformed image in real-time
5. Download the transformed image

## Deployment

The project is configured for deployment on Vercel with GitHub Actions:

1. Push your code to GitHub
2. Set up the required environment variables in Vercel
3. The GitHub Actions workflow will automatically deploy to Vercel

See `.github/workflows/vercel.yml` for deployment configuration.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Cloudinary](https://cloudinary.com/) for media management
- [Clerk](https://clerk.com/) for authentication
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn UI](https://ui.shadcn.com/) for components
- [Vercel](https://vercel.com/) for hosting
- [GitHub Actions](https://github.com/features/actions) for CI/CD
