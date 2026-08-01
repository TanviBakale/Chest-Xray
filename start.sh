#!/bin/bash

echo "Starting MedScan AI..."

# Start backend
echo "[1/2] Starting Flask backend on port 3001..."
cd /workspace/backend && python3 app.py &
BACKEND_PID=$!

# Start frontend
echo "[2/2] Starting Vite frontend on port 5173..."
cd /workspace/frontend && npx vite --host 0.0.0.0 &
FRONTEND_PID=$!

echo ""
echo "  Backend:  http://localhost:3001"
echo "  Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" SIGINT SIGTERM
wait
