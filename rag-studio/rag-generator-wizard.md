# RAG Generator Wizard (React + Tailwind + shadcn/ui)

## Goal
Create a modern multi-step RAG configuration wizard component in React + TypeScript, using Tailwind CSS and shadcn/ui (Accordion, Checkbox, Progress).  

### Component Name
`RAGGeneratorWizard.tsx`

### Requirements
- Each section collapsible via Accordion
- A green ✅ check appears beside the title once section completed (temporary state)
- All sections open by default (accordionType="multiple")
- Buttons: “Validate Connection”, “Next Section”, “Save Configuration”
- Use `useState` for form state
- Layout should feel like Azure Portal or OpenAI Studio
- Responsive design with padding, shadowed cards
- Include all configuration sections below

---

### Sections (in order)

1️⃣ **Project Details**
   - Project Name (text)
   - Department (dropdown)
   - Description (textarea)

2️⃣ **Data Connector**
   - Connector Type (Confluence, Jira, SharePoint, Azure DevOps, File Upload)
   - Connection String
   - “Validate Connection” button

3️⃣ **Chunking Strategy**
   - Strategy (dropdown: Recursive, Paragraph, Semantic, Graph-based)
   - Max Tokens per Chunk (number)
   - Overlap Percentage (number)

4️⃣ **PII Filtering**
   - Filter Mode (None, Regex, LLM-based)
   - Show example mask preview (dummy)

5️⃣ **Embedding Model**
   - Provider (Azure OpenAI, OpenAI Ada, Hugging Face, Custom)
   - Embedding Endpoint (URL)
   - Vector Dimension (number)

6️⃣ **Vector Store**
   - Cloud (Azure, AWS, On-Prem)
   - Vector DB (Cognitive Search, OpenSearch, PGVector, Qdrant)
   - Namespace (text)

7️⃣ **Reranking Provider**
   - Provider (None, Cosine, Cohere, Azure Cognitive)
   - Weight (slider 0–1)

8️⃣ **LLM Model**
   - Model (GPT-4-Turbo, Claude-3, Gemini, Mistral)
   - Temperature (slider 0–1)
   - Max Tokens (number)

9️⃣ **Governance Policy**
   - Policy (None, Strict, Audit-Only)
   - “Require Approval before Querying” (checkbox)

---

### Behaviour
- Accordion opens multiple sections at once  
- Each section header shows a ✅ icon if its local inputs are non-empty (simple check)  
- `handleSave()` prints full JSON config to console  
- `validateConnection()` simulates async validation  
- Add subtle fade animations when opening/closing sections  

---

### Libraries
- React 18+
- Tailwind CSS
- shadcn/ui (Accordion, Button, Input, Label, Slider, Checkbox)
- Lucide React (CheckCircle, ChevronDown icons)

---

### Command
@workspace
Generate full TypeScript React component as described.
Ensure code runs standalone inside src/pages/RAGGeneratorWizard.tsx.
