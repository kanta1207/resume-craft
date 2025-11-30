# Phase 2 Implementation Plan: CLI & Scripts

## 1. Setup & Dependencies
- [x] Install CLI helper library (e.g., `cac` or `commander`) in root or a new `cli` workspace if appropriate, or just use `bun` scripts.
  - *Decision: Let's keep it simple and use `cac` for the CLI in a new `cli` package or just scripts for now. Given the roadmap says "CLI Entry Point", let's create a dedicated script entry.*
- [x] Ensure `tectonic` or a latex distribution is available or documented as a requirement.

## 2. LaTeX Compilation Script
- [x] Create `scripts/compile-latex.ts`
  - [x] Function to resolve paths for a given JD name (`resume/generated/<jd>/v1.tex`)
  - [x] Logic to execute `tectonic` (or `pdflatex`) command
  - [x] Error handling if file missing or compilation fails
  - [x] Verify output exists at `resume/generated/<jd>/v1.pdf`

## 3. CLI Entry Point
- [x] Create `bin/resumeforge.ts` (or `cli/index.ts`)
  - [x] Configure executable permissions or `bun` run alias
  - [x] Setup argument parsing (using `cac` or `commander`)

## 4. CLI Commands
- [x] Implement `compile` command
  - Usage: `resumeforge compile --jd <name>`
  - Calls the logic from `scripts/compile-latex.ts`
- [x] Implement `analyze` command
  - Usage: `resumeforge analyze --jd <name>`
  - Imports `analyzeResume` from `@resume-craft/analysis`
  - Reads necessary files using `fs-adapter` logic (or similar)
  - Outputs JSON result to stdout

## 5. Integration Verification
- [x] Test `compile` with a sample dummy `.tex` file in `resume/generated/sample_jd/v1.tex`
- [x] Test `analyze` with `sample_jd` and verify JSON output
