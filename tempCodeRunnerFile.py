import cv2

# Start webcam
cap = cv2.VideoCapture(0)

# Read first frame
ret, frame = cap.read()
if not ret:
    print("Failed to access camera")
    exit()

# Let user select object
bbox = cv2.selectROI("Select Object", frame, False)
cv2.destroyWindow("Select Object")

# Create tracker (CSRT is accurate but slower)
tracker = cv2.TrackerCSRT_create()

# Initialize tracker
tracker.init(frame, bbox)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    success, bbox = tracker.update(frame)

    if success:
        x, y, w, h = [int(v) for v in bbox]

        # Draw bounding box
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # Center point
        cx = x + w // 2
        cy = y + h // 2

        cv2.circle(frame, (cx, cy), 5, (0, 0, 255), -1)

        print(f"Tracking at: ({cx}, {cy})")

    else:
        cv2.putText(frame, "Lost Tracking", (50, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    cv2.imshow("Tracking", frame)

    # Press 'q' to quit, 'r' to reselect object
    key = cv2.waitKey(1) & 0xFF

    if key == ord('q'):
        break

    elif key == ord('r'):
        bbox = cv2.selectROI("Select Object", frame, False)
        tracker.init(frame, bbox)

cap.release()
cv2.destroyAllWindows()