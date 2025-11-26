# ResumeCraft – Full MVP Specification

Local-First Resume Builder & ATS Analyzer

ResumeCraft is a **local-first, privacy-preserving toolkit** that helps engineers generate ATS-optimized resumes using their own LLM tools, compile them locally, and analyze them via a lightweight GUI.

All processing happens **on the user’s machine only**.  
There is **no cloud**, **no external API**, and **no hosted backend**.

---

## 1. Core Principles

- **Local-first** – everything is file-based inside a Git repository
- **Privacy** – no job descriptions, resumes, or personal data leave the machine
- **Developer-centric workflow** – IDE + CLI + AI coding assistants
- **Clear separation of responsibilities:**
  - **LLM**: Generate LaTeX + optional ATS analysis
  - **CLI**: Compile LaTeX → PDF
  - **Node.js core**: Deterministic ATS analysis
  - **Tanstack Start GUI**: PDF viewer + ATS visualization

---

## 2. Repository Structure

```
project-root/
  resume/
    base/
      plus-japan.md
      worldhacks.md

    jd/
      amazon_cse.md
      google_swe.md

    generated/
      amazon_cse/
        v1.tex
        v1.pdf
        ats_llm.json

  analysis/
    index.ts
    types.ts


  app/

  scripts/
    compile-latex.ts

  resume-template/
    template.tex
```

---

## 3. Base Experience Files (Markdown)

Each file in `resume/base/` describes one past role.

```
# Company: <Company Name>
# Period: YYYY/MM – YYYY/MM
# Role: <Job Title>

## Summary
One paragraph.

## Achievements
- Strong verb + measurable impact.
- One bullet per achievement.

## Key Projects
### <Project Name>
- Scope, responsibility, outcome.

## Stories (STAR)
### <Story Name>
S:
T:
A:
R:

## Skills Used
- TypeScript, React, AWS...
```

---

## 4. Job Description Files (Markdown)

Saved under `resume/jd/<jdName>.md`.

```
# Job Title

# Company

## Overview
Short summary.

## Responsibilities
- Bullet list extracted from JD.

## Requirements (Must-Have)
- Bullet list.

## Requirements (Nice-to-Have)
- Bullet list.

## Keywords
- EC2, Linux, VPC, Terraform...

## Raw JD (Optional)
Paste original JD text.
```

---

## 5. Resume Generation (User’s LLM)

ResumeForge **does not generate resumes**.  
The user’s IDE-integrated LLM (Cursor, Claude, Copilot, ChatGPT, etc.) produces:

- `resume/generated/<jd>/v1.tex` (LaTeX resume)
- optionally `resume/generated/<jd>/ats_llm.json` (LLM ATS analysis)

Example LLM prompt (not a code block to avoid escaping issues):

> Read all Markdown files under `resume/base/` and the target JD `resume/jd/amazon_cse.md`.  
> Generate an ATS-optimized LaTeX resume and output it as `resume/generated/amazon_cse/v1.tex`.  
> Then produce an ATS analysis JSON with strengths, weaknesses, missing keywords, and improvement suggestions as `resume/generated/amazon_cse/ats_llm.json`.

---

## 6. LaTeX → PDF Compilation (CLI)

The GUI does **not** compile LaTeX.  
Users compile manually through CLI/IDE:

```
resumeforge compile --jd amazon_cse
```

The CLI:

1. Reads `v1.tex`
2. Runs `tectonic` or `pdflatex`
3. Outputs `v1.pdf`

GUI only displays the result.

---

## 7. Node.js Analysis Core (Shared Between CLI & GUI)

Location: `analysis/index.ts`.

Exports:

```
analyzeResume(jdName: string): {
  core: {
    keywordMatch: number;        // 0–1
    missingKeywords: string[];
    similarity: number;          // 0–1 cosine similarity
    sections: {
      summary: boolean;
      skills: boolean;
      experience: boolean;
      projects: boolean;
      education: boolean;
    };
  };
  llmReport?: LlmAtsReport;       // optional
}
```

### What the analysis core does:

1. Read:

   - `resume/jd/<jd>.md`
   - `resume/generated/<jd>/v1.tex`
   - optional `resume/generated/<jd>/ats_llm.json`

2. Extract plain text from LaTeX
3. Perform deterministic ATS metrics:
   - Keyword matching
   - Missing keywords
   - TF-IDF similarity (JD vs resume)
   - Section completeness
4. Attach LLM feedback if present

Returned object is used identically in:

- GUI (`/api/ats/:jd`)
- CLI (`resumeforge analyze --jd <jd>`)

---

## 8. TanStack Start GUI — Viewer + Analyzer Only

The GUI is minimal and focused.

### It **does**:

- list JDs
- show JD markdown (read-only)
- preview PDF
- show ATS metrics
- show LLM feedback (if exists)

### It **does not**:

- edit base data
- edit JDs
- generate LaTeX
- compile LaTeX
- call any external API
- send any user data out of local machine

---

## 9. GUI Screens

### 9.1 JD List (`/`)

Shows all JD files in `resume/jd/`.

### 9.2 JD Detail (`/jd/:name`)

Renders raw markdown.

Also displays usage instructions:

- “Use your IDE + LLM to generate LaTeX for this JD.”

### 9.3 Resume Preview (`/resume/:jd/preview`)

Left: PDF viewer  
Right: ATS panels (core + optional LLM feedback)

If PDF not found:

> PDF not found.  
> Run `resumeforge compile --jd <jd>` to generate `v1.pdf`.

---

## 10. TanStack Start APIs (Used Only by GUI)

### `GET /api/pdf/:jd`

- Streams `v1.pdf`
- 404 if missing

### `GET /api/ats/:jd`

- Calls `analyzeResume(jd)`
- Returns:

```
{
  "core": { ... },
  "llmReport": { ... }
}
```

---

## 11. Security Model

- 100% local
- No external HTTP requests
- No API keys
- No telemetry
- Safe for confidential data (job apps, resume history)

---

## 12. Non-Goals (MVP)

- editing via GUI
- SaaS deployment
- cloud sync
- authentication
- LLM integration inside GUI
- resume versioning
- real-time collaboration

---

## 13. Optional Future Enhancements

- Compile-from-GUI button
- Versioning (`v2.tex`, `v3.tex`)
- Resume diff viewer
- JD comparison
- AI rewrite suggestions view
- Native desktop app (Tauri/Electron)

---

## 14. One-sentence Summary

**ResumeCraft is a fully local resume workflow where your LLM creates LaTeX, your CLI builds PDFs, and the GUI visualizes ATS metrics using a shared local analysis engine.**
