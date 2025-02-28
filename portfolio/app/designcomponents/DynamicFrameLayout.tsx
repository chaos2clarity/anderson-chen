// Mark this as a client component in Next.js
"use client"

// Import required libraries and components
import { useState } from "react"
import { motion } from "framer-motion"
import { FrameComponent } from "./FrameComponent"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

// Grid configuration constants
const GRID_SIZE = 12 // Total grid units (12x12 grid)
const CELL_SIZE = 60 // Pixel size per grid unit

// Type definition for Frame objects
interface Frame {
  id: number
  video: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  autoplayMode: "all" | "hover"
  isHovered: boolean
}

// Initial frame data - positions and assets for 9 frames in a 3x3 grid
const initialFrames: Frame[] = [
  // ... (frame data remains the same)
]

// Main component
export default function DynamicFrameLayout() {
  // State management
  const [frames, setFrames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize, setHoverSize] = useState(6) // Size of hovered grid section
  const [gapSize, setGapSize] = useState(4) // Gap between grid items
  const [showControls, setShowControls] = useState(false) // Control panel visibility
  const [cleanInterface, setCleanInterface] = useState(true) // Minimal UI mode
  const [showFrames, setShowFrames] = useState(false) // Frame border visibility
  const [autoplayMode, setAutoplayMode] = useState<"all" | "hover">("all") // Video play mode

  // Calculate grid row distribution based on hover state
  const getRowSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr" // Equal rows when not hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map(r => 
      r === hovered.row ? `${hoverSize}fr` : `${nonHoveredSize}fr`
    ).join(" ")
  }

  // Calculate grid column distribution based on hover state
  const getColSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr" // Equal columns when not hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map(c => 
      c === hovered.col ? `${hoverSize}fr` : `${nonHoveredSize}fr`
    ).join(" ")
  }

  // Determine transform origin for animation based on position
  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  // Update frame properties handler
  const updateFrameProperty = (id: number, property: keyof Frame, value: number) => {
    setFrames(frames.map(frame => 
      frame.id === id ? { ...frame, [property]: value } : frame
    ))
  }

  // UI control toggles
  const toggleControls = () => setShowControls(!showControls)
  const toggleCleanInterface = () => {
    setCleanInterface(!cleanInterface)
    if (!cleanInterface) setShowControls(false)
  }

  // Mock codebase update function
  const updateCodebase = () => {
    console.log("Updating codebase with current values:")
    // ... (logging values)
  }

  return (
    <div className="space-y-4 w-full h-full">
      {/* Control header section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          {/* Frame visibility toggle */}
          <div className="flex items-center space-x-2">
            <Switch id="frame-toggle" checked={showFrames} onCheckedChange={setShowFrames} />
            <label htmlFor="frame-toggle" className="text-sm text-white/70">
              {showFrames ? "Hide Frames" : "Show Frames"}
            </label>
          </div>

          {/* Autoplay mode toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="autoplay-toggle"
              checked={autoplayMode === "all"}
              onCheckedChange={(checked) => setAutoplayMode(checked ? "all" : "hover")}
            />
            <label htmlFor="autoplay-toggle" className="text-sm text-white/70">
              {autoplayMode === "all" ? "Autoplay All" : "Hover Autoplay"}
            </label>
          </div>
        </div>
      </div>

      {/* Additional controls */}
      {!cleanInterface && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Dynamic Frame Layout</h2>
          <div className="space-x-2">
            <Button onClick={toggleControls}>{showControls ? "Hide Controls" : "Show Controls"}</Button>
            <Button onClick={updateCodebase}>Update Codebase</Button>
            <Button onClick={toggleCleanInterface}>{cleanInterface ? "Show UI" : "Hide UI"}</Button>
          </div>
        </div>
      )}

      {/* Control sliders */}
      {!cleanInterface && showControls && (
        <>
          <div className="space-y-2">
            <label htmlFor="hover-size" className="block text-sm font-medium text-gray-200">
              Hover Size: {hoverSize}
            </label>
            <Slider
              id="hover-size"
              min={4}
              max={8}
              step={0.1}
              value={[hoverSize]}
              onValueChange={(value) => setHoverSize(value[0])}
            />
          </div>
          {/* ... (gap size slider similar structure) */}
        </>
      )}

      {/* Main grid container */}
      <div
        className="relative w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {/* Render frames */}
        {frames.map((frame) => {
          const row = Math.floor(frame.defaultPos.y / 4)
          const col = Math.floor(frame.defaultPos.x / 4)
          const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

          return (
            <motion.div
              key={frame.id}
              className="relative"
              style={{ transformOrigin }}
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Individual frame component */}
              <FrameComponent
                video={frame.video}
                width="100%"
                height="100%"
                className="absolute inset-0"
                // ... (frame props)
                showControls={showControls && !cleanInterface}
                label={`Frame ${frame.id}`}
                showFrame={showFrames}
                autoplayMode={autoplayMode}
                isHovered= {hovered?.row === row && hovered?.col === col}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}