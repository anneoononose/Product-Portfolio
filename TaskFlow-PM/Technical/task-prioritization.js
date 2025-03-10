/**
 * TaskFlow Prioritization Algorithm
 * 
 * This algorithm demonstrates the core intelligence behind TaskFlow's
 * task prioritization system. It analyzes multiple factors to determine
 * the optimal work sequence for each user.
 */

// Sample task data for demonstration
const tasks = [
  {
    id: "task-1",
    title: "Finalize Q1 marketing plan",
    dueDate: "2025-03-15",
    priority: "high",
    project: "marketing-plan",
    status: "in_progress",
    estimatedHours: 4,
    blockedBy: [],
    tags: ["marketing", "planning", "quarterly"]
  },
  {
    id: "task-2",
    title: "Review competitor analysis report",
    dueDate: "2025-03-01",
    priority: "medium", 
    project: "marketing-plan",
    status: "not_started",
    estimatedHours: 2,
    blockedBy: [],
    tags: ["analysis", "competitor", "research"]
  },
  {
    id: "task-3",
    title: "Update website product page",
    dueDate: "2025-02-28",
    priority: "high",
    project: "website-updates",
    status: "not_started",
    estimatedHours: 3,
    blockedBy: ["task-6"],
    tags: ["website", "product", "content"]
  }
];

// User preferences data
const userPreferences = {
  "user-103": {
    productivityPeaks: ["morning", "evening"], // when user is most productive
    focusPreference: "batch-similar", // batch similar tasks together
    preferredWorkingHours: { start: 9, end: 17 }, // 9am to 5pm
    taskTypePreference: {
      "analysis": 0.8, // user enjoys and is effective at analysis tasks
      "writing": 0.7,
      "meetings": 0.4 // user doesn't prefer meetings
    }
  }
};

/**
 * Prioritizes tasks based on multiple weighted factors
 * 
 * @param {Array} tasks - List of tasks to prioritize
 * @param {String} userId - User ID to prioritize tasks for
 * @returns {Array} - Sorted array of tasks with priority scores
 */
function prioritizeTasks(tasks, userId) {
  const now = new Date();
  const userPrefs = userPreferences[userId] || {};
  const currentHour = now.getHours();
  const isProductiveTime = userPrefs.productivityPeaks?.includes(
    currentHour >= 5 && currentHour < 12 ? "morning" :
    currentHour >= 12 && currentHour < 17 ? "afternoon" :
    "evening"
  ) || false;
  
  // Weight configuration for different factors
  const weights = {
    dueDate: 0.3,
    priority: 0.2,
    dependencies: 0.15,
    projectImportance: 0.15,
    effort: 0.1,
    userPreference: 0.1
  };
  
  // Process each task to add a priority score
  const scoredTasks = tasks.map(task => {
    // Calculate due date factor (higher score for closer due dates)
    const dueDate = new Date(task.dueDate);
    const daysUntilDue = Math.max(0, (dueDate - now) / (1000 * 60 * 60 * 24));
    let dueDateFactor;
    
    if (daysUntilDue <= 1) {
      dueDateFactor = 1; // Due today or tomorrow
    } else if (daysUntilDue <= 3) {
      dueDateFactor = 0.9; // Due in 2-3 days
    } else if (daysUntilDue <= 7) {
      dueDateFactor = 0.7; // Due this week
    } else {
      dueDateFactor = 0.5; // Due in more than a week
    }
    
    // Calculate priority factor
    const priorityFactor = 
      task.priority === "urgent" ? 1 :
      task.priority === "high" ? 0.8 :
      task.priority === "medium" ? 0.5 :
      0.3; // low
    
    // Calculate dependency factor
    // If task is blocked, lower its priority
    const isBlocked = task.blockedBy.length > 0;
    const dependencyFactor = isBlocked ? 0.2 : 0.9;
    
    // Calculate user preference factor
    let userPreferenceFactor = 0.5; // default neutral value
    
    if (userPrefs.taskTypePreference) {
      // Check if any tags match user's preferred task types
      const matchingTags = task.tags.filter(tag => userPrefs.taskTypePreference[tag]);
      
      if (matchingTags.length > 0) {
        // Average the preference values for matching tags
        const averagePreference = matchingTags.reduce(
          (sum, tag) => sum + (userPrefs.taskTypePreference[tag] || 0), 
          0
        ) / matchingTags.length;
        
        userPreferenceFactor = averagePreference;
      }
    }
    
    // Calculate the weighted score for this task
    const weightedScore = (
      weights.dueDate * dueDateFactor +
      weights.priority * priorityFactor +
      weights.dependencies * dependencyFactor +
      weights.userPreference * userPreferenceFactor
    );
    
    // Return the original task with the priority score added
    return {
      ...task,
      priorityScore: weightedScore
    };
  });
  
  // Sort by priority score
  return scoredTasks.sort((a, b) => b.priorityScore - a.priorityScore);
}

// Test the algorithm
const prioritizedTasks = prioritizeTasks(tasks, "user-103");
console.log("Prioritized Tasks:");
prioritizedTasks.forEach((task, index) => {
  console.log(`${index + 1}. ${task.title} (Score: ${task.priorityScore.toFixed(2)})`);
});

// Export the function for use in the application
module.exports = { prioritizeTasks };
