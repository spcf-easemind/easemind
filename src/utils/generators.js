export const generators = {
  generateThumbnail: (videoFile) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      video.preload = "metadata";
      video.src = URL.createObjectURL(videoFile);

      video.onloadedmetadata = () => {
        video.currentTime = 1;
      };

      video.onseeked = () => {
        // Draw the video frame on the canvas
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to image data URL (this will be your thumbnail)
        const thumbnailDataUrl = canvas.toDataURL("image/jpeg", 0.5);
        resolve(thumbnailDataUrl);
      };

      video.onerror = (error) => {
        reject(error);
      };
    });
  },
};
