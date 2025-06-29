# Jone Loy Nuan - Scam Awareness Quiz

## 📋 Project Overview

**"Jone Loy Nuan"** เป็นแอปพลิเคชัน Quiz เพื่อสร้างความตระหนักรู้เกี่ยวกับการโกงออนไลน์ (Scam Awareness)
ที่ใช้ Next.js และ React พร้อมด้วย Interactive Scenarios และ Animation ที่น่าสนใจ

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4, tw-animate-css
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **UI Components**: Radix UI, Lucide React
- **OTP Input**: input-otp
- **Notifications**: Sonner

## 🏗 Project Structure

```
jone-loy-nuan/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── quiz-response/    # Quiz response logging API
│   │   └── survey-response/  # Survey response API
│   ├── quiz/                 # Quiz pages
│   │   ├── _component/       # Quiz-specific components
│   │   └── page.tsx         # Quiz main page
│   ├── result/              # Result page
│   ├── survey/              # Survey page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # Reusable Components
│   ├── ui/                  # UI Components (Radix UI based)
│   ├── layout/              # Layout components
│   ├── scenario-viewer.tsx  # Main scenario component
│   ├── content-area.tsx     # Content display area
│   ├── red-flag-tooltip.tsx # Warning tooltip component
│   └── ...                  # Other reusable components
├── hooks/                   # Custom React Hooks
│   ├── useQuiz.ts          # Quiz logic hook
│   └── useQuizAnimations.ts # Animation configurations
├── lib/                     # Core Logic & Data
│   ├── types.ts            # TypeScript type definitions
│   ├── quiz-data.ts        # Quiz questions and scenarios
│   ├── scenario-configs.ts # Scenario configurations
│   ├── constants.ts        # App constants and configs
│   ├── schema.ts           # Zod validation schemas
│   └── utils.ts            # Utility functions
├── store/                   # State Management
│   └── quiz-store.ts       # Zustand quiz store
└── public/                 # Static Assets
    └── images/             # Scenario images
        ├── scenario-1/     # SMS scam images
        ├── scenario-2/     # Social ad scam
        ├── scenario-3/     # Job ad scam
        ├── scenario-5/     # Romance scam
        └── scenario-6/     # Investment scam
```

## 🔄 Application Flow

```
Landing Page (/page.tsx)
    ↓
Quiz Pages (/quiz)
    ↓
Survey Page (/survey)
    ↓
Result Page (/result)
```

## 📊 Quiz Architecture

### 1. **Quiz Data Structure**

```typescript
interface QuizQuestion {
	id: string;
	question: string;
	content: QuizContent; // Image, text, SVG, or component
	answers: Answer[];
	result: QuizResult;
	interactive?: boolean;
}
```

### 2. **Scenario Types**

- **SMS Scam**: แสดงแชทปลอมขอข้อมูล
- **Social Ad Scam**: โฆษณาสินเชื่อปลอม
- **Job Ad Scam**: โฆษณาสมัครงานปลอม
- **PIN Scenario**: จำลองการขอรหัส PIN
- **Romance Scam**: โปรไฟล์โซเชียลปลอม
- **Investment Scam**: กลุ่มลงทุนปลอม
- **Line Group Scam**: กลุ่ม Line หลอกลงทุน

### 3. **Interactive Features**

- **Red Flag Tooltips**: แสดงสัญญาณเตือนภัย
- **Pin Input Simulation**: จำลองการกรอกรหัส PIN
- **Responsive Design**: รองรับทุกขนาดหน้าจอ
- **Smooth Animations**: ใช้ Framer Motion

## 🗄 State Management (Zustand)

```typescript
interface QuizStore {
	// Quiz State
	currentQuestion: QuizQuestion | null;
	selectedAnswer: string | null;
	showResult: boolean;
	isCorrect: boolean | null;

	// Session Management
	session: QuizSession | null;
	isLastQuestion: boolean;

	// Actions
	initializeSession: () => void;
	selectAnswer: (answerId: string) => void;
	saveQuizResponse: (questionId, answerId, isCorrect) => Promise<void>;
	nextQuestion: () => void;
	resetQuiz: () => void;
}
```

## 🎨 Component Architecture

### Core Components

- **`ScenarioViewer`**: แสดงเนื้อหา scenario ต่างๆ
- **`ContentArea`**: พื้นที่แสดงเนื้อหาหลัก
- **`AnswerPanel`**: แสดงตัวเลือกคำตอบ
- **`ResultCard`**: แสดงผลการตอบ
- **`RedFlagTooltip`**: แสดงคำเตือนสัญญาณอันตราย

### Layout Components

- **`PageTransition`**: Transition ระหว่างหน้า
- **`StairTransition`**: Animation แบบบันได

## 📈 Data Collection & Analytics

### Quiz Response Tracking

```typescript
interface QuizResponseData {
	sessionId: string;
	questionId: string;
	answerId: string;
	isCorrect: boolean;
	timeSpent: number;
	deviceType: "mobile" | "tablet" | "desktop";
	userAgent: string;
}
```

### API Endpoints

- **`/api/quiz-response`**: บันทึกการตอบ quiz
- **`/api/survey-response`**: บันทึกแบบสำรวจ

## 🎯 Key Features

### 1. **Progressive Quiz System**

- 7 คำถามครอบคลุมการโกงออนไลน์ทุกรูปแบบ
- Interactive scenarios ที่ใกล้เคียงความจริง
- Real-time feedback พร้อมคำอธิบาย

### 2. **Responsive Design**

- Mobile-first approach
- รองรับทุกขนาดหน้าจอ
- Touch-friendly interface

### 3. **Performance Optimized**

- Lazy loading สำหรับรูปภาพ
- Code splitting
- Optimized animations

### 4. **Accessibility**

- Keyboard navigation support
- Screen reader friendly
- High contrast support

## 🔧 Development Guidelines

### Code Quality

- **High readability**: โค้ดอ่านง่าย เข้าใจได้
- **Reusable components**: สร้าง component ที่ใช้ซ้ำได้
- **Type safety**: ใช้ TypeScript อย่างเข้มงวด
- **Performance-minded**: คิดถึงประสิทธิภาพเสมอ

### Naming Conventions

- **Frontend**: camelCase
- **Components**: PascalCase
- **Types/Interfaces**: PascalCase
- **Constants**: UPPER_SNAKE_CASE

### Animation Principles

- **Smooth transitions**: ใช้ easing functions ที่เหมาะสม
- **Meaningful motion**: Animation ต้องมีจุดประสงค์
- **Performance consideration**: หลีกเลี่ยง animation ที่กิน resources มาก

## 🚀 Deployment & Build

```bash
# Development
npm run dev

# Production Build
npm run build
npm run start

# Linting
npm run lint
```

## 📝 Future Enhancements

- [ ] แดชบอร์ดแสดงสถิติการใช้งาน
- [ ] ระบบ Achievement/Badge
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)
- [ ] Share results บนโซเชียล
- [ ] เพิ่ม scenario ใหม่ๆ
- [ ] AI-powered personalized recommendations
