#!/bin/bash

# Configuration
PROJECT_NAME="friendlydenji"
DIST_DIR="dist"

# Text Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting deployment process for ${PROJECT_NAME}...${NC}"

# 1. Sync Goodreads (Optional)
if [ -f "src/scripts/sync-goodreads.js" ]; then
    echo -e "${YELLOW}📥 Syncing Goodreads data...${NC}"
    node src/scripts/sync-goodreads.js
fi

# 2. Check for Lint Issues
echo -e "${YELLOW}🔍 Running lint checks...${NC}"
npm run lint
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Lint checks failed. Please fix them before deploying.${NC}"
    exit 1
fi

# 3. Build the project
echo -e "${YELLOW}🏗️ Building the project...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed.${NC}"
    exit 1
fi

# 4. Success message for manual push
echo -e "${GREEN}✅ Build successful!${NC}"
echo -e "${BLUE}The 'dist' folder is ready.${NC}"
echo -e "${YELLOW}Triggering GitHub Actions deployment by pushing to main...${NC}"

# Optional: Auto git push
# read -p "Do you want to commit and push to main? (y/n) " -n 1 -r
# echo
# if [[ $REPLY =~ ^[Yy]$ ]]
# then
#     git add .
#     git commit -m "Auto-deploy: $(date +%Y-%m-%d %H:%M:%S)"
#     git push origin main
#     echo -e "${GREEN}🚀 Pushed to main. GitHub Actions will handle the rest.${NC}"
# fi
