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
		ChatGPT: { level: "proficient", years: 2, notes: "General AI-assisted development" },
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
		repo: "https://github.com/MrRyanAlexander/api",
		docs: "https://docs.google.com/document/d/18ryHvfW2KFs4p-tw7IRjxh3XCFWzOSMb/edit",
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
		repo: "https://github.com/MrRyanAlexander/ryans-mcp-resume",
	},
};

const EXPERIENCE = [
	{
		company: "Tetra Tech, Inc.",
		location: "Remote / Field Deployments to NC, FL, TX an LA",
		roles: [
			{
				title: "Lead Data Manager",
				period: "Sep 2021 – Sep 2025",
				highlights: [
					"Ran daily data operations for the PPDR wind program across two Louisiana parishes as the lead data manager — handling contract setup, field ticket configuration, error resolution, and approving client reports.",
					"Managed up to six data managers simultaneously across active programs, setting daily priorities and resolving field data issues that blocked billing or FEMA submission.",
					"Worked daily with the company FEMA subject matter expert and Regional Operations PM; joined stakeholder calls to explain field data decisions and eligibility edge cases.",
					"Trained incoming data managers on operational systems, ticket workflows, GPS correction procedures, and FEMA documentation standards.",
					"Reviewed field data for FEMA eligibility across 10,000+ records in 20+ counties, identifying documentation gaps before audit review.",
					"The person PMs knew they could count on for quick answers and reliable data — got called back to project after project over 7 years because of that reliability.",
				],
			},
			{
				title: "Data Manager",
				period: "Sep 2018 – Sep 2021 (seasonal)",
				highlights: [
					"Managed field data operations across hurricane deployments in NC, FL, TX, and LA - monitoring error dashboards, correcting GPS and ticket data, coordinating with field supervisors, and submitting nightly reports to the client.",
					"Verified FEMA eligibility by cross-referencing field evidence, property records, and county GIS data against Stafford Act and 2 CFR Part 200 requirements.",
					"Compiled FEMA Project Worksheet documentation packages including photo evidence, property data, and EHP review materials across 4 federally declared disasters.",
				],
			},
		],
	},
	{
		company: "Clegg's Termite & Pest Control",
		location: "New Bern, NC",
		roles: [
			{
				title: "Sales & Inspection Associate",
				period: "Dec 2015 – Sep 2018",
				highlights: [
					"Customer-facing sales role focused on building trust and educating homeowners about moisture-related issues — the primary driver of pest problems, since most pests rely on water and a food source to survive.",
					"Conducted inspections, explained findings in plain language, and closed sales by focusing on what the customer actually needed rather than pushing product.",
				],
			},
		],
	},
];

const EDUCATION = [
	{
		name: "Startup Engineering",
		instructor: "Balaji Srinivasan",
		year: 2013,
		notes: "Online course that sparked a long-term interest in building software. I started learning to code around this time. Before that I only tinkered with HTML, even using Dreamweaver in the early days.",
	},
	{
		name: "Self-Directed Study",
		period: "2012 – Present",
		notes: "Ongoing study in data systems, computer science: AI tooling, automation, and development. While I have no formal CS degree, I've learned by building things.",
	},
];

// ============================================================
// DISCOVERY QUESTIONS — What YOU want to learn about the company
// ============================================================

interface DiscoveryQuestion {
	id: string;
	question: string;
	why: string; // why this matters to the candidate
}

const DISCOVERY_QUESTIONS: Record<string, DiscoveryQuestion[]> = {
	tech_stack: [
		{
			id: "tech-1",
			question: "What does the current tech stack look like — languages, frameworks, infra?",
			why: "Need to gauge how much ramp-up vs. immediate contribution is realistic.",
		},
		{
			id: "tech-2",
			question: "How are deployment pipelines set up? CI/CD, staging environments, rollback procedures?",
			why: "Tells me how mature the engineering org is operationally.",
		},
		{
			id: "tech-3",
			question: "How is the team approaching AI/LLM tooling internally — experimenting, adopting, or waiting?",
			why: "This is where I can add the most value fastest. Want to know if there's appetite for it.",
		},
	],
	team_and_culture: [
		{
			id: "team-1",
			question: "How big is the team I'd be working with, and how are responsibilities divided?",
			why: "Need to understand if this is a 'wear many hats' role or a specialized one.",
		},
		{
			id: "team-2",
			question: "What does a typical day or week look like for someone in this role?",
			why: "Best way to understand the actual job vs. the job description.",
		},
		{
			id: "team-3",
			question: "How does the team handle disagreements on technical direction?",
			why: "Reveals decision-making culture — top-down vs. collaborative.",
		},
	],
	role_and_growth: [
		{
			id: "role-1",
			question: "What does success look like in the first 90 days?",
			why: "Shows whether expectations are realistic and well-defined.",
		},
		{
			id: "role-2",
			question: "What's the biggest challenge the team is facing right now that this role would help with?",
			why: "Tells me the real reason they're hiring — not the polished version.",
		},
		{
			id: "role-3",
			question: "Is there room to grow into architecture or leadership, or is this a heads-down IC role long-term?",
			why: "Want to know the ceiling before I commit.",
		},
	],
	remote_and_logistics: [
		{
			id: "remote-1",
			question: "What's the remote/hybrid/on-site situation, and is that likely to change?",
			why: "Based in St. Louis — need to know what flexibility looks like.",
		},
		{
			id: "remote-2",
			question: "What tools does the team use for async communication and collaboration?",
			why: "Good async tooling signals a team that knows how to work distributed.",
		},
	],
	process_and_standards: [
		{
			id: "process-1",
			question: "How does code review work? What's the bar for shipping?",
			why: "Tells me how much autonomy vs. oversight to expect.",
		},
		{
			id: "process-2",
			question: "How are on-call or incident response responsibilities handled?",
			why: "Need to know what the after-hours commitment looks like.",
		},
	],
};

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
		for (const role of exp.roles) {
			const allText = [role.title, exp.company, ...role.highlights].join(" ").toLowerCase();
			if (allText.includes(t)) {
				results.push(
					`[Experience] ${role.title} at ${exp.company} (${role.period}):\n` +
						role.highlights.map((h) => `  • ${h}`).join("\n"),
				);
			}
		}
	}

	// Search education
	for (const edu of EDUCATION) {
		const eduText = [edu.name, edu.notes].join(" ").toLowerCase();
		if (eduText.includes(t)) {
			results.push(`[Education] ${edu.name} — ${edu.notes}`);
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

	// Phase 2: track which discovery questions have been asked this session
	private askedQuestions = new Set<string>();
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
					...EXPERIENCE.flatMap((e) =>
						e.roles.map(
							(r) => `  • ${r.title} at ${e.company} (${r.period})`,
						),
					),
					``,
					`## Education`,
					...EDUCATION.map(
						(e) => `  • ${e.name}${"instructor" in e ? ` (${e.instructor})` : ""} — ${e.notes}`,
					),
				].join("\n");

				return { content: [{ type: "text", text }] };
			},
		);

		// ========================================================
		// PHASE 2 TOOLS: Discovery Questions
		// ========================================================

		// --- Tool: get_all_discovery_topics ---
		this.server.tool(
			"get_all_discovery_topics",
			"List all discovery question categories and how many questions remain unasked in each. " +
				"Use this to see what the candidate still wants to learn about the company.",
			{},
			async () => {
				const lines: string[] = [`# Discovery Topics for ${PROFILE.name}\n`];

				for (const [category, questions] of Object.entries(DISCOVERY_QUESTIONS)) {
					const remaining = questions.filter((q) => !this.askedQuestions.has(q.id));
					const label = category.replace(/_/g, " ").toUpperCase();
					lines.push(
						`## ${label}  (${remaining.length}/${questions.length} remaining)`,
					);
					for (const q of questions) {
						const status = this.askedQuestions.has(q.id) ? "✓ asked" : "○ pending";
						lines.push(`  ${status} — ${q.question}`);
					}
					lines.push("");
				}

				const totalRemaining = Object.values(DISCOVERY_QUESTIONS)
					.flat()
					.filter((q) => !this.askedQuestions.has(q.id)).length;

				lines.push(`---\n**${totalRemaining} questions remaining overall.**`);

				return { content: [{ type: "text", text: lines.join("\n") }] };
			},
		);

		// --- Tool: get_discovery_question ---
		this.server.tool(
			"get_discovery_question",
			"Get the next unasked discovery question for a given category (or any category if not specified). " +
				"Marks the question as asked. Categories: tech_stack, team_and_culture, role_and_growth, " +
				"remote_and_logistics, process_and_standards.",
			{
				category: z
					.string()
					.optional()
					.describe(
						"Category to pull from (e.g. 'tech_stack', 'team_and_culture'). " +
							"Leave empty to get the next question from any category.",
					),
				context: z
					.string()
					.optional()
					.describe(
						"Optional: the current conversation topic. Helps pick the most relevant question.",
					),
			},
			async ({ category, context }) => {
				let pool: { category: string; question: DiscoveryQuestion }[] = [];

				if (category && DISCOVERY_QUESTIONS[category]) {
					// Pull from the specified category
					pool = DISCOVERY_QUESTIONS[category]
						.filter((q) => !this.askedQuestions.has(q.id))
						.map((q) => ({ category, question: q }));
				} else {
					// Pull from all categories
					for (const [cat, questions] of Object.entries(DISCOVERY_QUESTIONS)) {
						for (const q of questions) {
							if (!this.askedQuestions.has(q.id)) {
								pool.push({ category: cat, question: q });
							}
						}
					}
				}

				if (pool.length === 0) {
					const scope = category ? `the "${category}" category` : "any category";
					return {
						content: [
							{
								type: "text",
								text: `All discovery questions in ${scope} have been asked this session. ` +
									`Use get_all_discovery_topics to see the full status.`,
							},
						],
					};
				}

				// If context is provided, do a basic keyword relevance match
				let pick = pool[0];
				if (context) {
					const ctx = context.toLowerCase();
					const scored = pool.map((entry) => {
						const text = (entry.question.question + " " + entry.question.why).toLowerCase();
						const words = ctx.split(/\s+/);
						const hits = words.filter((w) => w.length > 3 && text.includes(w)).length;
						return { entry, hits };
					});
					scored.sort((a, b) => b.hits - a.hits);
					pick = scored[0].entry;
				}

				// Mark as asked
				this.askedQuestions.add(pick.question.id);

				const totalRemaining = Object.values(DISCOVERY_QUESTIONS)
					.flat()
					.filter((q) => !this.askedQuestions.has(q.id)).length;

				const output = [
					`**Category:** ${pick.category.replace(/_/g, " ")}`,
					`**Question:** ${pick.question.question}`,
					`**Why this matters to ${PROFILE.name}:** ${pick.question.why}`,
					``,
					`_${totalRemaining} discovery questions remaining this session._`,
				].join("\n");

				return { content: [{ type: "text", text: output }] };
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