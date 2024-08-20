const sendSuccessResponse = (res,message,data=null)=>{
    res.status(200).json({success:true, message,data})
};
const sendErrorResponse = (res, message, data = null,) => {
    res.status(400).json({ success: false, message, data });
};
const sendServerErrorResponse = (res, message) => {
    res.status(500).json({ success: false, message });
};
 
module.exports={
    sendSuccessResponse,
    sendErrorResponse,
    sendServerErrorResponse
}