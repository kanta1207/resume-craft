# Phase 1 Implementation Plan

## 0. Monorepo Setup (New)
- [x] Create root `package.json`
  - Configure workspaces: `["app", "analysis"]`
  - Add scripts: `test`, `lint`
- [x] Create `analysis/package.json`
  - Name: `@resume-craft/analysis`
  - Dependencies: `typescript`, `vitest` (dev)

## 1. Scaffold Data Directories
- [ ] Create `resume/base/`
- [ ] Create `resume/jd/`
- [ ] Create `resume/generated/`

## 2. Create Sample Data
- [ ] Create `resume/base/sample_role.md`
  - Content: Role, Company, Dates, Bullets
- [ ] Create `resume/jd/sample_jd.md`
  - Content: Title, Company, Description, Keywords

## 3. Implement Analysis Core
- [ ] Create `analysis/types.ts`
  - Define `AtsAnalysis` interface
  - Define `LlmAtsReport` interface
  - Define `ResumeSection` interface
- [ ] Create `analysis/index.ts`
  - Implement `analyzeResume(resumeContent, jdContent)` (Pure function)
  - Implement keyword matching (case-insensitive)
  - Implement section checks
- [ ] Create `analysis/fs-adapter.ts` (Local-only helper)
  - Functions to read files from `resume/` directory

## 4. Testing
- [ ] Create `analysis/index.test.ts`
- [ ] Run tests using `bun test` from root

