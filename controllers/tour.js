import tourModel from "../models/tour.js";

export const createTour = async (req, res) => {
    const tour = req.body;
    const newTour = new tourModel({
        ...tour,
        creator: req.userId,
        createdAt: new Date()
    });
    try {
        await newTour.save();
        console.log("new tour created");
        res.status(201).json(newTour);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong in create" })
    }
}
export const EditTour = async (req, res) => {
    try {
        const newTour = await tourModel.findByIdAndUpdate({ _id: tour._id }, { title: tour.title, discription: tour.discription, tags: tour.tags, imageFile: tour.imageFile }, { new: true })
        console.log("edited successfully");
        res.status(201).json(newTour);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong in edit" })
    }
}

export const getTours = async (req, res) => {
    try {
        const tours = await tourModel.find({});
        console.log("get tours");
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: "something went wrong in gettours" })
    }
}
export const DeleteTours = async (req, res) => {
    const { id } = req.params;
    console.log('deleted sucessfully');
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
        console.log("tour by user");
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }
}