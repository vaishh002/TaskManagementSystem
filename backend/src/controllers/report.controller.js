import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import Report from '../models/report.model.js';
import Task from '../models/task.model.js';
import Project from '../models/project.model.js';
import Team from '../models/team.model.js';
import ApiError from '../utils/ApiError.js';
import { checkWorkspaceRole } from '../utils/checkWorkspaceRole.js';

// Team member submits a report
export const submitReport = asyncHandler(async (req, res) => {
    const { taskId, reportText } = req.body;
    const user = req.user;

    if (!taskId || !reportText) {
        throw new ApiError(400, "taskId and reportText are required");
    }

    const task = await Task.findById(taskId);
    if (!task) throw new ApiError(404, "Task not found");

    if (task.memberId.toString() !== user._id.toString()) {
        throw new ApiError(403, "You can only submit reports for tasks assigned to you");
    }

    const report = await Report.create({
        taskId,
        memberId: user._id,
        reportText
    });

    return res.status(201).json(new ApiResponse(201, report, "Daily report submitted successfully"));
});

// Admin, Manager, or Team Leader can view reports for a task
export const getReportsByTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    
    const task = await Task.findById(taskId);
    if (!task) throw new ApiError(404, "Task not found");

    const project = await Project.findById(task.projectId);
    
    let isAuthorized = false;
    
    // Check if Team Member who owns the task
    if (task.memberId.toString() === req.user._id.toString()) {
        isAuthorized = true;
    }

    // Check if Admin or Manager
    if (!isAuthorized) {
        try {
            isAuthorized = await checkWorkspaceRole(req, project.workspaceId);
        } catch (e) {}
    }

    // Check if Team Leader
    if (!isAuthorized) {
        const team = await Team.findOne({
            projectId: project._id,
            teamLeader: req.user._id,
            team: task.memberId
        });
        if (team) {
            isAuthorized = true;
        }
    }

    if (!isAuthorized) {
        throw new ApiError(403, "Not authorized to view these reports");
    }

    const reports = await Report.find({ taskId }).sort({ date: -1 }).populate("memberId", "name email avatar");

    return res.status(200).json(new ApiResponse(200, reports, "Reports fetched successfully"));
});
