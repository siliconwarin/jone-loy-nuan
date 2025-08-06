# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Thai online scam awareness quiz application ("สแกนโจร.online") built with Next.js 15, React 19, TypeScript, and Supabase. The app educates users about common online scams through interactive quizzes with scenario-based questions and visual content.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run migrate` - Run quiz data migration script
- `npm run upload:images` - Upload images to Supabase storage

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript, Tailwind CSS v4
- **UI Components**: Radix UI primitives with shadcn/ui (New York style)
- **State Management**: Zustand for quiz state
- **Database**: Supabase with TypeScript types
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Directory Structure
```
app/                    # Next.js App Router pages
├── admin/             # Admin panel for quiz management
├── api/               # API routes
├── quiz/              # Main quiz flow
├── login/             # Authentication
└── result/            # Quiz results

components/            # Shared React components
├── ui/               # shadcn/ui components
└── [custom components]

lib/                   # Utilities and business logic
├── actions/          # Server actions
├── types.ts          # TypeScript type definitions
├── schema.ts         # Zod validation schemas
└── utils.ts          # Utility functions

store/                 # Zustand state management
hooks/                 # Custom React hooks
utils/supabase/        # Supabase client configuration
```

### Key Architecture Patterns

**Quiz System**:
- Questions stored in Supabase with images in storage
- Each question has multiple choice answers with one correct answer
- Results show explanations and scam category information
- Session tracking with device type and analytics

**State Management**:
- `useQuizResultStore` (Zustand) manages quiz progress, responses, and session data
- Local state for UI interactions and animations
- Supabase real-time subscriptions for admin features

**Content Management**:
- Quiz content supports multiple types: text, images, SVG, and React components
- Scenario-based visual content stored in `/public/images/scenarios/`
- Admin panel allows CRUD operations on questions and image uploads

**Database Schema**:
- `questions` table with content, answers, and metadata
- `quiz_responses` for analytics and session tracking
- `scenario_images` for visual content management

### Component Patterns

**Quiz Components**:
- `QuizClient` - Main client-side quiz orchestrator
- `ContentArea` - Renders different content types (images, text, components)
- `AnswerPanel` - Handles answer selection with flexible layouts
- `ResultCard` - Shows quiz results with explanations

**Animations**:
- `useQuizAnimations` hook provides consistent animation configs
- Framer Motion for page transitions and interactive elements
- Custom stair transition effects

**Form Handling**:
- React Hook Form with Zod validation throughout
- Server actions for data mutations
- Optimistic updates where appropriate

### Styling Conventions
- Tailwind CSS v4 with CSS variables
- Two Google Fonts: Inter (primary) and Prompt (Thai text)
- Mobile-first responsive design
- Custom CSS animations for quiz transitions

### Environment Variables
Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - For admin operations

### Testing and Quality
- ESLint configured with Next.js rules
- TypeScript strict mode enabled
- Custom rules: disabled `react/no-unescaped-entities` and `@next/next/no-page-custom-font`

### Localization
- Primary language: Thai (`th_TH`)
- All user-facing text in Thai
- SEO optimized for Thai domain (`xn--12co4czb5a2kj.online`)

## Data Migration
Use `npm run migrate` to run the quiz data migration script which handles question imports and database seeding.