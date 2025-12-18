import fs from 'fs'; 
import { generateManimCodeREST } from "../api/apiRequest.js";
import { ApiError } from "../utils/apiErrorResponse.js";
import { ApiResponse } from "../utils/apiSendResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { executeManimCode } from "../utils/executeManimCode.js";

const generateVideoControllerBase64 = asyncHandler(async (req, res) => {
  const { userPrompt } = req.body;

  if (!userPrompt) {
    throw new ApiError(400, "User Prompt is required", []); 
  }

  const filePath = await generateManimCodeREST(userPrompt);
  const videoPath = await executeManimCode(filePath);
  const videoBuffer = fs.readFileSync(videoPath);
  const base64Video = videoBuffer.toString('base64');

  res.json(new ApiResponse(
    200,
    {
      video: `data:video/mp4;base64,${base64Video}`,
      message: 'Video generated successfully'
    },
    'Video generated successfully' 
  ));
});

export { generateVideoControllerBase64 };