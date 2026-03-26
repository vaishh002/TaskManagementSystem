import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import Task from '../models/task.model.js';
import ApiError from '../utils/ApiError.js';
import Project from '../models/project.model.js';
import User from '../models/user.model.js';
import Team from '../models/team.model.js';
import { checkWorkspaceRole } from '../utils/checkWorkspaceRole.js';


const createNewTask = asyncHandler(async(req,res)=>{

    const { projectId, memberId, date, description, status, remark } = req.body

    const user = req.user;

    if([projectId, memberId, date, description, status].some((field)=>  String(field).trim() === "")) {
      throw new ApiError(400, "Required fields are missing")
    }

    const project = await Project.findById(projectId)
    if (!project) throw new ApiError(404, "Project not found")

    const member = await User.findById(memberId)
    if (!member) throw new ApiError(404, "User not found")

    let isAuthorized = false;
    try {
        isAuthorized = await checkWorkspaceRole(req, project.workspaceId);
    } catch (e) {
        // checkWorkspaceRole throws if workspace is not found, handled below
    }

    if (!isAuthorized) {
        // If not Admin/Manager, check if they are the Team Leader for this member in this project 
        const team = await Team.findOne({
            projectId: project._id,
            teamLeader: user._id,
            team: member._id
        });
        if (team) {
            isAuthorized = true;
        }
    }

    if (!isAuthorized) {
        throw new ApiError(403, "Not authorized to assign tasks to this member. Only Admins, Managers, and their Team Leader can do this.");
    }

    await Task.create({
        projectId: project._id,
        memberId: member._id,
        date: new Date(date),
        remark: remark || "",
        status,
        description,
        submittedBy: user._id
    })

    return res.status(200).json(new ApiResponse(200, {}, "Create New Task Successfully"))
})


const getAllTask = asyncHandler(async(req,res)=>{
    const { projectId } = req.params;

    let query = {};
    if (projectId) {
        query.projectId = projectId;
    }

    const allTask = await Task.find(query)
        .populate("projectId", "projectName description startDate deadline")
        .populate("memberId", "name email phone role")
        .populate("submittedBy", "name email")
        .lean();

    return res.status(200).json(new ApiResponse(200 , allTask, "fetch all task Successfully"))
})

// update task
const updateTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { date, description, status, remark } = req.body;

    const task = await Task.findById(taskId);
    if (!task) throw new ApiError(404, "Task not found");

    const project = await Project.findById(task.projectId);
    
    let isAuthorized = false;
    try {
        isAuthorized = await checkWorkspaceRole(req, project.workspaceId);
    } catch(e) {}

    if (!isAuthorized) {
        const team = await Team.findOne({
            projectId: project._id,
            teamLeader: req.user._id,
            team: task.memberId
        });
        if (team) isAuthorized = true;
    }

    if (!isAuthorized) throw new ApiError(403, "Not authorized to edit this task");

    if (date) task.date = new Date(date);
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (remark !== undefined) task.remark = remark;

    await task.save();

    return res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
});

export {
  createNewTask,
  getAllTask,
  updateTask
}
