# Multi-Tenant Blog Application

A modern, scalable multi-tenant blog platform built with Next.js 15, featuring subdomain-based tenant isolation, organization management, and a beautiful user interface.

## 🌟 Features

### Multi-Tenancy

- **Subdomain-based routing** - Each organization gets their own subdomain (e.g., `acme.localhost:3000`)
- **Complete data isolation** between organizations
- **Organization-specific blog management**
- **Seamless tenant switching** with Clerk's OrganizationSwitcher

### Authentication & Authorization

- **Clerk Authentication** with organization support
- **Role-based access control** within organizations
- **Social login support** (Google, GitHub, etc.)
- **Secure session management**

### Modern Tech Stack

- **Next.js 15** with App Router and Server Components
- **TypeScript** for type safety
- **Tailwind CSS** for styling with custom components
- **Drizzle ORM** for database operations
- **PostgreSQL** as the primary database

### User Experience

- **Beautiful, responsive UI** with glassmorphism effects
- **Real-time organization switching**
- **Intuitive blog creation interface**
- **Writing tools and templates**

## 🏗️ Architecture

### Folder Structure

```
app/
├── (root)/                 # Main application routes
│   ├── layout.tsx         # Root layout with authentication
│   └── page.tsx           # Landing page
├── (subdomain)/           # Subdomain routing group
│   ├── layout.tsx         # Subdomain-specific layout
│   └── s/[subdomain]/     # Dynamic subdomain pages
│       └── page.tsx       # Organization blog display
└── org/[slug]/            # Organization management
    ├── layout.tsx         # Organization layout
    ├── page.tsx           # Blog creation interface
    └── action.ts          # Server actions for blog operations
```

### Key Components

- **Middleware** - Handles subdomain extraction and routing
- **Database Schema** - Type-safe blog and organization models
- **Server Actions** - Secure blog creation and management
- **UI Components** - Reusable Shadcn/ui components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Clerk account for authentication

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd multi_tenant_blog
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env.local` file:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/postgres

# Application
NEXT_PUBLIC_ROOT_DOMAIN=localhost:3000
NODE_ENV=development
```

4. **Start the database**

```bash
docker compose up -d
```

5. **Push database schema**

```bash
npm run db:push
```

6. **Run the development server**

```bash
npm run dev
```

### Development URLs

- **Main App**: `http://localhost:3000`
- **Organization Dashboard**: `http://localhost:3000/org/[org-slug]`
- **Subdomain Blog**: `http://[org-slug].localhost:3000`

## 🗄️ Database

### Schema

The application uses Drizzle ORM with PostgreSQL:

```typescript
// Blog Table
export const BlogTable = pgTable("blogs", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 80 }).notNull(),
  body: text().notNull(),
  orgId: text().notNull(),
});
```

### Database Commands

```bash
# Open Drizzle Studio
npm run db:studio

# Push schema changes
npm run db:push
```

## 🔧 Configuration

### Docker Setup

PostgreSQL runs in Docker on port 5434:

```yaml
services:
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DB: postgres
    ports:
      - "5434:5432"
```

### Middleware Configuration

The middleware handles subdomain detection and routing:

- **Local Development**: Detects `*.localhost` subdomains
- **Production**: Supports custom domains and Vercel deployments
- **URL Rewriting**: Maps subdomains to `/s/[subdomain]` routes

## 📝 Usage

### Creating Organizations

1. Sign in to the application
2. Use the Organization Switcher to create new organizations
3. Each organization gets automatic subdomain access

### Writing Blogs

1. Navigate to `/org/[your-org-slug]`
2. Use the blog creation interface
3. Access published blogs at `[your-org-slug].localhost:3000`

### Managing Content

- **Real-time switching** between organizations
- **Auto-save functionality** for drafts
- **Rich text editing** with formatting tools

## 🚀 Deployment

### Environment Setup

Ensure all environment variables are configured for production:

- Update `NEXT_PUBLIC_ROOT_DOMAIN` to your domain
- Configure Clerk for production
- Set up production PostgreSQL database

### Vercel Deployment

```bash
npm run build
```

Deploy to Vercel with proper environment variables and domain configuration.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Clerk](https://clerk.com/) - Authentication
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Docker](https://www.docker.com/) - Containerization
- [Shadcn/ui](https://ui.shadcn.com/) - UI Components
