# Plan for Phase 1: Core Infrastructure & Data Layer

This plan outlines the steps to implement the file-based data structure and the deterministic analysis engine for ResumeCraft.

## 1. Scaffold Data Directories
**Goal:** Set up the file system structure for storing resume data and job descriptions.

- [ ] **Create Directory Structure**
  - Create `resume/base/` for role history.
  - Create `resume/jd/` for job descriptions.
  - Create `resume/generated/` for LLM outputs.

- [ ] **Create Sample Data**
  - Create `resume/base/sample_role.md` (Schema: Role, Company, Dates, Bullets).
  - Create `resume/jd/sample_jd.md` (Schema: Title, Company, Description, Keywords).

## 2. Implement Analysis Core
**Goal:** Build the TypeScript engine to analyze resumes against job descriptions.

- [ ] **Define Types (`analysis/types.ts`)**
  - `AtsAnalysis`: Overall score and breakdown.
  - `LlmAtsReport`: Structure for LLM feedback.
  - `ResumeSection`: Interface for parsed resume sections.

- [ ] **Implement Analysis Logic (`analysis/index.ts`)**
  - `analyzeResume(jdName)`: Main entry point.
  - File Reading: Logic to read from `resume/jd/` and `resume/generated/`.
  - Keyword Matching: Case-insensitive comparison between JD keywords and resume content.
  - Section Checks: Verify presence of standard headers (Experience, Education, etc.).

- [ ] **Testing**
  - Add unit tests for `analyzeResume` and helper functions using Vitest.
