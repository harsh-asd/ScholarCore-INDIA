export const applicantData = {
  id: "APP-10293",
  name: "John Doe",
  email: "john.doe@example.com",
  appliedRole: "Software Engineer",
  status: "In Progress",
  timeline: [
    { step: 1, title: "Application Submitted", date: "2023-10-01", status: "completed" },
    { step: 2, title: "Under Review", date: "2023-10-05", status: "completed" },
    { step: 3, title: "Technical Interview", date: "2023-10-12", status: "current" },
    { step: 4, title: "Final Decision", date: null, status: "pending" }
  ]
};

export const pendingApplications = [
  { id: "APP-10294", name: "Alice Smith", role: "Frontend Developer", date: "2023-10-15", status: "Pending Review" },
  { id: "APP-10295", name: "Bob Johnson", role: "Backend Engineer", date: "2023-10-14", status: "Under Review" },
  { id: "APP-10296", name: "Charlie Brown", role: "UI/UX Designer", date: "2023-10-12", status: "Interview" },
  { id: "APP-10297", name: "Diana Prince", role: "Data Scientist", date: "2023-10-10", status: "Pending Review" },
  { id: "APP-10298", name: "Evan Wright", role: "Product Manager", date: "2023-10-09", status: "Under Review" }
];
