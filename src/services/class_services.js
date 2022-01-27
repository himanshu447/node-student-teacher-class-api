const Class = require('../model/class');
const moment = require('moment');

exports.ClassServices = {

    async createClass(values) {
        try {
            const classData = Class({
                ...values,
                student_ids: []
            });
            await classData.save();
            return classData;
        } catch (e) {
            throw e;
        }
    },

    async addStudent(value, classId, teacherId) {
        try {
            const allowUpdate = ['student_ids'];
            const userProvidedKey = Object.keys(value);
            const isAllowToUpdate = userProvidedKey.every((e) => allowUpdate.includes(e));

            if (!isAllowToUpdate) {
                throw new Error('Please check the filed for update');
            }

            const classData = await Class.findOne({ _id: classId });

            if (!classData) {
                throw new Error('Class not found');
            }
            console.log(classData);
            console.log(teacherId);
            
            if (!classData.teacher_id.equals(teacherId)) {
                throw new Error('You have no access to Add student in this class');
            }

            const list = classData.student_ids || [];
            value.student_ids.forEach((e) => {
                if (!list.includes(e)) {
                    list.push(e);
                }
            });

            classData.student_ids = list;
            await classData.save();
            return classData;
        } catch (e) {
            throw e;
        }
    },

    async removeStudent(classId, teacherId, studentId) {
        try {

            const classData = await Class.findOne({ _id: classId });

            if (!classData) {
                throw new Error('Class not found');
            }

            if (!classData.teacher_id.equals(teacherId)) {
                throw new Error('You have no access to Add student in this class');
            }

            const data = Class.findByIdAndUpdate({ _id: classId }, { $pull: { student_ids: studentId } }, { new: true });
            return data;
        } catch (e) {
            throw e;
        }
    },

    async getClass(classId) {
        try {
            const classData = await Class.findOne({ _id: classId }).populate('teacher_id').populate('student_ids');
            return classData.classDetailJSON();
        } catch (e) {
            throw e;
        }
    },

    async startClass(classId, teacherId) {
        try {
            const classData = await Class.findOne({ _id: classId });

            if (!classData) {
                throw new Error('Class not found');
            }
            if (!classData.teacher_id.equals(teacherId)) {
                throw new Error('You have no access to Add student in this class');
            }
            classData.startTime = new Date();
            classData.status = true;
            classData.save();
            return classData;
        } catch (e) {
            throw e;
        }
    },

    async endClass() {
        try {
            const activeClass = await Class.find({ status: true });
            const now = moment(new Date());

            activeClass.forEach(async (el) => {
                const endDateTime = moment(el.startTime).add(1, 'hours');

                if (endDateTime.isBefore(now)) {
                    const update = await Class.findByIdAndUpdate({ _id: el._id }, {
                        $set: {
                            status: false,
                            endTime: now.toDate(),
                        }
                    }, { new: true });
                }
            });
        } catch (e) {
            throw e;
        }
    }
}