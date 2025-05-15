package com.example.todolist.controller;

import com.example.todolist.model.Task;
import com.example.todolist.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@Tag(name = "Task", description = "Task management APIs")
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    @Operation(summary = "Get all tasks", description = "Retrieves a list of all tasks in the system")
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }
    
    @Operation(
        summary = "Get task by ID",
        description = "Retrieves a specific task by its ID",
        responses = {
            @ApiResponse(responseCode = "200", description = "Task found"),
            @ApiResponse(responseCode = "404", description = "Task not found")
        }
    )
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@Parameter(description = "ID of the task to retrieve") @PathVariable Long id) {
        return taskService.getTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @Operation(summary = "Create new task", description = "Creates a new task in the system")
    @PostMapping
    public Task createTask(@Parameter(description = "Task object to be created") @RequestBody Task task) {
        return taskService.createTask(task);
    }
    
    @Operation(
        summary = "Update task",
        description = "Updates an existing task by ID",
        responses = {
            @ApiResponse(responseCode = "200", description = "Task updated successfully"),
            @ApiResponse(responseCode = "404", description = "Task not found")
        }
    )
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @Parameter(description = "ID of the task to update") @PathVariable Long id,
            @Parameter(description = "Updated task object") @RequestBody Task taskDetails) {
        try {
            Task updatedTask = taskService.updateTask(id, taskDetails);
            return ResponseEntity.ok(updatedTask);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @Operation(
        summary = "Delete task",
        description = "Deletes a task from the system by ID",
        responses = {
            @ApiResponse(responseCode = "200", description = "Task deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Task not found")
        }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@Parameter(description = "ID of the task to delete") @PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
 