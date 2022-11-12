import Express from "express";
import tourModel from "../models/tour.js";

export const createTour = async (req, res) => {
    const tour = req.body;
    // console.log(req.userId);
    const newTour = new tourModel({
        ...tour,
        creator: req.userId,
        createdAt: new Date()
    });
    try {
        const a = await newTour.save();
        console.log("new tour created");
        res.status(201).json(newTour);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })
    }
}
export const EditTour = async (req, res) => {
    const tour = req.body;
    console.log("title", tour.title);
    console.log(tour._id);
    try {
        const newTour = await tourModel.findByIdAndUpdate({ _id: tour._id }, { title: tour.title, discription: tour.discription, tags: tour.tags, imageFile: tour.imageFile })
        res.status(201).json(newTour);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })
    }
}

export const getTours = async (req, res) => {
    try {
        const tours = await tourModel.find({});
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }
}
export const DeleteTours = async (req, res) => {
    const { id } = req.params;
    console.log("i ma here:", id);
    try {
        const tours = await tourModel.findByIdAndDelete({ _id: id });
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: "something went wrong delete" })
    }
}
export const getToursByuser = async (req, res) => {
    try {
        const tours = await tourModel.find({ creator: req.userId });
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }
}