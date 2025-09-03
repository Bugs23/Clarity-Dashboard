export function getLocation() {
  return new Promise((resolve, reject) => {
    // Check if the browser supports geolocation
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    // Request current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        // Handle errors
        reject(error);
      }
    );
  });
}
