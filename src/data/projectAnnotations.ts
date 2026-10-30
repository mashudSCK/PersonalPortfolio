export type ProjectAnnotation = {
  label: string;
  detail: string;
  x: number;
  y: number;
};

// Positions correspond to the original screenshot, before the carousel crops it.
export const projectAnnotations: Record<string, ProjectAnnotation[]> = {
  "The Shelves of Mash": [
    {
      label: "Explore the Atlas",
      detail:
        "The Atlas connects ideas across the archive so readers can follow their curiosity.",
      x: 54,
      y: 11,
    },
    {
      label: "Thought of the day",
      detail:
        "A selected thought invites readers into the archive from the home page.",
      x: 47,
      y: 67,
    },
  ],
  Sulyap: [
    {
      label: "Optional name",
      detail:
        "Visitors can choose a name or enter the conversation anonymously.",
      x: 40,
      y: 51,
    },
    {
      label: "Start a conversation",
      detail: "The main action connects strangers for a brief real-time chat.",
      x: 60,
      y: 63,
    },
  ],
  "Do Your Tasks Pls": [
    {
      label: "Find a task",
      detail: "Search keeps tasks easy to find as the list grows.",
      x: 30,
      y: 9,
    },
    {
      label: "Task navigation",
      detail:
        "The sidebar brings together the task list, completed items, and settings.",
      x: 10,
      y: 17,
    },
  ],
  "NewsHub — Modern News Aggregator": [
    {
      label: "Browse topics",
      detail:
        "Category navigation gives readers a way to explore different subjects.",
      x: 28,
      y: 22,
    },
    {
      label: "Save stories",
      detail: "The saved section collects bookmarked stories for later.",
      x: 82,
      y: 12,
    },
  ],
  "Online Voting System (SKSU)": [
    {
      label: "Student elections",
      detail:
        "The landing page introduces a voting platform for student organizations.",
      x: 30,
      y: 73,
    },
    {
      label: "Voting portal",
      detail:
        "The system supports election workflows for students, officers, and administrators.",
      x: 71,
      y: 73,
    },
  ],
  "PSITS Clearance Management System": [
    {
      label: "Manage records",
      detail:
        "Administrators can work with attendance, fines, clearance, and user records.",
      x: 40,
      y: 16,
    },
    {
      label: "Clearance overview",
      detail:
        "The student list brings attendance, fines, membership, and clearance status together.",
      x: 67,
      y: 50,
    },
  ],
  "Weather Tracker Dashboard": [
    {
      label: "Dashboard overview",
      detail:
        "The dashboard summarizes cities, users, and stored weather logs.",
      x: 54,
      y: 28,
    },
    {
      label: "Recent weather",
      detail:
        "Recent updates show conditions, temperature, humidity, and when each reading was fetched.",
      x: 52,
      y: 67,
    },
  ],
  "Expense Tracker": [
    {
      label: "Total expenses",
      detail: "The dashboard shows the total in Philippine pesos.",
      x: 40,
      y: 29,
    },
    {
      label: "Expense categories",
      detail: "The category breakdown helps make spending easier to review.",
      x: 60,
      y: 55,
    },
  ],
};
