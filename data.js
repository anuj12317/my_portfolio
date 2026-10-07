/**
 * ====================================================================
 * PORTFOLIO DATA CONFIGURATION
 * ====================================================================
 * Edit this file to update your personal details, skills, projects,
 * education, and social links without touching index.html!
 * 
 * Simply edit the text and arrays below and save the file.
 * ====================================================================
 */

const portfolioData = {
  // 1. Personal & Contact Information
  personal: {
    name: "Anuj",
    role: "Aspiring Data Analyst",
    tagline: "Aspiring Data Analyst | CSE @ JECRC University",
    location: "Jaipur, Rajasthan, India",
    university: "JECRC University, Jaipur",
    degree: "B.Tech in Computer Science & Engineering",
    email: "anuj@example.com", // Replace with your real email
    github: "https://github.com/anuj", // Replace with your GitHub URL
    linkedin: "https://linkedin.com/in/anuj", // Replace with your LinkedIn URL
    resumeUrl: "resume.pdf", // Path to your resume PDF
    avatarUrl: "profile.jpg", // Path to your profile image
    
    // Formspree Form ID:
    // 1. Go to https://formspree.io and create a free account
    // 2. Create a form and copy your Form ID (e.g., 'mqkvzylw')
    // 3. Paste it here:
    formspreeId: "your_form_id", 

    shortIntro:
      "Passionate about uncovering meaningful patterns within complex datasets. I combine algorithmic problem-solving with statistical analysis, SQL querying, and interactive Power BI dashboards to transform raw metrics into actionable business decisions."
  },

  // 2. About Section Information
  about: {
    bio: [
      "I am a Computer Science & Engineering undergraduate at JECRC University, Jaipur, with a focused career aspiration in Data Analytics, Business Intelligence, and Data Engineering.",
      "My analytical journey revolves around extracting clarity from messy data. Whether crafting normalized SQL schemas, building data transformation pipelines with Python (Pandas & NumPy), or synthesizing KPIs into executive-ready dashboards in Power BI and Excel, I strive to bridge the gap between technical data structures and real-world strategic decisions."
    ],
    currentlyLearning: [
      "Advanced SQL Window Functions, CTEs & Query Optimization",
      "Statistical Hypothesis Testing & Exploratory Data Analysis (EDA)",
      "DAX Measures and Data Modeling in Power BI",
      "Scikit-Learn fundamentals for predictive classification & regression"
    ],
    highlights: [
      {
        icon: "🎓",
        title: "Education",
        detail: "B.Tech CSE @ JECRC University"
      },
      {
        icon: "📍",
        title: "Location",
        detail: "Jaipur, Rajasthan, India"
      },
      {
        icon: "💡",
        title: "Primary Focus",
        detail: "Data Analytics, SQL & BI"
      },
      {
        icon: "🚀",
        title: "Availability",
        detail: "Open to Internships & Projects"
      }
    ]
  },

  // 3. Skills Grouped by Category
  skillCategories: [
    {
      category: "Programming & Querying",
      description: "Core languages for pipeline building, data manipulation, and database querying.",
      skills: [
        {
          name: "Python",
          level: "Proficient",
          description: "Scripting, EDA, automation, data wrangling",
          badgeColor: "python"
        },
        {
          name: "SQL",
          level: "Proficient",
          description: "Complex joins, aggregations, CTEs, subqueries, indexing",
          badgeColor: "sql"
        }
      ]
    },
    {
      category: "Data Analysis & Manipulation",
      description: "Libraries and tools used to clean, aggregate, and reshape structured datasets.",
      skills: [
        {
          name: "Pandas",
          level: "Proficient",
          description: "DataFrame operations, missing values, grouping, pivot tables",
          badgeColor: "pandas"
        },
        {
          name: "NumPy",
          level: "Intermediate",
          description: "Vectorized computations, multidimensional arrays, math operations",
          badgeColor: "numpy"
        },
        {
          name: "Microsoft Excel",
          level: "Advanced",
          description: "VLOOKUP/XLOOKUP, Pivot Tables, conditional formatting, data cleaning",
          badgeColor: "excel"
        }
      ]
    },
    {
      category: "Business Intelligence & Analytics",
      description: "Tools for translating numbers into visual, stakeholder-ready stories.",
      skills: [
        {
          name: "Power BI",
          level: "Proficient",
          description: "Interactive dashboards, star schema modeling, DAX measures",
          badgeColor: "powerbi"
        },
        {
          name: "Statistics",
          level: "Intermediate",
          description: "Descriptive metrics, probability distributions, hypothesis testing",
          badgeColor: "statistics"
        },
        {
          name: "ML Basics",
          level: "Foundational",
          description: "Linear regression, logistic regression, clustering concepts",
          badgeColor: "ml"
        }
      ]
    },
    {
      category: "Tools & Development Workflow",
      description: "Version control and collaborative engineering environments.",
      skills: [
        {
          name: "Git & GitHub",
          level: "Proficient",
          description: "Version control, branching, PR reviews, open source",
          badgeColor: "git"
        },
        {
          name: "Jupyter Notebook",
          level: "Proficient",
          description: "Reproducible research, markdown reporting, visual exploration",
          badgeColor: "jupyter"
        }
      ]
    }
  ],

  // 4. Projects Portfolio
  // Each project can have multiple tags for the interactive tag filter
  projects: [
    {
      id: "ecommerce-analytics",
      title: "E-Commerce Customer Segmentation & Sales Insights",
      description:
        "Comprehensive Exploratory Data Analysis (EDA) of 100,000+ orders. Uncovered purchasing patterns, seasonality trends, and RFM customer clusters to identify high-value customer cohorts.",
      tags: ["Python", "Pandas", "EDA", "Statistics"],
      metric: "100k+ records analyzed • RFM Segmentation",
      githubUrl: "https://github.com/anuj/ecommerce-sales-analysis",
      liveUrl: "https://github.com/anuj/ecommerce-sales-analysis#readme",
      featured: true
    },
    {
      id: "powerbi-executive-dashboard",
      title: "Global Superstore Executive Sales & Profit Dashboard",
      description:
        "Interactive multi-page Power BI dashboard providing dynamic drill-through analytics across global regions, product sub-categories, shipping modes, and margin profit leakages.",
      tags: ["Power BI", "Excel", "Data Viz"],
      metric: "Multi-page interactive report • Custom DAX measures",
      githubUrl: "https://github.com/anuj/powerbi-superstore-report",
      liveUrl: "https://github.com/anuj/powerbi-superstore-report#readme",
      featured: true
    },
    {
      id: "sql-retention-db",
      title: "Employee Attrition & Performance SQL Analytics Engine",
      description:
        "Engineered relational database queries to analyze employee attrition triggers. Built complex CTEs and window functions evaluating tenure, salary tiers, and satisfaction metrics.",
      tags: ["SQL", "Database", "Analytics"],
      metric: "Complex Window Functions • Relational Data Modeling",
      githubUrl: "https://github.com/anuj/sql-employee-retention",
      liveUrl: "https://github.com/anuj/sql-employee-retention#readme",
      featured: true
    },
    {
      id: "telecom-churn-ml",
      title: "Telecom Customer Churn Risk Analysis & Modeling",
      description:
        "Data cleaning and predictive analysis pipeline using Pandas and NumPy. Performed correlation diagnostics, feature scaling, and evaluated churn propensity across customer contracts.",
      tags: ["Python", "NumPy", "Pandas", "ML Basics"],
      metric: "84% classification accuracy • Feature importance insights",
      githubUrl: "https://github.com/anuj/telecom-churn-analysis",
      liveUrl: "https://github.com/anuj/telecom-churn-analysis#readme",
      featured: false
    },
    {
      id: "financial-excel-analyzer",
      title: "Automated Financial & KPI Audit Workbook",
      description:
        "Advanced Excel analytical model utilizing dynamic array formulas (XLOOKUP, FILTER), automated pivot caches, and sensitivity analysis models to forecast operational expenses.",
      tags: ["Excel", "Statistics", "Data Viz"],
      metric: "Automated Pivot Workflows • Scenario Modeling",
      githubUrl: "https://github.com/anuj/excel-financial-model",
      liveUrl: "https://github.com/anuj/excel-financial-model#readme",
      featured: false
    },
    {
      id: "covid-sql-exploration",
      title: "Global Health Metrics & Vaccination SQL Explorer",
      description:
        "Extracted, transformed, and queried longitudinal public health datasets using PostgreSQL. Calculated moving averages, infection fatality rates, and rolling vaccination metrics.",
      tags: ["SQL", "Statistics", "Python"],
      metric: "Rolling aggregations • Multi-table joins",
      githubUrl: "https://github.com/anuj/sql-covid-tracker",
      liveUrl: "https://github.com/anuj/sql-covid-tracker#readme",
      featured: false
    }
  ],

  // 5. Education Timeline
  education: [
    {
      period: "2023 — 2027 (Expected)",
      degree: "B.Tech in Computer Science & Engineering",
      institution: "JECRC University, Jaipur",
      status: "In Progress",
      description:
        "Specializing in Computer Science fundamentals with focused coursework in Database Management Systems (DBMS), Python Programming, Data Structures & Algorithms, Object-Oriented Design, and Applied Statistics.",
      achievements: [
        "Core focus in Data Analytics, Database Systems, and Applied Mathematics",
        "Active member of Technical & Coding Student Communities"
      ]
    },
    {
      period: "2021 — 2023",
      degree: "Senior Secondary Education (Class XII - Science PCM)",
      institution: "Central Board of Secondary Education (CBSE)",
      status: "Completed",
      description:
        "Rigorous foundation in Physics, Chemistry, and Advanced Mathematics, developing strong analytical thinking and quantitative reasoning.",
      achievements: [
        "Strong quantitative and logical reasoning background",
        "Participated in science and mathematical competitions"
      ]
    }
  ]
};
