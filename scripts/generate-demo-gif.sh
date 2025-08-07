#!/bin/bash

# Generate animated GIF from E2E snapshots showing todo app workflow
# Usage: ./scripts/generate-demo-gif.sh [desktop|mobile|both]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SNAPSHOTS_DIR="tests/e2e/.snapshots"
OUTPUT_DIR="docs/assets"
DELAY=150  # Delay between frames in centiseconds (150 = 1.5 seconds)
LOOP=0     # 0 = infinite loop

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo -e "${RED}❌ ImageMagick is not installed.${NC}"
    echo -e "${BLUE}Install with: brew install imagemagick${NC}"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Function to generate desktop GIF
generate_desktop_gif() {
    echo -e "${BLUE}📱 Generating desktop demo GIF...${NC}"
    
    local desktop_files=(
        "todo-app.spec.ts-Todo-App---E2E-Demo-Tests-Visual-desktop-screenshots-desktop-01-empty-state-chromium-darwin.png"
        "todo-app.spec.ts-Todo-App---E2E-Demo-Tests-Visual-desktop-screenshots-desktop-02-with-one-item-chromium-darwin.png"
        "todo-app.spec.ts-Todo-App---E2E-Demo-Tests-Visual-desktop-screenshots-desktop-03-item-completed-chromium-darwin.png"
        "todo-app.spec.ts-Todo-App---E2E-Demo-Tests-Visual-desktop-screenshots-desktop-04-with-statistics-chromium-darwin.png"
    )
    
    # Check if all files exist
    for file in "${desktop_files[@]}"; do
        if [ ! -f "$SNAPSHOTS_DIR/$file" ]; then
            echo -e "${RED}❌ Missing snapshot: $file${NC}"
            return 1
        fi
    done
    
    # Generate GIF with custom delays (first frame longer, last frame longer)
    convert \
        -delay 200 "$SNAPSHOTS_DIR/${desktop_files[0]}" \
        -delay $DELAY "$SNAPSHOTS_DIR/${desktop_files[1]}" \
        -delay $DELAY "$SNAPSHOTS_DIR/${desktop_files[2]}" \
        -delay 250 "$SNAPSHOTS_DIR/${desktop_files[3]}" \
        -loop $LOOP \
        -resize 800x600 \
        -colors 256 \
        "$OUTPUT_DIR/todo-app-demo-desktop.gif"
    
    echo -e "${GREEN}✅ Desktop GIF generated: $OUTPUT_DIR/todo-app-demo-desktop.gif${NC}"
}

# Function to generate mobile GIF
generate_mobile_gif() {
    echo -e "${BLUE}📱 Generating mobile demo GIF...${NC}"
    
    local mobile_files=(
        "todo-app.spec.ts-Todo-App---E2E-Demo-Tests-Visual-mobile-screenshots-mobile-01-empty-state-mobile-chrome-darwin.png"
        "todo-app.spec.ts-Todo-App---E2E-Demo-Tests-Visual-mobile-screenshots-mobile-02-home-page-mobile-chrome-darwin.png"
    )
    
    # Check if all files exist
    for file in "${mobile_files[@]}"; do
        if [ ! -f "$SNAPSHOTS_DIR/$file" ]; then
            echo -e "${RED}❌ Missing snapshot: $file${NC}"
            return 1
        fi
    done
    
    # Generate mobile GIF (simpler sequence)
    convert \
        -delay 200 "$SNAPSHOTS_DIR/${mobile_files[0]}" \
        -delay 250 "$SNAPSHOTS_DIR/${mobile_files[1]}" \
        -loop $LOOP \
        -resize 400x800 \
        -colors 256 \
        "$OUTPUT_DIR/todo-app-demo-mobile.gif"
    
    echo -e "${GREEN}✅ Mobile GIF generated: $OUTPUT_DIR/todo-app-demo-mobile.gif${NC}"
}

# Function to show file sizes
show_file_info() {
    echo -e "${YELLOW}📊 Generated files:${NC}"
    for gif in "$OUTPUT_DIR"/*.gif; do
        if [ -f "$gif" ]; then
            local size=$(du -h "$gif" | cut -f1)
            echo -e "  ${BLUE}$(basename "$gif")${NC}: $size"
        fi
    done
}

# Main execution
case "${1:-both}" in
    "desktop")
        generate_desktop_gif
        ;;
    "mobile")
        generate_mobile_gif
        ;;
    "both")
        generate_desktop_gif
        generate_mobile_gif
        ;;
    *)
        echo -e "${RED}❌ Invalid option: $1${NC}"
        echo -e "${BLUE}Usage: $0 [desktop|mobile|both]${NC}"
        exit 1
        ;;
esac

show_file_info
echo -e "${GREEN}🎉 Demo GIF(s) generated successfully!${NC}"
echo -e "${BLUE}💡 Add to README with: ![Demo](./docs/assets/todo-app-demo-desktop.gif)${NC}"