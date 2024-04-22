export const LocationService = {
    getNavigatorLocation: async () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    resolve(position);
                });
            } else {
                reject("Geolocation is not supported by this browser.");
            }
        });
    }
}