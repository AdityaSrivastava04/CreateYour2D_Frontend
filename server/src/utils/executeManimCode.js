async function executeManimCode(filePath) {
  const videoDir = path.dirname(filePath);
  const mediaDir = path.join(videoDir, 'media');

  if (fs.existsSync(mediaDir)) {
    fs.rmSync(mediaDir, { recursive: true, force: true });
  }

  console.log('Executing Manim code...');

  try {
    const { stdout, stderr } = await execPromise(
      `manim -ql ${filePath} video --media_dir ${mediaDir}`,
      { cwd: videoDir }
    );

    console.log('Manim output:', stdout);
    if (stderr) console.error('Manim stderr:', stderr);
    const videoOutputDir = path.join(mediaDir, 'videos', 'video', '480p15');
    
    if (!fs.existsSync(videoOutputDir)) {
      throw new Error('Video output directory not found');
    }

    const files = fs.readdirSync(videoOutputDir);
    const videoFile = files.find(f => f.endsWith('.mp4'));

    if (!videoFile) {
      throw new Error('No video file generated');
    }

    const videoPath = path.join(videoOutputDir, videoFile);
    console.log('Video generated at:', videoPath);

    return videoPath;

  } catch (error) {
    console.error('Manim execution error:', error);
    throw new Error(`Failed to execute Manim: ${error.message}`);
  }
}

export {executeManimCode}