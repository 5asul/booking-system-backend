import { body } from "express-validator";

export const validateBooking = [
  body("appointment_date").trim().notEmpty().withMessage("Appointment date is required"),
  body("doctorId").trim().notEmpty().withMessage("Doctor id is required"),
];

export const validateDoctor = [
  
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email").trim().notEmpty().withMessage("Email is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
  body("specialist").trim().notEmpty().withMessage("Specialist is required"),
  body("workingTime").trim().notEmpty().withMessage("WorkingTime is required"),
];
