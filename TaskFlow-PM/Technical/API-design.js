/**
 * TaskFlow API Design 
 * This document outlines the REST API endpoints for TaskFlow
 */

/**
 * API Structure:
 * 
 * Base URL: api.taskflow.com/v1
 * Authentication: OAuth 2.0
 * Response Format: JSON
 */

// 1. User API Endpoints
const userEndpoints = {
  // Get current user information
  GET_user: {
    path: '/users/me',
    response: {
      id: 'user-103',
      name: 'Alex Rodriguez',
      email: 'alex@example.com',
      role: 'team_member',
      preferences: {
        theme: 'light',
        notifications: {
          email: true,
          push: true,
          inApp: true
        },
        workHours: {
          start: 9,
          end: 17
        }
      }
    }
  },
  
  // Update user preferences
  PATCH_user_preferences: {
    path: '/users/me/preferences',
    request: {
      theme: 'dark',
      notifications: {
        email: false
      }
    },
    response: {
      // Updated user object
    }
  }
};

// 2. Task API Endpoints
const taskEndpoints = {
  // Get all tasks for user
  GET_tasks: {
    path: '/tasks',
    parameters: {
      status: 'in_progress,not_started',
      prioritized: true,
      limit: 50
    },
    response: {
      tasks: [
        // Array of task objects with priority scores
      ],
      count: 35,
      totalCount: 142
    }
  },
  
  // Create new task
  POST_task: {
    path: '/tasks',
    request: {
      title: 'Prepare quarterly report',
      description: 'Compile Q1 metrics and create presentation',
      dueDate: '2025-04-10T17:00:00Z',
      priority: 'high',
      project: 'project-12',
      assignee: 'user-103',
      estimatedHours: 4,
      tags: ['reporting', 'quarterly']
    },
    response: {
      // Created task object with ID
    }
  },
  
  // Update task
  PATCH_task: {
    path: '/tasks/:taskId',
    request: {
      status: 'in_progress',
      completionPercentage: 30
    },
    response: {
      // Updated task object
    }
  },
  
  // Get task by ID
  GET_task: {
    path: '/tasks/:taskId',
    response: {
      // Complete task object
    }
  },
  
  // Delete task
  DELETE_task: {
    path: '/tasks/:taskId',
    response: {
      success: true
    }
  }
};

// 3. Project API Endpoints
const projectEndpoints = {
  // Get all projects
  GET_projects: {
    path: '/projects',
    response: {
      projects: [
        // Array of project objects
      ]
    }
  },
  
  // Create new project
  POST_project: {
    path: '/projects',
    request: {
      name: 'Q2 Marketing Plan',
      description: 'Planning and execution of Q2 marketing strategy',
      startDate: '2025-04-01T00:00:00Z',
      endDate: '2025-06-30T23:59:59Z',
      team: ['user-101', 'user-102', 'user-103']
    },
    response: {
      // Created project object with ID
    }
  }
};

// 4. Analytics API Endpoints
const analyticsEndpoints = {
  // Get user productivity metrics
  GET_productivity: {
    path: '/analytics/productivity',
    parameters: {
      timeframe: 'last_30_days'
    },
    response: {
      tasksCompleted: 45,
      averageTimeToComplete: 2.3, // hours
      onTimeCompletion: 87, // percentage
      productiveHours: {
        morning: 65, // percentage
        afternoon: 45,
        evening: 70
      }
    }
  },
  
  // Get project status overview
  GET_project_status: {
    path: '/analytics/projects/:projectId/status',
    response: {
      completion: 68, // percentage
      tasksStatus: {
        not_started: 12,
        in_progress: 34,
        review: 8,
        completed: 46
      },
      riskFactors: [
        {
          type: 'delayed_tasks',
          count: 3,
          impact: 'medium'
        }
      ]
    }
  }
};

// API Documentation
console.log("TaskFlow API Documentation");
console.log("=========================");
console.log("\nUser Endpoints:");
console.log(JSON.stringify(userEndpoints, null, 2));
console.log("\nTask Endpoints:");
console.log(JSON.stringify(taskEndpoints, null, 2));
