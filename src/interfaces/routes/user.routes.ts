import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
} from "../controllers/user.controller";

const router = Router();

router.post("/", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

export { router as userRouter };
