import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  speaker: {
    name: { 
      type: String 
    },
      email: { 
      type: String 
    }
  },
  // date: { 
  //   type: Date 
  // },
  duration: { 
    type: Number, 
    default: 1 
  },
  eventType: { 
    type: String, 
    enum: ['Seminar', 'Conference', 'Workshop', 'Webinar'] 
  },
  tags: [{ 
    type: String 
  }],
  isOnline: { 
    type: Boolean, 
    default: false 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model('Event', EventSchema);