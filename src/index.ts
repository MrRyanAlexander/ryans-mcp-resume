import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { z } from "zod";

// ============================================================
// RESUME DATA — Edit this to match YOUR background
// ============================================================

const PROFILE = {
	name: "Ryan A. Price",
	title: "Field Data Operations Professional & AI Builder",
	summary:
		"7 years in FEMA disaster recovery programs managing data teams and daily operations " +
		"across multiple active deployments. Responsible for keeping records clean, compliant, " +
		"and audit-ready under real field conditions. Recently directed the design and deployment " +
		"of an AI agent coordination system as a self-directed project, using Claude and other " +
		"LLM tools throughout. Comfortable working in ambiguous, fast-moving environments where " +
		"the tools exist but someone has to make them work.",
	location: "St. Louis, MO",
	contact: {
		phone: "252-617-2216",
		email: "ryanalex314@gmail.com",
	},
	links: {
		github: "https://github.com/MrRyanAlexander",
		linkedin: "https://linkedin.com/in/mrryanalexander/",
	},
};

interface Skill {
	level: "expert" | "proficient" | "familiar";
	years: number;
	notes: string;
}

const SKILLS: Record<string, Record<string, Skill>> = {
	data_and_reporting: {
		"Microsoft Excel": { level: "expert", years: 7, notes: "Advanced formulas, Power Query, PivotTables" },
		"Google Sheets": { level: "expert", years: 7, notes: "Daily reporting and field data ops" },
		SharePoint: { level: "proficient", years: 5, notes: "Document management and team coordination" },
	},
	field_and_compliance: {
		"RecoveryTrac ADMS": { level: "expert", years: 7, notes: "Primary field data management system for FEMA disaster recovery" },
		"County GIS Portals": { level: "proficient", years: 7, notes: "Property verification, eligibility cross-referencing" },
		"ERP Systems": { level: "proficient", years: 5, notes: "Operational tracking and reporting" },
	},
	geospatial: {
		"ESRI ArcGIS": { level: "proficient", years: 5, notes: "Mapping, spatial analysis for field ops" },
		"Google Earth Pro": { level: "proficient", years: 7, notes: "GPS validation, field verification" },
		"GPS Validation": { level: "expert", years: 7, notes: "Correction procedures for field ticket data" },
	},
	ai_tools: {
		Claude: { level: "expert", years: 2, notes: "Primary AI tool — prompt engineering, agent orchestration, MCP development" },
		Gemini: { level: "proficient", years: 1, notes: "Multi-model workflows" },
		OpenAi: { level: "proficient", years: 2, notes: "General AI-assisted development" },
		"Prompt Engineering": { level: "expert", years: 2, notes: "Systematic prompt design for complex workflows" },
		"AI Agent Orchestration": { level: "proficient", years: 1, notes: "Multi-agent coordination systems" },
	},
	technical: {
		"REST API": { level: "proficient", years: 2, notes: "API design and integration" },
		SQL: { level: "proficient", years: 3, notes: "Data querying, reporting" },
		"Node.js": { level: "proficient", years: 2, notes: "Backend services, MCP servers" },
		Git: { level: "proficient", years: 2, notes: "Version control, collaboration" },
		Linux: { level: "proficient", years: 2, notes: "Server management, CLI workflows" },
		SSH: { level: "proficient", years: 2, notes: "Remote server access and management" },
	},
};

interface Project {
	description: string;
	tech: string[];
	highlights: string[];
	role: string;
	year: number;
}

const PROJECTS: Record<string, Project> = {
	"ai-agent-coordination-system": {
		description:
			"Self-directed proof-of-concept built in March 2026. Directed the architecture and deployment " +
			"of an API enabling two autonomous AI agents to share data about simulated emergency operations " +
			"across jurisdictions. Used AI-assisted workflows throughout development. All design decisions, " +
			"infrastructure management, domain translation, and validation was on me.",
		tech: ["Node.js", "REST API", "Claude", "AI Agent Orchestration", "Git"],
		highlights: [
			"Two autonomous AI agents sharing data across simulated jurisdictions",
			"Full architecture and deployment directed solo with AI-assisted workflows",
			"Build logs and test reports published on GitHub",
		],
		role: "Solo — architect, developer, and validator",
		year: 2026,
	},
	"reverse-interview-mcp": {
		description:
			"An MCP server deployed on Cloudflare Workers that acts as a digital representative in interviews. " +
			"It answers questions about my background while strategically gathering info about the company.",
		tech: ["TypeScript", "Cloudflare Workers", "MCP SDK", "Zod"],
		highlights: [
			"Stateless MCP server with tool-based architecture",
			"Quid-pro-quo conversation strategy built into tool design",
			"Deployed at the edge with zero cold-start",
		],
		role: "Solo developer",
		year: 2026,
	},
};

const EXPERIENCE = [
	{
		title: "Full-Stack Developer",
		company: "Self-Employed / Contract",
		period: "2022 – Present",
		summary:
			"Building AI-powered tools, automation pipelines, and internal dashboards for small teams. " +
			"Focus on shipping fast with TypeScript, Cloudflare Workers, and LLM integrations.",
	},
	{
		title: "Software Developer",
		company: "Previous Company",
		period: "2019 – 2022",
		summary:
			"Developed and maintained web applications and backend services. " +
			"Led migration from legacy PHP to Node.js/React stack.",
	},
];

// ============================================================
// HELPER: search resume data by topic keyword
// ============================================================

function searchBackground(topic: string): string {
	const t = topic.toLowerCase();
	const results: string[] = [];

	// Search skills
	for (const [category, skills] of Object.entries(SKILLS)) {
		for (const [name, info] of Object.entries(skills)) {
			if (name.toLowerCase().includes(t) || category.toLowerCase().includes(t) || info.notes.toLowerCase().includes(t)) {
				results.push(`[Skill] ${name} — ${info.level}, ${info.years}yr — ${info.notes}`);
			}
		}
	}

	// Search projects
	for (const [name, proj] of Object.entries(PROJECTS)) {
		if (
			name.toLowerCase().includes(t) ||
			proj.description.toLowerCase().includes(t) ||
			proj.tech.some((tech) => tech.toLowerCase().includes(t))
		) {
			results.push(
				`[Project] ${name}: ${proj.description} (Tech: ${proj.tech.join(", ")})`,
			);
		}
	}

	// Search experience
	for (const exp of EXPERIENCE) {
		if (exp.summary.toLowerCase().includes(t) || exp.title.toLowerCase().includes(t)) {
			results.push(`[Experience] ${exp.title} at ${exp.company} (${exp.period}): ${exp.summary}`);
		}
	}

	// Profile-level match
	if (PROFILE.summary.toLowerCase().includes(t) || PROFILE.title.toLowerCase().includes(t)) {
		results.push(`[Profile] ${PROFILE.name} — ${PROFILE.title}. ${PROFILE.summary}`);
	}

	if (results.length === 0) {
		return `No specific info found for "${topic}". Try broader terms like "typescript", "ai", "automation", "react", or "backend".`;
	}

	return results.join("\n\n");
}

// ============================================================
// MCP SERVER
// ============================================================

export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "Digital Representative",
		version: "1.0.0",
	});

	async init() {
		// --- Tool: get_background ---
		this.server.tool(
			"get_background",
			"Search the candidate's background by topic. Returns matching skills, projects, and experience. Try keywords like 'typescript', 'ai', 'automation', 'react', 'python', 'backend'.",
			{ topic: z.string().describe("Keyword to search across skills, projects, and experience") },
			async ({ topic }) => ({
				content: [{ type: "text", text: searchBackground(topic) }],
			}),
		);

		// --- Tool: list_skills ---
		this.server.tool(
			"list_skills",
			"List all skill categories and skills. Returns a structured overview of the candidate's technical abilities.",
			{},
			async () => {
				const lines: string[] = [];
				for (const [category, skills] of Object.entries(SKILLS)) {
					lines.push(`\n## ${category.replace(/_/g, " ").toUpperCase()}`);
					for (const [name, info] of Object.entries(skills)) {
						lines.push(`  • ${name} — ${info.level} (${info.years}yr) — ${info.notes}`);
					}
				}
				return {
					content: [{ type: "text", text: `# Skills for ${PROFILE.name}\n${lines.join("\n")}` }],
				};
			},
		);

		// --- Tool: get_project_detail ---
		this.server.tool(
			"get_project_detail",
			"Get detailed information about a specific project. Use list_skills or get_background first to discover project names.",
			{
				project_name: z.string().describe(
					"Project name (e.g. 'reverse-interview-mcp', 'internal-dashboard', 'automation-pipeline')",
				),
			},
			async ({ project_name }) => {
				const key = project_name.toLowerCase().replace(/\s+/g, "-");
				const proj = PROJECTS[key];

				if (!proj) {
					const available = Object.keys(PROJECTS).join(", ");
					return {
						content: [
							{
								type: "text",
								text: `Project "${project_name}" not found. Available projects: ${available}`,
							},
						],
					};
				}

				const detail = [
					`# ${project_name}`,
					``,
					`**Role:** ${proj.role}`,
					`**Year:** ${proj.year}`,
					`**Tech:** ${proj.tech.join(", ")}`,
					``,
					`## Description`,
					proj.description,
					``,
					`## Highlights`,
					...proj.highlights.map((h) => `  • ${h}`),
				].join("\n");

				return { content: [{ type: "text", text: detail }] };
			},
		);

		// --- Tool: get_profile ---
		this.server.tool(
			"get_profile",
			"Get the candidate's profile summary, title, location, and links.",
			{},
			async () => {
				const text = [
					`# ${PROFILE.name}`,
					`**${PROFILE.title}** — ${PROFILE.location}`,
					``,
					PROFILE.summary,
					``,
					`## Links`,
					...Object.entries(PROFILE.links).map(([k, v]) => `  • ${k}: ${v}`),
					``,
					`## Experience`,
					...EXPERIENCE.map(
						(e) => `  • ${e.title} at ${e.company} (${e.period})\n    ${e.summary}`,
					),
				].join("\n");

				return { content: [{ type: "text", text }] };
			},
		);
	}
}

// ============================================================
// WORKER ENTRYPOINT
// ============================================================

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		if (url.pathname === "/mcp") {
			return MyMCP.serve("/mcp").fetch(request, env, ctx);
		}

		return new Response("Not found", { status: 404 });
	},
};