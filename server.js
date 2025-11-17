const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();

// --------------------------
// JSON parsing middleware
// --------------------------
app.use(express.json());

// --------------------------
// Handle invalid JSON (return 500)
// --------------------------
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(500).json({
      success: false,
      error: 'Internal server error (invalid JSON)'
    });
  }
  next();
});

// --------------------------
// In-memory task storage
// --------------------------
const tasks = [
  { id: 1, title: 'Sample Task', completed: false },
  { id: 2, title: ' Task 2', completed: false },
  { id: 3, title: ' Task 3', completed: false },
  { id: 4, title: ' Task 4', completed: false },
  { id: 5, title: ' Task 5', completed: false }

  
];

app.locals.tasks = tasks;

// --------------------------
// Mount router
// --------------------------
app.use('/tasks', taskRouter);

// --------------------------
// Start server
// --------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
