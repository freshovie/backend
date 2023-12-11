const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/mongo-exercises")
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.log("could not connect to MongoDB...", err));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ 'string' ],
    date: { type: Date, default: Date.now },
    price: Number,
    isPublished: Boolean
    })
const Course = mongoose.model("Course", courseSchema)

async function getCourses() {
    const courses = await Course
    .find({ isPublished: true, tags: 'backend', author: 'Mosh' })
    .or([{ name: 'Mosh'}, {isPublished: false}, {price: {$gte: 15}}])
    .select({name: 1, tags: 1 })
    .sort({ price: -1 })
    .select({name: 1, author: 1, price: 15})
    console.log(courses);
}
getCourses();

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.author = 'James Brown';

    const result = await Course.save();
    console.log(result);
}
updateCourse()

async function removeCourse(id) {
    const result = await
    Course.deleteOne({ _id: id});
    console.log(result)
}