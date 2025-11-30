# Phase 1 Implementation Plan

## 0. Monorepo Setup (New)
- [x] Create root `package.json`
  - Configure workspaces: `["app", "analysis"]`
  - Add scripts: `test`, `lint`
- [x] Create `analysis/package.json`
  - Name: `@resume-craft/analysis`
  - Dependencies: `typescript`, `vitest` (dev)

## 1. Scaffold Data Directories
- [x] Create `resume/base/`
- [x] Create `resume/jd/`
- [x] Create `resume/generated/`

## 2. Create Sample Data
- [x] Create `resume/base/sample_role.md`
  - Content: Role, Company, Dates, Bullets
- [x] Create `resume/jd/sample_jd.md`
  - Content: Title, Company, Description, Keywords

## 3. Implement Analysis Core
- [x] Create `analysis/types.ts`
  - Define `AtsAnalysis` interface
  - Define `LlmAtsReport` interface
  - Define `ResumeSection` interface
- [x] Create `analysis/index.ts`
  - Implement `analyzeResume(resumeContent, jdContent)` (Pure function)
  - Implement keyword matching (case-insensitive)
  - Implement section checks
- [x] Create `analysis/fs-adapter.ts` (Local-only helper)
  - Functions to read files from `resume/` directory

## 4. Testing
- [x] Create `analysis/index.test.ts`
- [x] Run tests using `bun test` from root

