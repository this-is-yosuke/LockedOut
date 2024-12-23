import express from 'express';
import { Attempt, User, Room } from '../../models/index.js';  

const attemptRoutes = express.Router(); // Renamed router to attemptRoutes

// POST request to save an attempt
attemptRoutes.post('/attempt', async (req, res) => {
  const { userId, roomId, success, startTime, endTime } = req.body;

  try {
      // Find the user and room
      const user = await User.findByPk(userId);
      const room = await Room.findByPk(roomId);

      if (!user || !room) {
          return res.status(400).json({ message: 'Invalid user or room ID' });
      }

      // Fetch the current attempt number (increment from previous attempts)
      const lastAttempt = await Attempt.findOne({
          where: {
              userID: userId,
              roomID: roomId,
          },
          order: [['attemptNumber', 'DESC']], // Get the latest attempt
      });

      const attemptNumber = lastAttempt ? lastAttempt.attemptNumber + 1 : 1; // If no last attempt, start with 1

      // Create a new attempt record, omitting `id`
      const attempt = await Attempt.create({
          userID: userId,
          roomID: roomId,
          attemptNumber,
          startTime,
          endTime,
          isSuccessful: success,
      });

      return res.status(201).json({ message: 'Attempt recorded successfully', attempt });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
  }
});

export default attemptRoutes; // Export with the new name