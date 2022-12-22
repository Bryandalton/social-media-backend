const {Thoughts, Reaction, User} = require('../models');


module.exports = {
    getThoughts(req, res) {
        Thoughts.find()
        .then((Thoughts) => res.json(Thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thoughts.findOne({_id: req.params.thoughtsId})
        .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thoughts.create(req.body)
          .then((thought) => res.json(thought))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
      deleteThoughts(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.courseId })
          .then((course) =>
            !course
              ? res.status(404).json({ message: 'No course with that ID' })
              : Student.deleteMany({ _id: { $in: course.students } })
          )
          .then(() => res.json({ message: 'Course and students deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
    
};