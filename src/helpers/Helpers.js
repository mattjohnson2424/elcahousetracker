export function calculateTotalPoints(points, students) {
    // Create a map to store the total points earned by each student
    const totalPointsMap = new Map();
    // console.log("In helper", points,students)
  
    // Iterate through the list of points
    points.forEach(point => {
      point.students.forEach(studentId => {
        // Initialize total points to 0 if student is not in the map
        if (!totalPointsMap.has(studentId)) {
          totalPointsMap.set(studentId, 0);
        }
        // Increment total points based on the point's value
        totalPointsMap.set(studentId, totalPointsMap.get(studentId) + point.points);
      });
    });
  
    // Create the array of objects in the desired format
    const result = students.map(student => ({
      id: student.id,
      grade: student.grade,
      house: student.house,
      name: student.name,
      points: totalPointsMap.get(student.id) || 0 // Default to 0 if no points found
    }));
  
    return result;
  }