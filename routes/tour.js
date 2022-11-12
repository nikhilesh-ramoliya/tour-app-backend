import { Router } from "express";
import { DeleteTours, EditTour, getTours, getToursByuser } from "../controllers/tour.js";
import { createTour } from './../controllers/tour.js';
import { auth } from '../middlewares/auth.js';

const TourRouter = Router();

TourRouter.get("/", auth, getTours);
TourRouter.get("/user", auth, getToursByuser);
TourRouter.post("/", auth, createTour);
TourRouter.post("/edit", auth, EditTour);
TourRouter.delete("/:id", auth, DeleteTours);

export default TourRouter