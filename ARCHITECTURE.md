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
├── 📁 app/                           # Next.js App Router
│   ├── 📁 api/                       # API Routes
│   │   ├── 📁 quiz-response/         # Quiz response logging
│   │   │   └── 📄 route.ts          # POST /api/quiz-response
│   │   └── 📁 survey-response/       # Survey response logging
│   │       └── 📄 route.ts          # POST /api/survey-response
│   ├── 📁 quiz/                      # Quiz Application Pages
│   │   ├── 📁 _component/           # Quiz-specific Components
│   │   │   ├── 📄 answer-panel.tsx  # Answer selection UI
│   │   │   ├── 📄 pin-scenario.tsx  # PIN input simulation
│   │   │   ├── 📄 question-section.tsx # Question display
│   │   │   ├── 📄 quiz-background.tsx   # Quiz background
│   │   │   └── 📄 result-card.tsx   # Result display card
│   │   └── 📄 page.tsx              # Main quiz page
│   ├── 📁 result/                    # Quiz Result Page
│   │   └── 📄 page.tsx              # Score analysis & tips
│   ├── 📁 survey/                    # Post-quiz Survey
│   │   └── 📄 page.tsx              # Demographics survey
│   ├── 📄 favicon.ico               # App favicon
│   ├── 📄 globals.css               # Global styles
│   ├── 📄 layout.tsx                # Root layout with transitions
│   └── 📄 page.tsx                  # Landing page
├── 📁 components/                    # Reusable Components
│   ├── 📁 ui/                       # shadcn/ui Components
│   │   ├── 📄 button.tsx           # Button variants
│   │   ├── 📄 card.tsx             # Card container
│   │   ├── 📄 checkbox.tsx         # Checkbox input
│   │   ├── 📄 form.tsx             # Form components
│   │   ├── 📄 input-otp.tsx        # OTP input for PIN
│   │   ├── 📄 label.tsx            # Form labels
│   │   ├── 📄 popover.tsx          # Popover dialogs
│   │   ├── 📄 radio-group.tsx      # Radio button groups
│   │   ├── 📄 select.tsx           # Select dropdowns
│   │   └── 📄 textarea.tsx         # Text area input
│   ├── 📄 chat-bubble-image.tsx    # Chat bubble overlay
│   ├── 📄 content-area.tsx         # Main content display
│   ├── 📄 feed-ad-text-overlay.tsx # Feed ad text overlay
│   ├── 📄 page-content.tsx         # Page content wrapper
│   ├── 📄 page-transition.tsx      # Page transitions
│   ├── 📄 red-flag-tooltip.tsx     # Warning tooltips
│   ├── 📄 scenario-viewer.tsx      # Scenario display engine
│   ├── 📄 stair-transition.tsx     # Stair animation
│   ├── 📄 stairs.tsx               # Stair components
│   └── 📄 tooltip.tsx              # Generic tooltip
├── 📁 hooks/                        # Custom React Hooks
│   ├── 📄 useQuiz.ts               # Quiz state logic
│   └── 📄 useQuizAnimations.ts     # Animation configurations
├── 📁 lib/                          # Core Logic & Utilities
│   ├── 📄 constants.ts             # App constants & configs
│   ├── 📄 quiz-data.ts             # Quiz questions & scenarios
│   ├── 📄 scenario-configs.ts      # Scenario configurations
│   ├── 📄 schema.ts                # Zod validation schemas
│   ├── 📄 types.ts                 # TypeScript definitions
│   └── 📄 utils.ts                 # Utility functions
├── 📁 store/                        # State Management
│   └── 📄 quiz-store.ts            # Zustand quiz store
├── 📁 public/                       # Static Assets
│   ├── 📁 images/                   # Scenario Images
│   │   ├── 📁 scenario-1/          # SMS Scam
│   │   │   ├── 🖼️ chat-bubble.jpg
│   │   │   └── 🖼️ chat-ui.jpg
│   │   ├── 📁 scenario-2/          # Social Ad Scam
│   │   │   ├── 🖼️ feed-ui.jpg
│   │   │   └── 🖼️ feed-ui.svg
│   │   ├── 📁 scenario-3/          # Job Ad Scam
│   │   │   ├── 🖼️ ad-job.jpg
│   │   │   └── 🖼️ result-ad-job.jpg
│   │   ├── 📁 scenario-5/          # Romance Scam
│   │   │   ├── 🖼️ invest-ui.jpg
│   │   │   └── 🖼️ result-invest-ui.jpg
│   │   └── 📁 scenario-6/          # Investment Scam
│   │       ├── 🖼️ profile-social-ui.jpg
│   │       └── 🖼️ result-profile-social-ui.jpg
│   ├── 🖼️ mobile-frame.webp        # Mobile mockup frame
│   ├── 🖼️ window.svg               # Window icon
│   └── 📄 *.svg                     # Other icons
├── 📄 components.json               # shadcn/ui config
├── 📄 eslint.config.mjs            # ESLint configuration
├── 📄 next.config.ts               # Next.js configuration
├── 📄 package.json                 # Dependencies & scripts
├── 📄 postcss.config.mjs           # PostCSS configuration
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 README.md                    # Project documentation
├── 📄 ARCHITECTURE.md              # This file
└── 📄 apps-script.gs               # Google Apps Script for data collection
```

### 📝 Folder Descriptions

| Folder               | Purpose                           | Key Files                      |
| -------------------- | --------------------------------- | ------------------------------ |
| **`app/`**           | Next.js App Router structure      | Routes, layouts, pages         |
| **`app/api/`**       | API endpoints for data collection | quiz-response, survey-response |
| **`app/quiz/`**      | Quiz application logic            | Main quiz page + components    |
| **`components/`**    | Reusable React components         | UI components, scenarios       |
| **`components/ui/`** | shadcn/ui design system           | Forms, buttons, inputs         |
| **`hooks/`**         | Custom React hooks                | Quiz logic, animations         |
| **`lib/`**           | Core business logic               | Data, types, utilities         |
| **`store/`**         | State management                  | Zustand stores                 |
| **`public/`**        | Static assets                     | Images, icons, scenarios       |

### 🧹 Clean Up Guide

#### Files Safe to Remove:

```bash
# Unused components that can be safely deleted
rm components/final-score-screen.tsx    # ❌ Not used (result page has its own UI)
rm components/ui/popover.tsx           # ❌ Not imported anywhere
rmdir components/layout                # ❌ Empty directory
```

#### Component Usage Status:

| Component                   | Status     | Used In                       |
| --------------------------- | ---------- | ----------------------------- |
| ✅ `scenario-viewer.tsx`    | **Active** | `content-area.tsx`            |
| ✅ `content-area.tsx`       | **Active** | `app/quiz/page.tsx`           |
| ✅ `pin-scenario.tsx`       | **Active** | Quiz PIN simulation           |
| ✅ `red-flag-tooltip.tsx`   | **Active** | `scenario-viewer.tsx`         |
| ❌ `final-score-screen.tsx` | **Unused** | Replaced by `result/page.tsx` |
| ❌ `ui/popover.tsx`         | **Unused** | No imports found              |

#### Directory Status:

- 📁 **`components/layout/`** → **Empty** (can be removed)
- 📁 **`components/ui/`** → **Mostly used** (except popover.tsx)
- 📁 **`app/quiz/_component/`** → **All active**

### 🔗 Component Dependencies Flow

```
Landing Page (page.tsx)
    ↓
Quiz Page (quiz/page.tsx)
    ├── PageContent
    ├── QuizBackground
    └── ContentArea
        └── ScenarioViewer
            ├── ChatBubbleImage
            ├── FeedAdTextOverlay
            └── RedFlagTooltip

Quiz Components (quiz/_component/)
    ├── QuestionSection
    ├── AnswerPanel
    ├── ResultCard
    └── PinScenario (Interactive)
        └── InputOTP (ui/input-otp.tsx)

Layout & Transitions
    ├── PageTransition (used in layout.tsx)
    └── StairTransition (used in layout.tsx)
        └── Stairs

Shared UI Components
    ├── Button (ui/button.tsx)
    ├── Card (ui/card.tsx)
    ├── Form Components (ui/form.tsx, ui/select.tsx, etc.)
    └── Tooltip (generic tooltip component)
```

### 📦 Key Dependencies by Feature

| Feature        | Primary Components                  | Supporting Components                  |
| -------------- | ----------------------------------- | -------------------------------------- |
| **Landing**    | `page.tsx`                          | `Button`, `PageTransition`             |
| **Quiz Logic** | `quiz/page.tsx`, `ContentArea`      | `ScenarioViewer`, `AnswerPanel`        |
| **Scenarios**  | `ScenarioViewer`                    | `ChatBubbleImage`, `FeedAdTextOverlay` |
| **Animations** | `StairTransition`, `PageTransition` | `Stairs`                               |
| **Forms**      | `survey/page.tsx`                   | All `ui/` form components              |
| **Results**    | `result/page.tsx`                   | `Card`, `Button`                       |

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

### Unified Data Storage Architecture

**🎯 Single Sheet Design**: ข้อมูลทั้ง Quiz และ Survey ถูกบันทึกลงชีตเดียวกัน `jone-loy-noan` เพื่อให้วิเคราะห์ได้ง่ายข้นึ

### Data Structure

```typescript
// Quiz Summary Data (Privacy-Focused)
interface QuizSummaryData {
	sessionId: string;
	totalQuestions: number;
	correctAnswers: number;
	deviceType: "mobile" | "tablet" | "desktop";
	userAgent: string;
}

// Survey Response Data
interface SurveyResponseData {
	type: "survey";
	sessionId?: string;
	totalQuestions: number;
	totalScore: number; // From quiz summary
	ageGroup: string;
	education: string;
	occupation: string;
	hasScamExperience: boolean;
	scamTypes?: string[];
	socialMediaUsage: string;
	platforms: string[];
	feedback?: string;
	deviceType: "mobile" | "tablet" | "desktop";
	userAgent: string;
}
```

### Google Sheets Schema

| Column                  | Quiz Data | Survey Data   | Purpose               |
| ----------------------- | --------- | ------------- | --------------------- |
| **Timestamp**           | ✅        | ✅            | เวลาบันทึกข้อมูล      |
| **Data_Type**           | "quiz"    | "survey"      | แยกประเภทข้อมูล       |
| **Session_ID**          | ✅        | ✅ (optional) | เชื่อมโยงข้อมูล       |
| **Total_Questions**     | ✅        | ✅            | จำนวนคำถามทั้งหมด (7) |
| **Correct_Answers**     | ✅        | ✅            | จำนวนคำตอบที่ถูก      |
| **Age_Group**           | ❌        | ✅            | ช่วงอายุ              |
| **Education**           | ❌        | ✅            | การศึกษา              |
| **Occupation**          | ❌        | ✅            | อาชีพ                 |
| **Has_Scam_Experience** | ❌        | ✅            | ประสบการณ์ถูกโกง      |
| **Scam_Types**          | ❌        | ✅            | ประเภทการโกง          |
| **Social_Media_Usage**  | ❌        | ✅            | การใช้โซเชียล         |
| **Platforms**           | ❌        | ✅            | แพลตฟอร์มที่ใช้       |
| **Feedback**            | ❌        | ✅            | ความคิดเห็น           |
| **Device_Type**         | ✅        | ✅            | ประเภทอุปกรณ์         |
| **User_Agent**          | ✅        | ✅            | ข้อมูล browser        |

### Privacy & Data Collection

**🔒 Privacy-First Approach:**

- **NO detailed question tracking** - ไม่เก็บข้อมูลว่าตอบคำถามไหนถูก/ผิด
- **NO answer choice tracking** - ไม่เก็บข้อมูลว่าเลือกตัวเลือกไหน
- **NO time tracking** - ไม่เก็บเวลาที่ใช้ตอบแต่ละคำถาม
- **ONLY summary results** - เก็บแค่คะแนนรวม (X/7)

**✅ What We Collect:**

```javascript
// Quiz Summary (ส่งเมื่อจบ quiz)
{
  sessionId: "quiz_123_abc",
  totalQuestions: 7,
  correctAnswers: 5,
  deviceType: "mobile",
  userAgent: "Mozilla/5.0..."
}

// Survey Data (ส่งหลังจาก survey)
{
  type: "survey",
  sessionId: "quiz_123_abc",
  totalScore: 5, // Same as correctAnswers from quiz
  ageGroup: "25-34",
  education: "bachelor",
  // ... other demographic data
}
```

### API Endpoints

- **`/api/quiz-response`**: บันทึกสรุปผล quiz (เมื่อจบ quiz)
- **`/api/survey-response`**: บันทึกแบบสำรวจ (ข้อมูลครบชุด)

### Data Flow

```
1. User starts quiz → Session created
2. User answers questions → Results stored locally
3. Quiz completes → Summary sent to API
4. User completes survey → Survey data sent to API
5. Both records linked by sessionId
```

### Google Apps Script Features

```javascript
// Privacy-Focused Data Collection
const SHEET_NAME = "jone-loy-noan"; // Single sheet for all data

// Quiz Summary Only
function handleQuizSummary(data) {
	// Stores: sessionId, totalQuestions, correctAnswers
	// Does NOT store: individual questions, answers, or timing
}

// Enhanced Analytics
function getQuizStats() {
	return {
		totalQuizzes: number,
		averageScore: number,
		averagePercentage: number,
	};
}

// Demographic Analytics
function getSurveyStats() {
	return {
		totalSurveys: number,
		averageScore: number,
	};
}
```

### Benefits of Summary-Only Collection

| Benefit                     | Description                              |
| --------------------------- | ---------------------------------------- |
| **🔒 Privacy Protection**   | ผู้ใช้ไม่ต้องกังวลเรื่องข้อมูลรายละเอียด |
| **📊 Sufficient Analytics** | ยังได้ข้อมูลเพียงพอสำหรับวิเคราะห์       |
| **⚡ Better Performance**   | ข้อมูลน้อยลง = เร็วกว่า                  |
| **💾 Storage Efficient**    | ใช้พื้นที่เก็บข้อมูลน้อยลง               |
| **🎯 Focus on Outcomes**    | เน้นผลลัพธ์ที่สำคัญ                      |

### 🔍 Summary of Privacy-Focused Changes

**Before (Detailed Tracking):**

```javascript
// ❌ เก่า: เก็บทุกรายละเอียด
{
  questionId: "sms-scam-1",
  answerId: "b",
  isCorrect: true,
  timeSpent: 15
}
// ส่งทุกครั้งที่ตอบคำถาม = 7 API calls
```

**After (Summary Only):**

```javascript
// ✅ ใหม่: เก็บแค่สรุปผล
{
  sessionId: "quiz_123",
  totalQuestions: 7,
  correctAnswers: 5
}
// ส่งแค่ครั้งเดียวตอนจบ = 1 API call
```

**Key Improvements:**

- **🔒 Enhanced Privacy** - ไม่มีข้อมูลรายละเอียดที่อาจระบุตัวตนได้
- **⚡ Better Performance** - ลด API calls จาก 7 เป็น 1 ครั้ง
- **💾 Reduced Storage** - ใช้พื้นที่เก็บข้อมูลน้อยลง 85%
- **📊 Sufficient Analytics** - ยังได้ข้อมูลเพียงพอสำหรับวิเคราะห์
- **👥 User Trust** - ผู้ใช้มั่นใจมากขึ้นเรื่องความเป็นส่วนตัว

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

### Frontend Deployment

```bash
# Development
npm run dev

# Production Build
npm run build
npm run start

# Linting
npm run lint
```

### Google Apps Script Deployment

#### 1. **Setup Google Sheets**

```bash
# Create new Google Spreadsheet
1. Go to sheets.google.com
2. Create new spreadsheet
3. Copy the Spreadsheet ID from URL
4. Update SPREADSHEET_ID in apps-script.gs
```

#### 2. **Deploy Apps Script**

```bash
# Using Google Apps Script Editor
1. Go to script.google.com
2. Create new project
3. Paste content from apps-script.gs
4. Set up Web App deployment:
   - Execute as: Me
   - Access: Anyone
5. Copy the Web App URL
```

#### 3. **Environment Variables**

```bash
# Add to .env.local
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Production deployment
# Set environment variable in your hosting platform
```

#### 4. **Test Data Collection**

```bash
# Test quiz summary endpoint
curl -X POST YOUR_SCRIPT_URL \
  -H "Content-Type: application/json" \
  -d '{"type":"quiz","sessionId":"test_123","totalQuestions":7,"correctAnswers":5,"deviceType":"desktop"}'

# Test survey endpoint
curl -X POST YOUR_SCRIPT_URL \
  -H "Content-Type: application/json" \
  -d '{"type":"survey","sessionId":"test_123","totalScore":5,"ageGroup":"25-34","education":"bachelor","occupation":"private","hasScamExperience":false,"socialMediaUsage":"daily","platforms":["facebook","line"]}'
```

### Data Analytics Setup

```javascript
// Built-in analytics functions in Google Apps Script
function getQuizStats() {
  // Returns: totalQuizResponses, uniqueSessions, averageTimeSpent
}

function getSurveyStats() {
  // Returns: totalSurveyResponses, averageScore
}

// Create dashboard queries for new schema
=QUERY(A:O,"SELECT B,COUNT(B) WHERE B IS NOT NULL GROUP BY B LABEL COUNT(B) 'Total Responses'")
=QUERY(A:O,"SELECT E,COUNT(E) WHERE B='quiz' AND E IS NOT NULL GROUP BY E LABEL COUNT(E) 'Score Distribution'")
=QUERY(A:O,"SELECT F,AVG(E) WHERE B='survey' AND F IS NOT NULL GROUP BY F LABEL AVG(E) 'Average Score by Age Group'")
```

## 📝 Future Enhancements

### 📊 Analytics & Insights

- [ ] **Privacy-First Dashboard** - แดชบอร์ดที่ปกป้องข้อมูลส่วนบุคคล
- [ ] **Demographic Analytics** - วิเคราะห์ correlation แบบ aggregated data
- [ ] **Score Distribution Analysis** - แสดงการกระจายคะแนนแบบไม่ระบุตัวตน
- [ ] **Trend Analysis** - วิเคราะห์แนวโน้มความรู้ตามช่วงเวลา

### 🎮 User Experience

- [ ] **Achievement System** - ระบบ badge และ certificate
- [ ] **Anonymous Leaderboard** - อันดับคะแนนแบบไม่เปิดเผยตัวตน
- [ ] **Social Sharing** - แชร์ผลคะแนนแบบปกป้องความเป็นส่วนตัว
- [ ] **Personalized Tips** - คำแนะนำทั่วไปตามช่วงคะแนน

### 🌐 Platform Expansion

- [ ] **Multi-language Support** - รองรับภาษาอื่นๆ
- [ ] **Progressive Web App (PWA)** - ใช้งานแบบ offline ได้
- [ ] **Mobile App** - แอป iOS/Android
- [ ] **Line Mini App** - รองรับ Line platform

### 🧠 AI & Automation

- [ ] **AI-powered Scenarios** - สร้าง scenario ใหม่ด้วย AI
- [ ] **Smart Recommendations** - แนะนำเนื้อหาตามคะแนนรวม
- [ ] **Automated Reporting** - รายงานสถิติแบบ privacy-safe
- [ ] **Predictive Analytics** - ทำนายแนวโน้มโดยไม่ระบุตัวตน

### 📈 Data Benefits from Summary Collection

**🎯 Privacy-Safe Analytics Capabilities**:

```sql
-- ตัวอย่าง Query แบบ privacy-focused
SELECT
  Age_Group,
  AVG(Correct_Answers) as avg_score,
  COUNT(*) as total_users,
  ROUND(AVG(Correct_Answers/Total_Questions)*100) as avg_percentage
FROM sheet_data
WHERE Data_Type = 'survey'
GROUP BY Age_Group
HAVING COUNT(*) >= 5  -- Only show groups with enough data for anonymity
```

## UI/UX Decisions

- ResultCard ใช้ปุ่ม Next (ลูกศร) ขวาบนเท่านั้น ไม่มีปุ่มเหลืองด้านล่าง เพื่อความสะอาดและเหมือน Duolingo
- ResultCard ติดขอบล่าง (fixed bottom-0) พร้อม rounded-t-3xl
- ปุ่ม AnswerPanel อยู่ล่างสุดของ quiz layout เสมอ
- SurveyForm เหลือแค่ 3 หัวข้อ (ageGroup, education, occupation) เพื่อความกระชับ
- ไม่มี console.log ใน production

## Component Updates

- ResultCard: ปุ่ม Next/Continue เป็น floating button ขวาบนของการ์ด
- QuizClient: layout กลับไปใช้ flex basis เดิม, ปุ่ม AnswerPanel อยู่ล่าง, ResultCard ติดขอบล่าง
- Survey: ตัดเหลือ 3 field, validate ด้วย Zod
