import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    login: { type: String, required: true},
    pass: { type: String, required: true },
    items: {
        type: [{
            id: {type: String, required: true},
            text: {type: String, required: true},
            checked: {type: Boolean, required: true},        
        }],
        required: false
    }
}, { versionKey: false, timestamps: true });

export default mongoose.model('Todo', userSchema);