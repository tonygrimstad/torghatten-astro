# Documentation

This directory contains all project documentation, organized by category.

---

## 📂 Directory Structure

```
docs/
├── development/        # Technical documentation
│   ├── DEV.md          # Architecture and implementation guide
│   ├── DEPLOYMENT.md   # Deployment to Domeneshop via GitHub Actions
│   └── local-fixes.md  # Local workarounds and fixes
│
├── standards/          # Development standards and guidelines
│   ├── accessibility.md      # WCAG 2.1 AA requirements
│   ├── a11y-components.md    # Component-specific accessibility rules
│   ├── typography.md         # Readability and prose usage
│   ├── images.md             # Image usage, alt-text, and performance
│   ├── design-system.md      # Colors, typography, and UI rules
│   ├── i18n.md               # Language and translation rules
│   ├── seo.md                # SEO guidelines and metadata
│   └── components.md         # Component standards and patterns
│
├── content/            # Content guidelines
│   └── content-guide.md      # Content structure and plain language
│
├── ai-agents/          # AI assistant instructions
│   ├── CLAUDE.md       # Claude-specific instructions
│   ├── GEMINI.md       # Gemini-specific instructions
│   ├── AGENT.md        # General agent instructions
│   └── AGENTS.md       # Multi-agent coordination
│
├── adr/                # Architecture Decision Records
│   └── decisions.md    # Architectural decisions and rationale
│
└── drafts/             # Work in progress
    └── om_md.md        # Draft documentation
```

---

## 📖 How to Use This Documentation

### For New Contributors

Start with these files in order:

1. **[`../README.md`](../README.md)** - Project overview and setup
2. **[`../CONTRIBUTING.md`](../CONTRIBUTING.md)** - Contribution guidelines
3. **[`development/DEV.md`](development/DEV.md)** - Technical architecture

### For Specific Tasks

| Task | Relevant Docs |
|------|---------------|
| **Adding new pages** | [`development/DEV.md`](development/DEV.md), [`standards/i18n.md`](standards/i18n.md) |
| **Styling components** | [`standards/design-system.md`](standards/design-system.md), [`standards/typography.md`](standards/typography.md) |
| **Accessibility fixes** | [`standards/accessibility.md`](standards/accessibility.md), [`standards/a11y-components.md`](standards/a11y-components.md) |
| **Adding images** | [`standards/images.md`](standards/images.md) |
| **Writing content** | [`content/content-guide.md`](content/content-guide.md), [`standards/typography.md`](standards/typography.md) |
| **SEO improvements** | [`standards/seo.md`](standards/seo.md) |
| **Translations** | [`standards/i18n.md`](standards/i18n.md) |
| **Deployment** | [`development/DEPLOYMENT.md`](development/DEPLOYMENT.md) |

### For AI Assistants

AI agents should primarily reference:
- **[`.github/copilot-instructions.md`](../.github/copilot-instructions.md)** - Main Copilot instructions
- **[`ai-agents/`](ai-agents/)** directory for agent-specific guidance

---

## 🎯 Documentation Philosophy

**Living Documentation:**
- Update docs when code changes
- Keep examples current
- Remove outdated information
- Link related documents

**Clarity Over Completeness:**
- Short, actionable guidelines
- Examples over lengthy explanations
- Quick reference tables
- Clear "Do/Don't" sections

**Standards Enforce Quality:**
- WCAG 2.1 AA compliance
- Consistent code patterns
- Maintainable architecture
- User-focused design

---

## ✏️ Contributing to Documentation

When adding or updating documentation:

1. **Choose the right location:**
   - Technical? → `development/`
   - Code standards? → `standards/`
   - Content guidelines? → `content/`
   - Architectural decision? → `adr/`

2. **Follow the format:**
   - Use Markdown
   - Include table of contents for long docs
   - Add cross-references to related docs
   - Keep language clear and concise

3. **Update cross-references:**
   - If you move a doc, update all references
   - Check `README.md`, `CONTRIBUTING.md`, `.github/copilot-instructions.md`

4. **Test examples:**
   - Ensure code examples work
   - Verify file paths are correct
   - Check links aren't broken

---

## 🔍 Finding Information

**Can't find what you need?**

1. Check the main [`README.md`](../README.md) index
2. Use your IDE's search (Ctrl+Shift+F / Cmd+Shift+F)
3. Look in related directories (e.g., if it's about styling, check `standards/`)
4. Check Git history - maybe the doc was moved or renamed

**Still stuck?**
- Open an issue describing what you're looking for
- We'll help you find it or create missing documentation

---

## 📚 External References

- **Astro**: https://docs.astro.build
- **Tailwind CSS**: https://tailwindcss.com/docs
- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **TypeScript**: https://www.typescriptlang.org/docs/

---

*Last updated: 2026-02-25*
