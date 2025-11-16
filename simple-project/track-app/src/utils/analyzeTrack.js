// Haversine distance between two coordinates (in meters)
function haversineMeters(lat1, lon1, lat2, lon2) {
    const toRad = deg => (deg * Math.PI) / 180;
    const R = 6371000; // Earth radius in meters

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

// Analyze a list of GPS points to compute distance, time, speeds
function analyzeTrack(points, options) {
    const minAccuracy = options?.minAccuracy ?? 50; // meters
    const minDistance = options?.minDistance ?? 3;  // meter jitter ignore

    if (!points || points.length < 2) {
        return {
            totalDistance: 0,
            totalTime: 0,
            avgSpeed: 0,
            segments: []
        };
    }

    // Filter points with bad accuracy
    const valid = points.filter(p =>
        typeof p.coords.accuracy === "number"
            ? p.coords.accuracy <= minAccuracy
            : true
    );

    if (valid.length < 2) {
        return {
            totalDistance: 0,
            totalTime: 0,
            avgSpeed: 0,
            segments: []
        };
    }

    let totalDistance = 0;
    const segments = [];

    const startTime = valid[0].timestamp;
    const endTime = valid[valid.length - 1].timestamp;

    for (let i = 1; i < valid.length; i++) {
        const a = valid[i - 1];
        const b = valid[i];

        const dtMs = b.timestamp - a.timestamp;
        const dt = dtMs > 0 ? dtMs / 1000 : 0; // seconds

        const d = haversineMeters(
            a.coords.latitude,
            a.coords.longitude,
            b.coords.latitude,
            b.coords.longitude
        );

        const distance = d >= minDistance ? d : 0;
        const speed = dt > 0 ? distance / dt : 0;

        totalDistance += distance;

        segments.push({
            distance,  // meters
            duration: dt, // seconds
            speed      // m/s
        });
    }

    const totalTime = Math.max(0, (endTime - startTime) / 1000);
    const avgSpeed = totalTime > 0 ? totalDistance / totalTime : 0;

    return {
        totalDistance,  // meters
        totalTime,      // seconds
        avgSpeed,       // m/s
        avgSpeedKph: avgSpeed, // m/s to get km/h (m/s * 3.6)
        segments
    };
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
}

export { haversineMeters, analyzeTrack, formatTime };
