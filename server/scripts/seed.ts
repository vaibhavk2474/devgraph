import "dotenv/config";
import { driver } from "../src/config/database.js";


// Developer ──WORKED_ON──> Project
// Developer ──KNOWS──> Technology
// Project ──USES──> Technology
// Developer ──WORKED_AT──> Company
// Technology ──RELATED_TO──> Technology
// Project ──HAS_REPOSITORY──> Repository

//nodes
const developers = [
    {
        id: "dev-1",
        name: "Vaibhav Kumar",
        role: "Frontend Engineer",
    },
    {
        id: "dev-2",
        name: "Rahul Sharma",
        role: "Backend Engineer",
    },
    {
        id: "dev-3",
        name: "Priya Singh",
        role: "Full Stack Engineer",
    },
];

const projects = [
    {
        id: "project-1",
        name: "PRIME360",
        description: "Business services management portal",
    },
    {
        id: "project-2",
        name: "PersonalNotes",
        description: "Note management application",
    },
    {
        id: "project-3",
        name: "Hiring Platform",
        description: "AI-powered hiring platform",
    },
];

const technologies = [
    {
        id: "tech-1",
        name: "React",
        category: "Frontend",
    },
    {
        id: "tech-2",
        name: "TypeScript",
        category: "Language",
    },
    {
        id: "tech-3",
        name: "Node.js",
        category: "Backend",
    },
    {
        id: "tech-4",
        name: "AWS",
        category: "Cloud",
    },
    {
        id: "tech-5",
        name: "MongoDB",
        category: "Database",
    },
];
const companies = [
    {
        id: "company-1",
        name: "Qudasoft",
    },
    {
        id: "company-2",
        name: "IncipientInfo",
    },
    {
        id: "company-3",
        name: "Solulab",
    },
    {
        id: "company-4",
        name: "Wexa AI",
    },
];

// relationships
const developerProjects = [
    {
        developerId: "dev-1",
        projectId: "project-1",
    },
    {
        developerId: "dev-1",
        projectId: "project-2",
    },
    {
        developerId: "dev-2",
        projectId: "project-3",
    },
    {
        developerId: "dev-3",
        projectId: "project-1",
    },
];

const projectTechnologies = [
    {
        projectId: "project-1",
        technologyId: "tech-1",
    },
    {
        projectId: "project-1",
        technologyId: "tech-2",
    },
    {
        projectId: "project-1",
        technologyId: "tech-4",
    },
    {
        projectId: "project-2",
        technologyId: "tech-1",
    },
    {
        projectId: "project-2",
        technologyId: "tech-2",
    },
    {
        projectId: "project-2",
        technologyId: "tech-5",
    },
    {
        projectId: "project-3",
        technologyId: "tech-1",
    },
    {
        projectId: "project-3",
        technologyId: "tech-3",
    },
];

const developerCompanies = [
    {
        developerId: "dev-1",
        companyId: "company-4",
    },
    {
        developerId: "dev-1",
        companyId: "company-1",
    },
    {
        developerId: "dev-2",
        companyId: "company-4",
    },
];

const technologyRelations = [
    {
        fromTechnologyId: "tech-1",
        toTechnologyId: "tech-2",
    },
    {
        fromTechnologyId: "tech-1",
        toTechnologyId: "tech-3",
    },
    {
        fromTechnologyId: "tech-4",
        toTechnologyId: "tech-3",
    },
];

async function seed() {
    try {
        // Create developers
        for (const developer of developers) {
            await driver.executeQuery(
                `
        MERGE (d:Developer {id: $id})
        SET d.name = $name,
            d.role = $role
        `,
                developer
            );
        }

        // Create projects
        for (const project of projects) {
            await driver.executeQuery(
                `
        MERGE (p:Project {id: $id})
        SET p.name = $name,
            p.description = $description
        `,
                project
            );
        }

        // Create Developer -> Project relationships
        for (const relation of developerProjects) {
            await driver.executeQuery(
                `
                MATCH (d:Developer {id: $developerId})
                MATCH (p:Project {id: $projectId})
                MERGE (d)-[:WORKED_ON]->(p)
            `,
                relation
            );
        }

        // Create Technologies
        for (const technology of technologies) {
            await driver.executeQuery(
                `
            MERGE (t:Technology {id: $id})
            SET t.name = $name,
                t.category = $category
            `,
                technology
            );
        }

        // Create Project -> Technology relationships
        for (const relation of projectTechnologies) {
            await driver.executeQuery(
                `
            MATCH (p:Project {id: $projectId})
            MATCH (t:Technology {id: $technologyId})
            MERGE (p)-[:USES]->(t)
            `,
                relation
            );
        }

        // Create Developer -> Company relationships
        for (const company of companies) {
            await driver.executeQuery(
                `
            MERGE (c:Company {id: $id})
            SET c.name = $name
            `,
                company
            );
        }

        for (const relation of developerCompanies) {
            await driver.executeQuery(
                `
            MATCH (d:Developer {id: $developerId})
            MATCH (c:Company {id: $companyId})
            MERGE (d)-[:WORKED_AT]->(c)
            `,
                relation
            );
        }


        // Create Technology -> Technology relationships
        for (const relation of technologyRelations) {
            await driver.executeQuery(
                `
            MATCH (from:Technology {id: $fromTechnologyId})
            MATCH (to:Technology {id: $toTechnologyId})
            MERGE (from)-[:RELATED_TO]->(to)
            `,
                relation
            );
        }
        console.log("✅ Seed completed successfully");
    } catch (error) {
        console.error("❌ Seed failed:", error);
        process.exitCode = 1;
    } finally {
        await driver.close();
    }
}

seed();