# Development Roadmap

This document outlines the step-by-step tasks to build ResumeCraft, moving from the current prototype GUI to a fully functional local-first application.

## Phase 1: Core Infrastructure & Data Layer
**Goal:** Establish the file-based data structure and the deterministic analysis engine.

### 1.1 Scaffold Data Directories
- [ ] Create directory structure:
  - `resume/base/` (for role history)
  - `resume/jd/` (for job descriptions)
  - `resume/generated/` (for LLM outputs)
- [ ] Create `resume/base/sample_role.md` following the schema in `spec.md` (Section 3).
- [ ] Create `resume/jd/sample_jd.md` following the schema in `spec.md` (Section 4).

### 1.2 Implement Analysis Core (`analysis/`)
- [ ] Create `analysis/types.ts`:
  - Define interfaces for `AtsAnalysis`, `LlmAtsReport`, and `ResumeSection`.
- [ ] Create `analysis/index.ts`:
  - Implement `analyzeResume(jdName)` function.
  - Implement logic to read markdown files from `resume/jd/` and `resume/generated/`.
  - Implement basic keyword matching (case-insensitive).
  - Implement section completeness checks (looking for headers).
- [ ] Add unit tests for the analysis engine.

---

## Phase 2: CLI & Scripts
**Goal:** Enable command-line operations for compiling PDFs and running analysis.

### 2.1 LaTeX Compilation Script
- [ ] Create `scripts/compile-latex.ts`.
- [ ] Implement logic to:
  - Accept a JD name as an argument.
  - Locate `resume/generated/<jd>/v1.tex`.
  - Run `tectonic` or `pdflatex` to generate a PDF.
  - Ensure the output is saved as `resume/generated/<jd>/v1.pdf`.

### 2.2 CLI Entry Point
- [ ] Create a CLI entry point (e.g., `bin/resumeforge.ts` or using a library like `commander`).
- [ ] Implement command: `resumeforge compile --jd <name>`.
- [ ] Implement command: `resumeforge analyze --jd <name>` (outputs JSON to stdout).

---

## Phase 3: GUI Integration
**Goal:** Replace mock data in the TanStack Start app with real file system data.

### 3.1 Server-Side Data Access
- [ ] Create API/Server functions in `app/src/` to:
  - List all JDs in `resume/jd/`.
  - Read content of a specific JD markdown file.
  - Serve the generated PDF file.
  - Invoke `analyzeResume` and return the result.

### 3.2 Connect UI Components
- [ ] Update `app/src/routes/index.tsx` to fetch the real JD list.
- [ ] Update `app/src/routes/detail` to display real markdown content.
- [ ] Update `app/src/routes/preview` to:
  - Fetch real analysis data.
  - Embed the real PDF from the local file system.
