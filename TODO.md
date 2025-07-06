# 🎯 Jone Loy Nuan - Refactor TODO List

## 🚨 **URGENT - Fix Current Issues**

### 1. Fix React Key Duplicate Error

- [ ] **Fix duplicate `id: "ignore"` in `lib/quiz-data.ts`**
  - [ ] Question 8 (Fake Ads): Change 3 `ignore` → `ignore_ads_no_trust`, `ignore_ads_no_click`, `click_ads_follow`
  - [ ] Question 9 (Police Call): Change 2 `ignore` → `ignore_police_no_trust`, `ignore_police_callback`
  - [ ] Test that React key error is resolved
  - [ ] Verify quiz functionality still works

### 2. Verify Build & Deploy

- [ ] **Check if build passes after ID fixes**
- [ ] **Verify Vercel deployment works**
- [ ] **Test quiz flow end-to-end**

---

## 🔄 **Phase 1: Simplify Architecture (Week 1)**

### 3. Consolidate State Management

- [ ] **Remove Zustand dependency from AnswerPanel**
  - [ ] ✅ Already done - verify it works
  - [ ] Test that button states reset properly between questions
- [ ] **Simplify QuizClient state**
  - [ ] Combine `selectedAnswer` + `showResult` into single state object
  - [ ] Remove unnecessary state variables
- [ ] **Consider removing Zustand entirely**
  - [ ] Move all state to React useState/useReducer
  - [ ] Keep only essential global state (session, score)

### 4. Simplify Component Structure

- [ ] **Merge small components**
  - [ ] Combine `AnswerPanel` + `QuestionSection` into single component
  - [ ] Merge `ResultCard` into main quiz component
  - [ ] Reduce prop drilling
- [ ] **Use index-based keys instead of IDs**
  - [ ] Change `key={option.id}` → `key={index}`
  - [ ] Update selection logic to use index
  - [ ] Simplify data structure

### 5. Clean Up Data Structure

- [ ] **Simplify quiz data format**
  - [ ] Remove complex `id` fields from answers
  - [ ] Use simple array structure
  - [ ] Keep only essential fields: `text`, `correct`
- [ ] **Remove unused fields**
  - [ ] Clean up `content`, `images`, `category` if not used
  - [ ] Simplify `result` object

---

## 🎨 **Phase 2: Improve UX & Performance (Week 2)**

### 6. Optimize Animations

- [ ] **Simplify animation logic**
  - [ ] Reduce animation complexity in `useQuizAnimations`
  - [ ] Use simpler Framer Motion patterns
  - [ ] Remove unnecessary animation states
- [ ] **Improve performance**
  - [ ] Memoize expensive calculations
  - [ ] Reduce re-renders
  - [ ] Optimize image loading

### 7. Enhance User Experience

- [ ] **Add loading states**
  - [ ] Show loading spinner during transitions
  - [ ] Add skeleton screens
- [ ] **Improve accessibility**
  - [ ] Add proper ARIA labels
  - [ ] Ensure keyboard navigation works
  - [ ] Add screen reader support
- [ ] **Mobile optimization**
  - [ ] Test on various screen sizes
  - [ ] Optimize touch interactions

### 8. Error Handling

- [ ] **Add proper error boundaries**
  - [ ] Handle quiz data loading errors
  - [ ] Add fallback UI for broken questions
- [ ] **Improve error messages**
  - [ ] User-friendly error messages
  - [ ] Retry mechanisms

---

## 🧹 **Phase 3: Code Cleanup (Week 3)**

### 9. Remove Dead Code

- [ ] **Delete unused components**
  - [ ] Remove `final-score-screen.tsx` (already deleted)
  - [ ] Clean up unused UI components
  - [ ] Remove unused hooks
- [ ] **Clean up imports**
  - [ ] Remove unused imports across all files
  - [ ] Organize import statements
- [ ] **Remove unused dependencies**
  - [ ] Check `package.json` for unused packages
  - [ ] Remove if not needed

### 10. Improve Code Quality

- [ ] **Add TypeScript strict mode**
  - [ ] Fix all TypeScript errors
  - [ ] Add proper type definitions
  - [ ] Remove `any` types
- [ ] **Add ESLint rules**
  - [ ] Configure stricter ESLint rules
  - [ ] Fix all linting errors
- [ ] **Add Prettier**
  - [ ] Configure code formatting
  - [ ] Format all files

### 11. Documentation

- [ ] **Update README**
  - [ ] Add setup instructions
  - [ ] Document new architecture
  - [ ] Add troubleshooting guide
- [ ] **Add code comments**
  - [ ] Document complex logic
  - [ ] Add JSDoc comments
- [ ] **Create architecture diagram**
  - [ ] Visual representation of new structure

---

## 🚀 **Phase 4: Advanced Features (Week 4)**

### 12. Add Analytics

- [ ] **Track user behavior**
  - [ ] Add analytics for quiz completion
  - [ ] Track wrong answers for improvement
  - [ ] Monitor performance metrics
- [ ] **A/B testing**
  - [ ] Test different question orders
  - [ ] Test different UI layouts

### 13. Performance Monitoring

- [ ] **Add performance monitoring**
  - [ ] Track Core Web Vitals
  - [ ] Monitor bundle size
  - [ ] Add performance budgets
- [ ] **Optimize bundle**
  - [ ] Code splitting
  - [ ] Lazy loading
  - [ ] Tree shaking

### 14. Testing

- [ ] **Add unit tests**
  - [ ] Test quiz logic
  - [ ] Test component rendering
  - [ ] Test state management
- [ ] **Add integration tests**
  - [ ] Test complete quiz flow
  - [ ] Test API endpoints
- [ ] **Add E2E tests**
  - [ ] Test user journey
  - [ ] Test mobile responsiveness

---

## 📋 **Daily Checklist Template**

### Morning (15 min)

- [ ] Check for new issues/errors
- [ ] Review yesterday's progress
- [ ] Plan today's tasks

### During Development

- [ ] Work on current phase tasks
- [ ] Test changes immediately
- [ ] Commit frequently with clear messages

### End of Day (10 min)

- [ ] Update progress in this TODO
- [ ] Test current functionality
- [ ] Plan tomorrow's tasks

---

## 🎯 **Success Metrics**

### Phase 1 Success

- [ ] No React key errors
- [ ] Build passes consistently
- [ ] Quiz works end-to-end
- [ ] Reduced component complexity

### Phase 2 Success

- [ ] Faster load times
- [ ] Smoother animations
- [ ] Better mobile experience
- [ ] Improved accessibility

### Phase 3 Success

- [ ] Clean, maintainable code
- [ ] No TypeScript errors
- [ ] Consistent code style
- [ ] Good documentation

### Phase 4 Success

- [ ] Analytics working
- [ ] Performance improved
- [ ] Tests passing
- [ ] Ready for production

---

## 🚨 **Rollback Plan**

If anything breaks:

1. **Immediate**: Revert to last working commit
2. **Short-term**: Fix specific issue without major refactor
3. **Long-term**: Continue with simplified approach

---

## 📞 **Support**

- **Technical Issues**: Check error logs, console, network tab
- **Design Questions**: Refer to original mockups
- **Architecture Decisions**: Keep it simple, focus on user experience

---

_Last Updated: [Current Date]_
_Next Review: [Weekly]_

## 🟢 Progress Update (ล่าสุด)

- [x] ResultCard เหลือเฉพาะปุ่มลูกศรขวาบน (Next/Continue)
- [x] Layout QuizClient: ปุ่ม AnswerPanel อยู่ล่าง, ResultCard ติดขอบล่าง, ปุ่ม Next อยู่ขวาบน
- [x] Survey เหลือ 3 หัวข้อ (ageGroup, education, occupation)
- [x] ไม่มี console.log ใน production
- [x] TypeScript/TSX error ที่เกี่ยวกับ prop, type mismatch, Zod, ถูกแก้หมดแล้ว
- [x] UI/UX: ปุ่ม Next/Continue, ResultCard ติดขอบล่าง, layout เหมือน Duolingo
- [x] ลบปุ่มเหลืองด้านล่าง ResultCard
- [x] ปรับ animation ให้ smooth, ใช้ spring type assertion
- [x] Clean code, ไม่มี dead code, import สะอาด
