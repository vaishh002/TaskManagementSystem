import { Router } from "express";
import { createWorkspace, getWorkspaces, getWorkspaceById, addWorkspaceManager, inviteUserToWorkspace, updateWorkspaceMemberRole, removeWorkspaceMember } from "../controllers/workspace.controller.js";
import { verifyJWT, verifySuperuser, verifyWorkspaceAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Routes for superuser
router.route("/create").post(verifyJWT, verifySuperuser, createWorkspace);

router.route("/add-manager/:workspaceId").post(verifyJWT, addWorkspaceManager);
router.route("/invite-user/:workspaceId").post(verifyJWT, inviteUserToWorkspace);

// Member Management
router.route("/:workspaceId/role/:userId").patch(verifyJWT, verifyWorkspaceAdmin, updateWorkspaceMemberRole);
router.route("/:workspaceId/member/:userId").delete(verifyJWT, verifyWorkspaceAdmin, removeWorkspaceMember);

// Routes for all authenticated users
router.route("/all").get(verifyJWT, getWorkspaces);
router.route("/:workspaceId").get(verifyJWT, getWorkspaceById);


export default router;





// // Routes for superuser
// router.route("/create").post(createWorkspace);
// router.route("/add-manager/:workspaceId").post(addWorkspaceManager);

// // Routes for all authenticated users
// router.route("/all").get(getWorkspaces);
// router.route("/:workspaceId").get(getWorkspaceById);

// export default router;
