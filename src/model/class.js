const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    student_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    // student_ids: [{
    //     student_id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         required: true,
    //         ref: "User"
    //     }
    // }],
    status: {
        type: Boolean,
        default: false,
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    limit: {
        type: Number,
        require: true,
    }
});


classSchema.methods.classDetailJSON = function () {
    const user = this;
    const userObj = user.toObject();

    const studentList = [];

    userObj.student_ids.forEach((e) => {
        studentList.push(e.name);
    });

    return {
        name: userObj.name,
        teacher: userObj.teacher_id.name,
        students: studentList,
    }
}

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
