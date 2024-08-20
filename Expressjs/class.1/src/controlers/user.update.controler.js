const User = require('../modals/user.modal.js');
const updateUser = async (req,res)=>{
    try {
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, updatedData, { new: true });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
module.exports ={
    updateUser
}